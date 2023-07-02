'use client';

import Link from 'next/link';

import React, { useState, useEffect } from 'react';
import useLocalStorage from '../utility_hooks/useLocalStorage';
import DatePicker from './DatePicker';

export default function Header() {
  const [selectedMonth, storeSelectedMonth] = useLocalStorage(
    'selectedMonth',
    '1'
  );
  const [selectedYear, storeSelectedYear] = useLocalStorage(
    'selectedYear',
    '2023'
  );

  return (
    <div>
      <header className="bg-primaryDark text-white py-6 px-4 shadow-md flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Budget Tracker</h1>
        <DatePicker
          storeSelectedMonth={storeSelectedMonth}
          storeSelectedYear={storeSelectedYear}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      </header>
      <nav className="bg-white font-bold shadow-md py-4 px-6">
        <ul className="flex space-x-4">
          <li>
            <Link
              href="/dashboard/graphs"
              className="text-gray-800 hover:text-primaryHover"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/transactions"
              className="text-gray-800 hover:text-primaryHover"
            >
              Transactions
            </Link>
          </li>
          <li>
            <Link
              href="/information"
              className="text-gray-800 hover:text-primaryHover"
            >
              Information
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
