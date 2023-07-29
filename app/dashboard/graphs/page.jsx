'use client';
import useFormat from '@/app/utility_hooks/useFormat';
import useGet from '@/app/utility_hooks/useGet';
import useLocalStorage from '@/app/utility_hooks/useLocalStorage';
import React, { useState } from 'react';
import HorizontalChart from '../components/HorizontalChart';
import PieChartComponent from '../components/PieChart';

export default function GraphsPage() {
  const [month] = useLocalStorage('selectedMonth');
  const [year] = useLocalStorage('selectedYear');

  const { monthIntToString } = useFormat();

  const { data: totalsByCategory } = useGet(
    `/transactions/get_list_of_categories_with_monthly_expenses?month=${month}&year=${year}`
  );

  return (
    <div className="flex justify-center gap-4 px-4">
      <div className="flex-1 flex flex-wrap p-8 shadow-lg rounded-lg bg-white overflow-x-auto">
        {totalsByCategory?.map((category, index) => (
          <div key={index} className="mb-[60px]">
            <h2 className="mb-4">{category.category}</h2>
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
          <div className="text-center">No transactions recorded for this month.</div>
        )}
      </div>
      <div className=" flex-3 p-8 shadow-lg rounded-lg bg-white overflow-x-auto">
        <h2 className="m-2 font-bold">{monthIntToString(month)} Expenses</h2>
        {totalsByCategory && <PieChartComponent data={totalsByCategory} />}
      </div>
    </div>
  );
}
