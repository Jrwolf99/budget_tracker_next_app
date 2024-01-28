'use client';
import useFormat from '@/app/utility/useFormat';
import React, { useState } from 'react';

import CardContainer from '../components/general/CardContainer';
import DatePicker from '../components/DatePicker';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Details from './Details';
import EditGoals from './EditGoals';

export default function DetailsPage() {
  const { monthIntToString } = useFormat();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [month, setMonth] = useState(
    searchParams.get('month') || 1 + new Date().getMonth()
  );

  const [year, setYear] = useState(
    searchParams.get('year') || new Date().getFullYear().toString()
  );

  const [tab, setTab] = useState(searchParams.get('tab') || 'details');

  return (
    <>
      <CardContainer customClassNames="m-4 flex justify-between items-center flex-col">
        <div className="flex flex-wrap justify-between items-center pr-8 mb-6 w-full">
          <h2 className="font-bold text-[10px] sm:text-[15px]">
            {monthIntToString(month)} {year} Expenses
          </h2>
          <div className="flex flex-wrap justify-between items-center gap-4">
            {tab === 'details' && (
              <button
                type="button"
                className="underline text-sm"
                onClick={() => {
                  setTab('edit');
                  const params = new URLSearchParams(searchParams);
                  params.set('tab', 'edit');
                  router.replace(`?${params}`);
                }}
              >
                Go to Category Goal Calculator
              </button>
            )}
            {tab === 'edit' && (
              <button
                type="button"
                className="underline text-sm"
                onClick={() => {
                  setTab('details');
                  const params = new URLSearchParams(searchParams);
                  params.set('tab', 'details');
                  router.replace(`?${params}`);
                }}
              >
                Go to Category Details
              </button>
            )}
            <DatePicker
              month={month}
              year={year}
              setMonth={setMonth}
              setYear={setYear}
            />
          </div>
        </div>
        {(() => {
          switch (tab) {
            case 'details':
              return <Details month={month} year={year} />;
            case 'edit':
              return <EditGoals month={month} year={year} setTab={setTab} />;
            default:
              return <Details month={month} year={year} />;
          }
        })()}
      </CardContainer>
    </>
  );
}
