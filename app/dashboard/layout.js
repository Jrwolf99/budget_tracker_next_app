import Link from 'next/link';
import React from 'react';

export default function DashboardLayout({ children }) {
  return (
    <>
      <nav className="bg-[#f6f6f6] shadow-sm py-2 text-sm px-6 mb-3">
        <ul className="flex space-x-4">
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
