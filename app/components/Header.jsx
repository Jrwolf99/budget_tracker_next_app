'use client';
import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import { fetchCurrentUser, logout } from '../utility/common';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathName = usePathname();

  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    fetchCurrentUser().then((res) => setCurrentUser(res));
  }, []);

  if (
    pathName === '/login' ||
    pathName === '/register' ||
    pathName === '/reset-password' ||
    pathName === '/verify-email'
  ) {
    return null;
  }

  return (
    <div>
      <header className="bg-main text-white py-6 px-8 shadow-md flex justify-between items-center">
        <Link
          href={`/overview?selected_identifier=all&year=${new Date().getFullYear()}`}
          className="cursor-pointer flex items-center"
        >
          <h1 className="text-xl sm:text-3xl font-semibold mr-4">
            Budget Tracker
          </h1>
        </Link>
        <div className="ml-auto flex flex-wrap gap-4">
          <div className="flex items-center gap-2 mr-4">
            <p className="text-xs sm:text-lg font-semibold">
              Hi,{' '}
              {currentUser?.email === 'jrwolf99+guest@outlook.com'
                ? 'Guest'
                : currentUser?.email}
              !
            </p>
          </div>

          <Link
            href="/settings"
            className="bg-mainHover hover:bg-black/30 transition transition-all
            rounded-md text-white font-semibold py-2 px-4 rounded"
          >
            <p className="text-xs sm:text-md cursor-pointer">Settings</p>
          </Link>

          <button
            className="bg-mainHover hover:bg-black/30 transition transition-all rounded-md text-white font-semibold py-2 px-4 rounded"
            type="button"
            onClick={() => logout()}
          >
            <p className="text-xs sm:text-md cursor-pointer">Logout</p>
          </button>
        </div>
      </header>
      <nav className="bg-white font-bold shadow-md py-2 text-sm px-6">
        <ul className="flex space-x-4">
          <li>
            <Link
              href={`/overview?selected_identifier=all&year=${new Date().getFullYear()}`}
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
