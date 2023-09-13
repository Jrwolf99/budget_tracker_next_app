'use client';
import React, { useEffect } from 'react';
import UploadCSVBox from './components/UploadCSVBox';
import { authedGet } from '@/app/utility/common';
import { currentUserId } from '@/app/utility/localStorage';
import SpendsList from './components/SpendsList';
import StatisticsBox from './components/StatisticsBox';
import DatePickerBox from './components/DatePickerBox';

export default function TransactionsPage() {
  return (
    <div className="flex flex-col gap-4 p-4 bg-slate-200">
      <div className="flex flex-row flex-wrap">
        <UploadCSVBox />
        <StatisticsBox />
        <DatePickerBox />
      </div>
      <SpendsList />
    </div>
  );
}
