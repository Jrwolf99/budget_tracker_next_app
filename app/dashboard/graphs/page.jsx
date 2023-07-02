'use client';
import React, { useState } from 'react';
import HorizontalChart from '../components/HorizontalChart';
import PieChartComponent from '../components/PieChart';

export default function GraphsPage() {
  const [data, setData] = useState([
    {
      category_name: 'Food',
      graph_data: [
        { name: 'Target', amount: 200 },
        { name: 'Actual', amount: 250 },
      ],
    },
    {
      category_name: 'Goods',
      graph_data: [
        { name: 'Target', amount: 100 },
        { name: 'Actual', amount: 150 },
      ],
    },
  ]);

  return (
    <div className="flex justify-center gap-10">
      <div className="p-8 shadow-lg rounded-lg bg-white overflow-x-auto">
        {data.map((category, index) => (
          <div key={index} className="mb-[70px]">
            <h2 className="mb-4">{category.category_name}</h2>
            <HorizontalChart
              graph_data={category.graph_data}
              dataKey={'amount'}
              width={400}
              height={175}
            />
          </div>
        ))}
      </div>

      <div className="p-8 shadow-lg rounded-lg bg-white overflow-x-auto">
        <h2 className="m-4">Expenses</h2>
        <PieChartComponent />
      </div>
    </div>
  );
}
