'use client';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Select from 'react-select';
import Tooltip from '@/app/components/ToolTip';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import CardContainer from '@/app/components/general/CardContainer';
import { authedGet } from '@/app/utility/common';
import { currentUserId } from '@/app/utility/localStorage';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import SpendRow from './SpendRow';

export default function SpendsList({ month, year }) {
  const [spends, setSpends] = useState([]);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [listOfCategories, setListOfCategories] = useState([]);

  useEffect(() => {
    if (searchParams.get('selected_identifier') === null) return;
    authedGet('/spend_accounts/show_spends', {
      params: {
        user_id: currentUserId(),
        spend_category_identifier: searchParams.get('selected_identifier'),
        month: month,
        year: year,
      },
    })
      .then((response) => {
        setSpends(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchParams, month, year]);

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
          />
        </thead>
        <tbody>
          {spends.map((spend) => {
            return (
              <SpendRow
                key={spend.id}
                spend={spend}
                listOfCategories={listOfCategories}
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
      <th className="px-4 py-2 min-w-[400px]">Description</th>
      <th className="px-4 py-2 w-[150px]">Amount</th>
      <th className="px-4 py-2">Notes</th>
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
      <th className="px-4 py-2 w-[200px]">
        <button className="flex-1" onClick={() => handleSort()}>
          Date of Transaction
        </button>
      </th>
    </tr>
  );
};
