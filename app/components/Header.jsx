'use client';

import Link from 'next/link';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { isInNoHeaderList, logout } from '../utility/common';

export default function Header() {
  useEffect(() => {
    const handleWindowClose = (e) => {
      if (isLoggedIn()) logout();
    };
    window.addEventListener('beforeunload', handleWindowClose);
    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
    };
  }, []);

  if (isInNoHeaderList(usePathname())) {
    return null;
  }

  return (
    <div>
      <header className="bg-primaryDark text-white py-6 px-8 shadow-md flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Budget Tracker</h1>

        <button
          className="bg-primaryHover hover:bg-black/30 transition transition-all rounded-md text-white font-semibold py-2 px-4 rounded"
          type="button"
          onClick={() => logout()}
        >
          <p className="text-md cursor-pointer">Logout</p>
        </button>
      </header>
      <nav className="bg-white font-bold shadow-md py-2 text-sm px-6">
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
              href="/overview"
              className="text-gray-800 hover:text-primaryHover"
            >
              Overview
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
