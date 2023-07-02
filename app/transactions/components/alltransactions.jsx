import React, { useEffect } from 'react';
import useLocalStorage from '@/app/utility_hooks/useLocalStorage';
import { useState } from 'react';
import TransactionRow from './TransactionRow';
import useGet from '../../utility_hooks/useGet';

const AllTransactions = () => {
  const [month, setMonth] = useLocalStorage('selectedMonth');
  const [year, setYear] = useLocalStorage('selectedYear');

  const { data } = useGet(`/transactions?month=${month}&year=${year}`);

  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    setTransactions(data);
  }, [data]);

  return (
    <div className="p-8 mx-8 shadow-lg rounded-lg bg-white overflow-x-auto">
      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Notes</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Date of Transaction</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              <TransactionRow transaction={transaction} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllTransactions;
