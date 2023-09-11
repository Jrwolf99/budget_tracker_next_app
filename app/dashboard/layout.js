'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { isInNoHeaderList } from '../utility/common';

export default function DashboardLayout({ children }) {
  if (isInNoHeaderList(usePathname())) {
    return null;
  }

  return (
    <>
      <nav className="bg-[#f6f6f6] shadow-sm py-2 text-sm px-6">
        <ul className="flex space-x-4">
          <li>
            <Link
              href="/dashboard/transactions?selected_identifier=all"
              className="text-gray-800 hover:text-primaryHover"
            >
              Transactions
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/graphs"
              className="text-gray-800 hover:text-primaryHover"
            >
              Graphs
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/set_goals"
              className="text-gray-800 hover:text-primary"
            >
              Set Goals
            </Link>
          </li>
        </ul>
      </nav>
      <div>{children}</div>
    </>
  );
}
