'use client';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Select from 'react-select';
import CardContainer from '@/app/components/general/CardContainer';
import { authedGet } from '@/app/utility/common';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import SpendRow from './SpendRow';
import useResize from '@/app/utility/useResize';

export default function SpendsList({ spends }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [listOfCategories, setListOfCategories] = useState([]);

  const { isSmallScreenAndUnder, isExtraSmallScreenAndUnder } = useResize();

  return (
    <CardContainer customClassNames="min-h-[500px]">
      <table className="table-fixed w-full text-left">
        <thead>
          <HeaderRow
            searchParams={searchParams}
            router={router}
            pathname={pathname}
            listOfCategories={listOfCategories}
            setListOfCategories={setListOfCategories}
            isSmallScreenAndUnder={isSmallScreenAndUnder}
          />
        </thead>
        <tbody>
          {spends.map((spend) => {
            return (
              <SpendRow
                key={spend.id}
                spend={spend}
                listOfCategories={listOfCategories}
                isSmallScreenAndUnder={isSmallScreenAndUnder}
              />
            );
          })}
        </tbody>
      </table>
    </CardContainer>
  );
}

const HeaderRow = ({
  searchParams,
  router,
  pathname,
  listOfCategories,
  setListOfCategories,
  isSmallScreenAndUnder,
}) => {
  useEffect(() => {
    authedGet('/spend_categories/show_spend_categories_all').then(
      (response) => {
        setListOfCategories([
          { identifier: 'all', name: 'All' },
          { identifier: 'uncategorized', name: 'Uncategorized' },
          ...response.data,
        ]);
      }
    );
  }, []);

  const selectOptionsSpendCategory = listOfCategories?.map((category) => {
    return {
      value: category.identifier,
      label: category.name,
    };
  });

  return (
    <tr>
      {!isSmallScreenAndUnder && (
        <>
          <th className="px-4 py-2 min-w-[400px]">Description</th>
          <th className="px-4 py-2 w-[100px]">Last Four</th>
          <th className="px-4 py-2 w-[150px]">Amount</th>
          <th className="px-4 py-2">Notes</th>
        </>
      )}
      <th className="px-4 py-2 flex gap-4 items-center">
        <Select
          id="long-value-select"
          instanceId="long-value-select"
          className="text-sm flex-1"
          name="categories"
          options={selectOptionsSpendCategory}
          onChange={(e) => {
            const params = new URLSearchParams(searchParams);
            params.set('selected_identifier', e.value);
            router.replace(`${pathname}?${params}`);
          }}
          value={
            {
              value: searchParams.get('selected_identifier'),
              label: listOfCategories?.find(
                (category) =>
                  category.identifier ===
                  searchParams.get('selected_identifier')
              )?.name,
            } || { value: 'all', label: 'All' }
          }
        />
      </th>
      {!isSmallScreenAndUnder && (
        <th className="px-4 py-2 w-[200px]">
          <div className="flex-1">Date of Transaction</div>
        </th>
      )}
    </tr>
  );
};
