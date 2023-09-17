'use client';
import React, { useEffect } from 'react';

import Link from 'next/link';

import { isLoggedIn, logout } from '../utility/common';

export default function Header() {
  return (
    <div>
      <header className="bg-primaryDark text-white py-6 px-8 shadow-md flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Budget Tracker</h1>

        {isLoggedIn() && (
          <button
            className="bg-primaryHover hover:bg-black/30 transition transition-all rounded-md text-white font-semibold py-2 px-4 rounded"
            type="button"
            onClick={() => logout()}
          >
            <p className="text-md cursor-pointer">Logout</p>
          </button>
        )}
      </header>
      <nav className="bg-white font-bold shadow-md py-2 text-sm px-6">
        <ul className="flex space-x-4">
          <li>
            <Link
              href="/transactions?selected_identifier=all"
              className="text-gray-800 hover:text-primaryHover"
            >
              Transactions
            </Link>
          </li>
          <li>
            <Link
              href="/overview"
              className="text-gray-800 hover:text-primaryHover"
            >
              Overview
            </Link>
          </li>
          <li>
            <Link
              href="/details"
              className="text-gray-800 hover:text-primaryHover"
            >
              Details
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
