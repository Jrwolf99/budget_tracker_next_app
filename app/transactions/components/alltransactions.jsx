import React, { useEffect } from 'react';
import useLocalStorage from '@/app/utility_hooks/useLocalStorage';
import { useState } from 'react';
import TransactionRow from './TransactionRow';
import useGet from '../../utility_hooks/useGet';
import Select from 'react-select';

const AllTransactions = () => {
  const [month] = useLocalStorage('selectedMonth');
  const [year] = useLocalStorage('selectedYear');
  const [category, setCategory] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState();

  const { data: transactions } = useGet(
    `/transactions?month=${month}&year=${year}&category_id=${category}`
  );

  const [myTransactions, setMyTransactions] = useState(transactions);

  const { data: listOfCategories, isLoading: categoriesAreLoading } =
    useGet('/categories');
  const [myCategories, setMyCategories] = useState(listOfCategories);

  useEffect(() => {
    if (listOfCategories) {
      setMyCategories([
        { value: 'all', label: 'All' },
        ...listOfCategories.map((category) => ({
          value: category.id,
          label: category.category_name,
        })),
      ]);
    } else {
      setMyCategories([{ value: 'all', label: 'All' }]);
    }
  }, [listOfCategories, setMyCategories]);

  useEffect(() => {
    setMyTransactions(transactions);
  }, [transactions]);

  return (
    <div className="p-8 mx-8 shadow-lg rounded-lg bg-white overflow-x-auto min-h-[500px]">
      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Notes</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2 flex gap-4 items-center">
              Category
              <Select
                className="text-sm flex-1"
                name="categories"
                defaultValue={{ value: 'all', label: 'All' }}
                options={myCategories}
                onChange={(e) => {
                  setSelectedCategory(e);
                  setCategory(e.value);
                }}
                value={selectedCategory}
              />
            </th>
            <th className="px-4 py-2">Date of Transaction</th>
          </tr>
        </thead>
        <tbody>
          {myTransactions?.map((transaction, index) => {
            {
              console.log(transaction);
            }
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
