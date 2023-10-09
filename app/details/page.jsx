'use client';
import useFormat from '@/app/utility/useFormat';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import PieChartComponent from '../components/PieChart';
import { authedGet } from '../utility/common';
import { currentUserId } from '../utility/localStorage';
import CardContainer from '../components/general/CardContainer';
import DatePicker from '../components/DatePicker';
import { Slider } from '@/components/ui/slider';
import CategoryCard from './CategoryCard';

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

const onlyFilterOptions = [
  { value: 'only_needs', label: 'Only Needs' },
  { value: 'only_wants', label: 'Only Wants' },
];

export default function DetailsPage() {
  const { monthIntToString } = useFormat();

  const [month, setMonth] = useState(1 + new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear().toString());

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
          console.log('prev', prev);
          return res.data;
        });
        console.log('res', res.data);
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

  return (
    <>
      <CardContainer customClassNames="m-4">
        <div className="flex justify-between items-center pr-8 mb-6">
          <h2 className="font-bold">{monthIntToString(month)} Expenses</h2>
          <div className="flex justify-between items-center gap-4">
            <Select
              id="long-value-select"
              instanceId="long-value-select"
              className="text-xs flex-1 w-[175px]"
              options={onlyFilterOptions}
              onChange={(e) => {
                setOnlyFilter(e?.value);
              }}
              isClearable
              isSearchable={false}
              value={{
                value: onlyFilter,
                label: onlyFilterOptions.find(
                  (option) => option?.value === onlyFilter
                )?.label,
              }}
            />
            <button
              className="bg-primary text-white px-4 py-2 rounded-lg"
              onClick={() => {
                setviewOrganization(!viewOrganization);
              }}
            >
              Switch View
            </button>
            <DatePicker
              month={month}
              year={year}
              setMonth={setMonth}
              setYear={setYear}
              noAll
            />
          </div>
        </div>
        <div className="flex gap-8 justify-between items-start">
          <div className="h-full bg-slate-100 border border-green-400 p-4 rounded-lg">
            {totalsByCategory && <PieChartComponent data={totalsByCategory} />}
          </div>
          <div className="w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold mb-4">
                {reportTypes[currentReportType].label} Report
              </h3>
              <div className="w-[40%] h-[40px] flex justify-center items-center gap-4">
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
      </CardContainer>
    </>
  );
}