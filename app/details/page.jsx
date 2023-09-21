'use client';
import useFormat from '@/app/utility/useFormat';
import React, { use, useCallback, useEffect, useState } from 'react';
import HorizontalChart from '../components/HorizontalChart';
import PieChartComponent from '../components/PieChart';
import { authedGet } from '../utility/common';
import { currentUserId } from '../utility/localStorage';
import CardContainer from '../components/general/CardContainer';
import DatePicker from '../components/DatePicker';
import { GoalEditModal } from '../components/GoalEditModal';
import { Slider } from '@/components/ui/slider';
import Tooltip from '../components/ToolTip';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

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

export default function DetailsPage() {
  const [totalsByCategory, setTotalsByCategory] = useState([]);
  console.log('------------------------');
  console.log('totalsByCategoruyyyyyyyyyyyyyyyyy', totalsByCategory);

  const { monthIntToString } = useFormat();

  const [month, setMonth] = useState(1 + new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const [currentReportType, setCurrentReportType] = useState(0);

  const [showEditGoalModal, setShowEditGoalModal] = useState(false);
  const [pickedCategory, setPickedCategory] = useState(null);

  const getReport = useCallback(() => {
    authedGet('/spend_accounts/get_totals_by_category_report', {
      params: {
        user_id: currentUserId(),
        year: year,
        month: month,
        report_type: reportTypes[currentReportType].identifier,
      },
    })
      .then((res) => {
        setTotalsByCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [month, year, currentReportType]);

  useEffect(() => {
    getReport();
  }, [month, year, currentReportType]);

  return (
    <>
      <CardContainer customClassNames="m-4">
        <div className="flex justify-between items-center pr-8 mb-6">
          <h2 className="font-bold">{monthIntToString(month)} Expenses</h2>

          <DatePicker
            month={month}
            year={year}
            setMonth={setMonth}
            setYear={setYear}
            noAll
          />
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
            <div className="flex flex-wrap gap-4 justify-center items-center w-full">
              {totalsByCategory?.map((category) => (
                <div
                  key={category.identifier}
                  onClick={() => {
                    setShowEditGoalModal(true);
                    setPickedCategory(category);
                  }}
                  className="justify-start bg-slate-100 border border-green-400 rounded-lg p-4 hover:bg-slate-200 transition duration-200 ease-in-out"
                >
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-sm">{category.label}</p>
                    <Tooltip
                      tooltipText={
                        <p className="text-sm">
                          {category.list_of_included_categories.join(', ')}
                        </p>
                      }
                      position="top"
                    >
                      <InformationCircleIcon className="h-4 w-4 ml-2" />
                    </Tooltip>
                  </div>
                  <HorizontalChart
                    graph_data={[
                      { name: 'Target', value: category.goal },
                      { name: 'Actual', value: category.value },
                    ]}
                    dataKeys={['actual', 'target']}
                    width={200}
                    height={120}
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
        <GoalEditModal
          poweredOn={
            'granular' === reportTypes[currentReportType].identifier
              ? showEditGoalModal
              : false
          }
          onClose={() => setShowEditGoalModal(false)}
          month={month}
          year={year}
          currentGoal={pickedCategory?.goal}
          getReport={getReport}
          categoryName={pickedCategory?.label}
          spendCategoryID={pickedCategory?.identifier}
        />
      </CardContainer>
    </>
  );
}