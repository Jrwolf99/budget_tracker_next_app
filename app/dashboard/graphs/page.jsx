'use client';
import useGet from '@/app/utility_hooks/useGet';
import useLocalStorage from '@/app/utility_hooks/useLocalStorage';
import React, { useState } from 'react';
import HorizontalChart from '../components/HorizontalChart';
import PieChartComponent from '../components/PieChart';

export default function GraphsPage() {
  const [month] = useLocalStorage('selectedMonth');
  const [year] = useLocalStorage('selectedYear');

  const { data: totalsByCategory } = useGet(
    `/transactions/get_totals_by_category?month=${month}&year=${year}`
  );

  return (
    <div className="flex justify-center gap-10">
      <div className="p-8 shadow-lg rounded-lg bg-white overflow-x-auto">
        {totalsByCategory?.map((category, index) => (
          <div key={index} className="mb-[70px]">
            <h2 className="mb-4">{category.category}</h2>
            <HorizontalChart
              graph_data={[
                { name: 'Target', value: category.goal },
                { name: 'Actual', value: category.value },
              ]}
              dataKeys={['actual', 'target']}
              width={400}
              height={275}
            />
          </div>
        ))}
      </div>

      <div className="p-8 shadow-lg rounded-lg bg-white overflow-x-auto">
        <h2 className="m-4">Expenses</h2>
        {totalsByCategory && <PieChartComponent data={totalsByCategory} />}
      </div>
    </div>
  );
}
