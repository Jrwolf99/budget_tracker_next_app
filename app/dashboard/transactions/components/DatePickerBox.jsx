import DatePicker from '@/app/components/DatePicker';
import CardContainer from '@/app/components/general/CardContainer';
import React, { useState } from 'react';

export default function DatePickerBox({ month, setMonth, year, setYear }) {
  return (
    <CardContainer customClassNames="flex-1 min-w-[300px] max-w-[400px]">
      <div className="text-sm mb-4 font-semibold text-gray-600">
        Month and Year
      </div>

      <DatePicker
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
      />
    </CardContainer>
  );
}
