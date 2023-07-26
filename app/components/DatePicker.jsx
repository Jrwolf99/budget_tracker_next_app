'use client';
import React from 'react';

function DatePicker({
  selectedMonth,
  storeSelectedMonth,
  selectedYear,
  storeSelectedYear,
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

  return (
    <div className="flex space-x-4 text-black">
      <select
        className="bg-white border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
        value={selectedMonth}
        onChange={(e) => {
          storeSelectedMonth(e.target.value);
          window.location.reload();
        }}
      >
        <option value="">Select Month</option>
        <option value="all">Full Year</option>
        {months.map((month, index) => (
          <option key={index} value={index + 1}>
            {month}
          </option>
        ))}
      </select>

      <select
        className="bg-white border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
        value={selectedYear}
        onChange={(e) => {
          storeSelectedYear(e.target.value);
          window.location.reload();
        }}
      >
        <option value="">Select Year</option>
        {years.map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DatePicker;
