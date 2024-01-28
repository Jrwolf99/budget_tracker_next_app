import React, { useEffect, useState } from 'react';
import PieChartComponent from '../components/PieChart';
import { Slider } from '@/components/ui/slider';
import CategoryCard from './CategoryCard';
import { authedGet } from '../utility/common';
import { currentUserId } from '../utility/localStorage';
import useResize from '../utility/useResize';
import Select from 'react-select';

const onlyFilterOptions = [
  { value: null, label: 'All' },
  { value: 'only_needs', label: 'Only Needs' },
  { value: 'only_wants', label: 'Only Wants' },
];

const reportTypes = [
  {
    identifier: 'granular',
    label: 'Granular',
  },
  {
    identifier: 'broader',
    label: 'Broader',
  },
  {
    identifier: 'wants_needs',
    label: 'Wants and Needs',
  },
  {
    identifier: 'aggregated',
    label: 'Aggregated',
  },
];

export default function Details({ month, year }) {
  const [totalsByCategory, setTotalsByCategory] = useState([]);
  const [currentReportType, setCurrentReportType] = useState(0);
  const [viewOrganization, setviewOrganization] = useState(false);
  const [onlyFilter, setOnlyFilter] = useState(null);

  useEffect(() => {
    authedGet('/spend_accounts/get_totals_by_category_report', {
      params: {
        user_id: currentUserId(),
        year: year,
        month: month,
        report_type: reportTypes[currentReportType].identifier,
        only_needs_or_only_wants: onlyFilter,
      },
    })
      .then((res) => {
        setTotalsByCategory((prev) => {
          return res.data;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [month, year, currentReportType, onlyFilter]);
  function sortByIdentifier(categories) {
    if (!categories) return [];

    return categories.slice().sort((a, b) => {
      if (
        typeof a?.identifier === 'string' &&
        typeof b?.identifier === 'string'
      ) {
        return a?.identifier.localeCompare(b?.identifier);
      }
      return 0;
    });
  }

  const { isSmallScreenAndUnder } = useResize();

  useEffect(() => {
    if (isSmallScreenAndUnder) {
      setviewOrganization(true);
    }
    if (!isSmallScreenAndUnder) {
      setviewOrganization(false);
    }
  }, [isSmallScreenAndUnder]);

  return (
    <div className="w-full flex flex-wrap md:flex-nowrap gap-8 justify-between items-start">
      <div className="h-full mx-auto bg-slate-100 border border-green-400 p-4 rounded-lg">
        {totalsByCategory && (
          <PieChartComponent
            data={totalsByCategory}
            month={month}
            year={year}
          />
        )}
      </div>
      <div className="w-full">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <h3 className="font-bold mb-4">
            {reportTypes[currentReportType].label} Report
          </h3>

          <Select
            id="long-value-select"
            instanceId="long-value-select"
            className="text-[10px] sm:text-[15px] flex-1 min-w-[130px] max-w-[140px]"
            options={onlyFilterOptions}
            onChange={(e) => {
              setOnlyFilter(e?.value);
            }}
            isSearchable={false}
            value={{
              value: onlyFilter,
              label: onlyFilterOptions.find(
                (option) => option?.value === onlyFilter
              )?.label,
            }}
          />

          <div className="min-w-[300px] w-[40%] h-[40px] flex justify-center items-center gap-4">
            <p>Specific</p>
            <Slider
              max={3}
              step={1}
              value={[currentReportType]}
              onValueChange={(value) => setCurrentReportType(value[0])}
              trackClasses="bg-primary"
            />
            <p>Broad</p>
          </div>
        </div>
        <div
          className={`flex flex-wrap p-4 rounded-lg
            ${viewOrganization ? 'flex-col' : 'flex-row'}
            gap-4 justify-center items-center w-full`}
        >
          {sortByIdentifier(totalsByCategory).map((category, index) => (
            <div
              key={category.identifier}
              className={`${viewOrganization ? 'w-full' : 'w-[300px]'}`}
            >
              <CategoryCard
                category={category}
                month={month}
                year={year}
                currentReportType={currentReportType}
                reportTypes={reportTypes}
                canHover={
                  reportTypes[currentReportType].identifier === 'granular'
                }
              />
            </div>
          ))}

          {!totalsByCategory?.length && (
            <div className="text-center">
              No transactions recorded for this month.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
