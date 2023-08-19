import React, { useEffect } from 'react';
import useLocalStorage from '@/app/utility_hooks/useLocalStorage';
import { useState } from 'react';
import TransactionRow from './TransactionRow';
import useGet from '../../utility_hooks/useGet';
import Select from 'react-select';
import Tooltip from '@/app/components/ToolTip';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

const AllTransactions = () => {
  const [myTransactions, setMyTransactions] = useState();

  const [categoryOption, setCategoryOption] = useState();
  const [categoryOptions, setCategoryOptions] = useState();

  const [month] = useLocalStorage('selectedMonth');
  const [year] = useLocalStorage('selectedYear');

  const { data: transactions } = useGet(
    `/transactions?month=${month}&year=${year}&category_identifier=${categoryOption?.value}`
  );
  const { data: listOfCategories, isLoading: categoriesAreLoading } =
    useGet('/categories');

  useEffect(() => {
    if (listOfCategories) {
      setCategoryOptions([
        { value: 'all', label: 'All' },
        { value: 'uncategorized', label: 'Uncategorized' },
        ...listOfCategories.map((category) => ({
          value: category.identifier,
          label: category.category_name,
        })),
      ]);
    } else {
      setCategoryOptions([{ value: 'all', label: 'All' }]);
    }
  }, [listOfCategories, setCategoryOptions]);

  useEffect(() => {
    setMyTransactions(transactions);
  }, [transactions]);

  const handleSort = () => {
    const sorted = myTransactions.sort((a, b) => {
      return new Date(b.transaction_date) - new Date(a.transaction_date);
    });
    setMyTransactions([...sorted]);
  };

  return (
    <div className="p-8 mx-8 shadow-lg rounded-lg bg-white overflow-x-auto min-h-[500px]">
      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Notes</th>
            <th className="px-4 py-2">
              <div className="flex">
                <button
                  className="text-sm flex-1 inline"
                  onClick={() => {
                    const sorted = myTransactions.sort((a, b) => {
                      return a.amount - b.amount;
                    });
                    setMyTransactions([...sorted]);
                  }}
                >
                  Amount
                </button>
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
                defaultValue={{ value: 'all', label: 'All' }}
                options={categoryOptions}
                onChange={(e) => {
                  setCategoryOption(e);
                  Router.push({
                    pathname: '/transactions',
                    query: { keyword: e.value },
                  });
                }}
                value={categoryOption}
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
              <strong>
                {myTransactions
                  ?.reduce((acc, curr) => {
                    if (
                      categoryOption.value === 'all' &&
                      (curr.category_id === 11 ||
                        curr.category_id === 12 ||
                        curr.category_id === 8 ||
                        curr.category_id === 5)
                    )
                      return acc;
                    else return acc + parseFloat(curr.amount);
                  }, 0)
                  .toFixed(2)}
              </strong>
            </td>
            <td className="px-4 py-2"></td>
            <td className="px-4 py-2"></td>
          </tr>

          {myTransactions?.toString() !== '' ? (
            myTransactions?.map((transaction, index) => {
              return (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'bg-gray-100' : ''}
                >
                  <TransactionRow
                    listOfCategories={listOfCategories}
                    transaction={transaction}
                  />
                </tr>
              );
            })
          ) : (
            <tr className="bg-gray-100">
              <td className="px-4 py-2 text-center" colSpan="5">
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllTransactions;
