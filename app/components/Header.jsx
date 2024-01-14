'use client';
import React, { useEffect } from 'react';

import Link from 'next/link';

import { logout } from '../utility/common';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathName = usePathname();

  if (
    pathName === '/login' ||
    pathName === '/register' ||
    pathName === '/reset-password' ||
    pathName === '/forgot-password'
  ) {
    return null;
  }

  return (
    <div>
      <header className="bg-main text-white py-6 px-8 shadow-md flex justify-between items-center">
        <h1 className="text-xl sm:text-3xl font-semibold">Budget Tracker</h1>
        <button
          className="bg-mainHover hover:bg-black/30 transition transition-all rounded-md text-white font-semibold py-2 px-4 rounded"
          type="button"
          onClick={() => logout()}
        >
          <p className="text-xs sm:text-md cursor-pointer">Logout</p>
        </button>
      </header>
      <nav className="bg-white font-bold shadow-md py-2 text-sm px-6">
        <ul className="flex space-x-4">
          <li>
            <Link
              href="/overview"
              className="text-gray-800 hover:text-mainHover"
            >
              Overview
            </Link>
          </li>
          <li>
            <Link
              href="/details"
              className="text-gray-800 hover:text-mainHover"
            >
              Details
            </Link>
          </li>
          <li>
            <Link
              href="/transactions?selected_identifier=all"
              className="text-gray-800 hover:text-mainHover"
            >
              Transactions
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
