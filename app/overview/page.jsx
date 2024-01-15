'use client';
import useFormat from '@/app/utility/useFormat';
import useGet from '@/app/utility/useGet';
import React, { useEffect, useState } from 'react';
import DatePicker from '../components/DatePicker';
import { authedGet } from '../utility/common';
import { currentUserId } from '../utility/localStorage';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import Tooltip from '../components/ToolTip';
import CardContainer from '../components/general/CardContainer';
import { useRouter } from 'next/navigation';

export default function OverviewPage() {
  const router = useRouter();
  const { formatDollar } = useFormat();
  const [year, setYear] = useState(new Date().getFullYear());

  const [overviewData, setOverviewData] = useState([]);
  const [totals, setTotals] = useState({});

  useEffect(() => {
    const getOverview = async () => {
      const response = await authedGet(
        '/spend_accounts/get_years_overview_report',
        {
          params: {
            user_id: currentUserId(),
            year: year,
          },
        }
      );

      setOverviewData(response.data.months);
      setTotals(response.data.totals);
    };
    getOverview();
  }, [year]);


  const headerClasses =
    'text-[7px] sm:text-[15px] px-2 py-1 mr-2 sm:px-6 sm:py-3 sm:mr-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider';

  const tableClasses =
    'text-[7px] sm:text-[15px] px-2 py-1 mr-2 sm:px-6 sm:py-3 sm:mr-4 whitespace-nowrap';

  return (
    <div className="flex justify-center gap-4 p-1 pt-6 sm:p-6 bg-slate-200">
      <CardContainer customClassNames="mb-[150px]">
        <div className="flex items-center gap-2">
          <h2 className="font-bold">Overview</h2>
          <DatePicker justYear year={year} setYear={setYear} />
        </div>
        <table className="divide-gray-200 table-auto min-w-full mt-4">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className={headerClasses}>
                Month
              </th>
              <th scope="col" className={headerClasses}>
                Income
              </th>

              <th scope="col" className={headerClasses}>
                Expenses
              </th>
              <th scope="col" className={headerClasses}>
                <div className="flex items-center">
                  <div> Profit (What&apos;s left)</div>
                  <Tooltip tooltipText="Income - Expenses">
                    <InformationCircleIcon className="h-4 w-4 ml-2" />
                  </Tooltip>
                </div>
              </th>
              <th scope="col" className={`${headerClasses} text-center`}>
                <div className="flex items-center">
                  <div>Profit Margin</div>
                  <Tooltip tooltipText="Profit / Income">
                    <InformationCircleIcon className="h-4 w-4 ml-2" />
                  </Tooltip>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="min-w-full bg-white divide-y divide-gray-200 text-sm">
            <tr className="text-lg">
              <td className="text-[11px] sm:text-[20px] px-2 py-1 mr-2 sm:px-6 sm:py-3 sm:mr-4 whitespace-nowrap">
                <strong>Total</strong>
              </td>
              <td className="text-[11px] sm:text-[20px] px-2 py-1 mr-2 sm:px-6 sm:py-3 sm:mr-4 whitespace-nowrap">
                <strong>{formatDollar(totals?.total_income || 0)}</strong>
              </td>
              <td className="text-[11px] sm:text-[20px]  px-2 py-1 mr-2 sm:px-6 sm:py-3 sm:mr-4 whitespace-nowrap">
                <strong>{formatDollar(totals?.total_expenses || 0)}</strong>
              </td>
              <td className="text-[11px] sm:text-[20px] px-2 py-1 mr-2 sm:px-6 sm:py-3 sm:mr-4 whitespace-nowrap">
                <strong>{formatDollar(totals?.total_profit || 0)}</strong>
              </td>
              <td className="text-[11px] sm:text-[20px]  px-2 py-1 mr-2 sm:px-6 sm:py-3 sm:mr-4 whitespace-nowrap">
                <strong>{totals?.total_margin_percentage || 0}</strong>
              </td>
            </tr>

            <tr>
              <td />
            </tr>

            {overviewData?.map((month) => (
              <tr
                key={month.key}
                className="hover:bg-slate-200"
                onClick={() =>
                  router.push(
                    `/details?month=${month.month_number}&year=${year}`
                  )
                }
                style={{ cursor: 'pointer' }}
              >
                <td className={tableClasses}>{month.month_name}</td>
                <td className={tableClasses}>
                  {formatDollar(month.month_income)}
                </td>
                <td className={tableClasses}>
                  {formatDollar(month.month_expenses)}
                </td>

                {month.month_profit > 0 ? (
                  <td className={`${tableClasses} text-green-600`}>
                    {formatDollar(month.month_profit)}
                  </td>
                ) : (
                  <td className={`${tableClasses} text-red-500`}>
                    {formatDollar(month.month_profit)}
                  </td>
                )}

                {month.month_profit > 0 ? (
                  <td className={`${tableClasses} text-green-600`}>
                    {month.month_margin_percentage}
                  </td>
                ) : (
                  <td className={`${tableClasses} text-red-500`}>
                    {month.month_margin_percentage}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </CardContainer>
    </div>
  );
}
