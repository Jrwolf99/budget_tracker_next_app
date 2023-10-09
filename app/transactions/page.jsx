'use client';
import React, { useEffect, useState } from 'react';
import UploadCSVBox from './components/UploadCSVBox';
import SpendsList from './components/SpendsList';
import StatisticsBox from './components/StatisticsBox';
import DatePickerBox from './components/DatePickerBox';
import { useSearchParams } from 'next/navigation';
import { authedGet } from '../utility/common';
import { currentUserId } from '../utility/localStorage';

export default function TransactionsPage() {

  const searchParams = useSearchParams();

  const [month, setMonth] = useState(
    searchParams.get('month') || 1 + new Date().getMonth()
  );

  const [year, setYear] = useState(
    searchParams.get('year') || new Date().getFullYear().toString()
  );

  const [spends, setSpends] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);


  useEffect(() => {
    if (searchParams.get('selected_identifier') === null) return;
    authedGet('/spend_accounts/show_spends', {
      params: {
        user_id: currentUserId(),
        spend_category_identifier: searchParams.get('selected_identifier'),
        month: month,
        year: year,
      },
    })
      .then((response) => {
        console.log(response);
        setTotalSpent(response.data.meta.total_spent);
        setTotalEarned(response.data.meta.total_earned);
        setSpends(response.data.spends);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchParams, month, year]);

  return (
    <div className="flex flex-col gap-4 p-4 bg-slate-200">
      <div className="flex flex-row flex-wrap gap-4">
        <UploadCSVBox />
        <StatisticsBox totalSpent={totalSpent} totalEarned={totalEarned} />
        <DatePickerBox
          month={month}
          setMonth={setMonth}
          year={year}
          setYear={setYear}
        />
      </div>
      <SpendsList spends={spends} />
    </div>
  );
}
