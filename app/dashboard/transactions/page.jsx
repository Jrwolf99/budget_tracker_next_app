'use client';
import React, { useState } from 'react';
import UploadCSVBox from './components/UploadCSVBox';
import SpendsList from './components/SpendsList';
import StatisticsBox from './components/StatisticsBox';
import DatePickerBox from './components/DatePickerBox';

export default function TransactionsPage() {
  const [month, setMonth] = useState('all');
  const [year, setYear] = useState(new Date().getFullYear().toString());

  return (
    <div className="flex flex-col gap-4 p-4 bg-slate-200">
      <div className="flex flex-row flex-wrap gap-4">
        <UploadCSVBox />
        <StatisticsBox />
        <DatePickerBox
          month={month}
          setMonth={setMonth}
          year={year}
          setYear={setYear}
        />
      </div>
      <SpendsList month={month} year={year} />
    </div>
  );
}
