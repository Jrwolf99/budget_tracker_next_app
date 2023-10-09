'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

function DatePicker({
  month,
  setMonth,
  year,
  setYear,
  justYear,
  noAll = false,
}) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  );

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap gap-4 text-black justify-center items-center">
      {justYear ? null : (
        <select
          className="bg-white border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={month}
          onChange={(e) => {
            setMonth(e.target.value);
            const params = new URLSearchParams(searchParams);
            params.set('month', e.target.value);
            router.replace(`${pathname}?${params}`);
          }}
        >
          <option value="">Select Month</option>
          {!noAll && <option value="all">All Months</option>}
          {months.map((myMonth, index) => (
            <option key={index} value={index + 1}>
              {myMonth}
            </option>
          ))}
        </select>
      )}
      <select
        className="bg-white border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
        value={year}
        onChange={(e) => {
          setYear(e.target.value);
          const params = new URLSearchParams(searchParams);
          params.set('year', e.target.value);
          router.replace(`${pathname}?${params}`);
        }}
      >
        <option value="">Select Year</option>
        {years.map((myYear, index) => (
          <option key={index} value={myYear}>
            {myYear}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DatePicker;
