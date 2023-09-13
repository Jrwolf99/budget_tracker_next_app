'use client';
import useFormat from '@/app/utility/useFormat';
import useGet from '@/app/utility/useGet';
import React, { useEffect, useState } from 'react';
import DatePicker from '../components/DatePicker';
import { authedGet } from '../utility/common';

export default function OverviewPage() {
  const { months, formatDollar } = useFormat();
  const [month, setMonth] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());

  return (
    <div className="flex justify-center gap-4 px-4">
      <div className="flex-1 flex flex-wrap p-8 shadow-lg rounded-lg bg-white overflow-x-auto">
        <h2 className="font-bold mb-8">Overview</h2>
        <DatePicker justYear year={year} setYear={setYear} />
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
                Expenses
              </th>
              <th
                scope="col"
                className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Savings or Profit (Income - Expenses)
              </th>
              <th
                scope="col"
                className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Profit Margin AKA Savings Percentage (Profit / Income)
              </th>
            </tr>
          </thead>
          {/* <tbody className="min-w-full bg-white divide-y divide-gray-200">
            {overview?.map((month) => (
              <tr key={month.month}>
                <td className="px-1 py-2 whitespace-nowrap">
                  {month.month == 0 ? (
                    <strong>Total</strong>
                  ) : (
                    months[month.month - 1]
                  )}
                </td>
                <td className="px-1 py-2 whitespace-nowrap">
                  {month.month == 0 ? (
                    <strong>{formatDollar(month.total_income)}</strong>
                  ) : (
                    formatDollar(month.total_income)
                  )}
                </td>
                <td className="px-1 py-2 whitespace-nowrap">
                  {month.month == 0 ? (
                    <strong>{formatDollar(month.total_expenses)}</strong>
                  ) : (
                    formatDollar(month.total_expenses)
                  )}
                </td>
                <td className="px-1 py-2 whitespace-nowrap">
                  {month.month == 0 ? (
                    <strong>{formatDollar(month.total_profit)}</strong>
                  ) : (
                    formatDollar(month.total_profit)
                  )}
                </td>
                {month.profit_margin ? (
                  <td className="px-1 py-2 whitespace-nowrap">
                    {month.month == 0 ? (
                      <strong>{month.profit_margin}%</strong>
                    ) : (
                      month.profit_margin + '%'
                    )}
                  </td>
                ) : (
                  <td className="px-1 py-2 whitespace-nowrap" />
                )}
              </tr>
            ))}
          </tbody> */}
        </table>
      </div>
    </div>
  );
}