'use client';
import useFormat from '@/app/utility/useFormat';
import useGet from '@/app/utility/useGet';
import React, { use, useEffect, useState } from 'react';
import HorizontalChart from '../components/HorizontalChart';
import PieChartComponent from '../components/PieChart';
import { authedGet } from '../utility/common';
import { currentUserId } from '../utility/localStorage';

export default function DetailsPage() {
  const [totalsByCategory, setTotalsByCategory] = useState([]);

  const { monthIntToString } = useFormat();

  const [month, setMonth] = useState(7);

  useEffect(() => {
    const getReport = async () => {
      const { data } = await authedGet(
        '/spend_accounts/get_totals_by_category_report',
        {
          params: {
            user_id: currentUserId(),
            year: 2023,
            month: 7,
          },
        }
      );
      console.log(data);
      setTotalsByCategory(data);
    };
    getReport();
  }, []);

  return (
    <div className="flex justify-center px-4">
      <div className="flex-1 flex flex-wrap gap-4 p-8 shadow-lg rounded-lg bg-white overflow-x-auto">
        {totalsByCategory?.map((category, index) => (
          <div
            key={index}
            className="mb-[60px] flex flex-col justify-start bg-gray-100 border border-green-400 rounded-lg p-4"
          >
            <h2 className="mb-4">{category.category_name}</h2>
            <HorizontalChart
              graph_data={[
                { name: 'Target', value: category.goal },
                { name: 'Actual', value: category.value },
              ]}
              dataKeys={['actual', 'target']}
              width={250}
              height={170}
            />
          </div>
        ))}
        {!totalsByCategory?.length && (
          <div className="text-center">
            No transactions recorded for this month.
          </div>
        )}
      </div>
      <div className=" flex-3 p-8 shadow-lg rounded-lg bg-white overflow-x-auto">
        <h2 className="m-2 font-bold">{monthIntToString(month)} Expenses</h2>
        {totalsByCategory && <PieChartComponent data={totalsByCategory} />}
      </div>
    </div>
  );
}
