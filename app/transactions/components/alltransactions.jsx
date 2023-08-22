import React, { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import TransactionRow from './TransactionRow';
import useGet from '../../utility_hooks/useGet';
import Select from 'react-select';
import Tooltip from '@/app/components/ToolTip';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

const AllTransactions = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [month, setMonth] = useState(searchParams.get('month'));
  const [year, setYear] = useState(searchParams.get('year'));
  const [category_identifier, setCategoryIdentifier] = useState(
    searchParams.get('category_identifier')
  );

  const { data: transactions } = useGet(
    `/transactions?month=${month}&year=${year}&category_identifier=${category_identifier}`
  );

  const { data: listOfCategories, isLoading: categoriesAreLoading } =
    useGet('/categories');

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (month === null) {
      params.set('month', new Date().getMonth() + 1);
    }
    if (year === null) {
      params.set('year', new Date().getFullYear());
    }
    if (category_identifier === null) {
      params.set('category_identifier', 'all');
    }
    router.replace(`${pathname}?${params}`);
  }, []);

  useEffect(() => {
    setMonth(searchParams.get('month'));
    setYear(searchParams.get('year'));
    setCategoryIdentifier(searchParams.get('category_identifier'));
  }, [searchParams]);

  if (categoriesAreLoading) return <div>Loading...</div>;

  return (
    <div className="p-8 mx-8 shadow-lg rounded-lg bg-white overflow-x-auto min-h-[500px]">
      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Notes</th>
            <th className="px-4 py-2">
              <div className="flex">
                <button className="text-sm flex-1 inline">Amount</button>
                <Tooltip
                  className="inline"
                  tooltipText="Amount is all categories except Income, Savings, Refunds, and Transfers"
                >
                  <InformationCircleIcon className="h-5 w-5 text-gray-500" />
                </Tooltip>
              </div>
            </th>
            <th className="px-4 py-2 flex gap-4 items-center">
              Category
              <Select
                className="text-sm flex-1"
                name="categories"
                options={listOfCategories?.map((category) => {
                  return {
                    value: category.identifier,
                    label: category.category_name,
                  };
                })}
                onChange={(e) => {
                  const params = new URLSearchParams(searchParams);
                  params.set('category_identifier', e.value);
                  router.replace(`${pathname}?${params}`);
                }}
                value={
                  {
                    value: category_identifier,
                    label: listOfCategories?.find(
                      (category) => category.identifier === category_identifier
                    )?.category_name,
                  } || {
                    value: 'all',
                    label: 'All',
                  }
                }
              />
            </th>
            <th className="px-4 py-2">
              <button className="text-sm flex-1" onClick={() => handleSort()}>
                Date of Transaction
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2">
              <strong>Total Expenses</strong>
            </td>
            <td className="px-4 py-2"></td>
            <td className="px-4 py-2">
              <strong>get from backend</strong>
            </td>
            <td className="px-4 py-2"></td>
            <td className="px-4 py-2"></td>
          </tr>
          {transactions?.map((transaction, index) => {
            return (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                <TransactionRow
                  listOfCategories={listOfCategories}
                  transaction={transaction}
                />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllTransactions;
