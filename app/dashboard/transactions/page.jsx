'use client';
import React, { useEffect } from 'react';
import UploadCSVBox from './components/upload';
import { authedGet } from '@/app/utility/common';
import { currentUserId } from '@/app/utility/localStorage';
import SpendsList from './components/SpendsList';

export default function TransactionsPage() {
  return (
    <div className="flex flex-col gap-4 py-4 bg-slate-200">
      <UploadCSVBox />
      <SpendsList />
    </div>
  );
}
