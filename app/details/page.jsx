'use client';
import useFormat from '@/app/utility/useFormat';
import useGet from '@/app/utility/useGet';
import React, { use, useEffect, useState } from 'react';
import HorizontalChart from '../components/HorizontalChart';
import PieChartComponent from '../components/PieChart';
import { authedGet } from '../utility/common';
import { currentUserId } from '../utility/localStorage';
import CardContainer from '../components/general/CardContainer';
import DatePicker from '../components/DatePicker';

export default function DetailsPage() {
  const [totalsByCategory, setTotalsByCategory] = useState([]);

  const { monthIntToString } = useFormat();

  const [month, setMonth] = useState(1 + new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear().toString());

  useEffect(() => {
    const getReport = async () => {
      const { data } = await authedGet(
        '/spend_accounts/get_totals_by_category_report',
        {
          params: {
            user_id: currentUserId(),
            year: year,
            month: month,
          },
        }
      );
      setTotalsByCategory(data);
    };
    getReport();
  }, [month, year]);

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
        <div className="flex gap-8 justify-center items-start">
          <div className="h-[760px]">
            {totalsByCategory && <PieChartComponent data={totalsByCategory} />}
          </div>
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {totalsByCategory?.map((category, index) => (
              <div
                key={index}
                className="flex flex-col justify-start bg-slate-100 border border-green-400 rounded-lg p-4 hover:bg-slate-200 transition duration-200 ease-in-out"
              >
                <p className="mb-4 text-sm">{category.category_name}</p>
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
      </CardContainer>
    </>
  );
}
