'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

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

  useEffect(() => {
    if (searchParams.get('month')) {
      setMonth(searchParams.get('month'));
    }
    if (searchParams.get('year')) {
      setYear(searchParams.get('year'));
    }
  }, []);

  return (
    <div className="text-[10px] sm:text-[15px] flex flex-wrap gap-1 text-black justify-center items-center">
      {justYear ? null : (
        <select
          className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={searchParams.get('month') || month}
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
        className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
        value={searchParams.get('year') || year}
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
