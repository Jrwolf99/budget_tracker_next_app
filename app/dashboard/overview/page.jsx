'use client';
import useFormat from '@/app/utility_hooks/useFormat';
import useGet from '@/app/utility_hooks/useGet';
import useLocalStorage from '@/app/utility_hooks/useLocalStorage';
import React, { useState } from 'react';

export default function OverviewPage() {
  const [year] = useLocalStorage('selectedYear');
  const { months } = useFormat();

  // todo: figure out a way to best supply data from rails and display it here. I believe best way is to have an array of objects, where each object
  // represents a month, and each object has the following keys: month, income, savings, expenses, profit_margin.
  // so, one endpoint for everything. get_overview_for_year?year=2021

  return (
    <div className="flex justify-center gap-4 px-4">
      <div className="flex-1 flex flex-wrap p-8 shadow-lg rounded-lg bg-white overflow-x-auto">
        <h2 className="font-bold mb-8">Overview</h2>
        <table className="divide-gray-200 table-auto min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Month
              </th>
              <th
                scope="col"
                className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Income
              </th>
              <th
                scope="col"
                className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Savings
              </th>
              <th
                scope="col"
                className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Expenses
              </th>
              <th
                scope="col"
                className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Profit Margin
              </th>
            </tr>
          </thead>
          <tbody className="min-w-full bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-1 py-2 whitespace-nowrap">Jan</td>
              <td className="px-1 py-2 whitespace-nowrap">222</td>
              <td className="px-1 py-2 whitespace-nowrap">100</td>
              <td className="px-1 py-2 whitespace-nowrap">333</td>
              <td className="px-1 py-2 whitespace-nowrap">10%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
