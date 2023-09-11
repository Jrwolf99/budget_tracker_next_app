'use client';
import useFormat from '@/app/utility/useFormat';
import useGet from '@/app/utility/useGet';
import React, { useState } from 'react';
import HorizontalChart from '../components/HorizontalChart';
import PieChartComponent from '../components/PieChart';

export default function GraphsPage() {
  const { monthIntToString } = useFormat();

  // const { data: totalsByCategory } = useGet(
  //   `/transactions/get_list_of_categories_with_monthly_expenses?month=${month}&year=${year}`
  // );

  return (
    <div>hii</div>
    // <div className="flex justify-center px-4">
    //   <div className="flex-1 flex flex-wrap gap-4 p-8 shadow-lg rounded-lg bg-white overflow-x-auto">
    //     {totalsByCategory?.map((category, index) => (
    //       <div
    //         key={index}
    //         className="mb-[60px] flex flex-col justify-start bg-gray-100 border border-green-400 rounded-lg p-4"
    //       >
    //         <h2 className="mb-4">{category.category}</h2>
    //         <HorizontalChart
    //           graph_data={[
    //             { name: 'Target', value: category.goal },
    //             { name: 'Actual', value: category.value },
    //           ]}
    //           dataKeys={['actual', 'target']}
    //           width={250}
    //           height={170}
    //         />
    //       </div>
    //     ))}
    //     {!totalsByCategory?.length && (
    //       <div className="text-center">
    //         No transactions recorded for this month.
    //       </div>
    //     )}
    //   </div>
    //   <div className=" flex-3 p-8 shadow-lg rounded-lg bg-white overflow-x-auto">
    //     <h2 className="m-2 font-bold">{monthIntToString(month)} Expenses</h2>
    //     {totalsByCategory && <PieChartComponent data={totalsByCategory} />}
    //   </div>
    // </div>
  );
}
