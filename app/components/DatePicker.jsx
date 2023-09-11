'use client';
import React from 'react';

function DatePicker({ month, setMonth, year, setYear, justYear }) {
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
      {!justYear && (
        <select
          className="bg-white border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={month}
          onChange={(e) => {
            setMonth(e.target.value);
          }}
        >
          <option value="">Select Month</option>
          <option value="all">Full Year</option>
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
