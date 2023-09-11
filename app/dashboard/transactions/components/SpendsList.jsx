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

export default function SpendsList() {
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
      },
    })
      .then((response) => {
        setSpends(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchParams]);

  return (
    <CardContainer customClassNames="min-h-[500px]">
      <table className="table-auto w-full text-left">
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
      <th className="px-4 py-2">Description</th>
      <th className="px-4 py-2">Notes</th>
      <th className="px-4 py-2">
        <div className="flex">
          <button className="text-sm flex-1 inline">Amount</button>
          <Tooltip
            className="inline"
            tooltipText="Amount is all categories except Income, Savings, Refunds, and Transfers"
          >
            <InformationCircleIcon className="h-5 w-5 text-gray-500" />
          </Tooltip>
        </div>
      </th>
      <th className="px-4 py-2 flex gap-4 items-center w-[200px]">
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
      <th className="px-4 py-2">
        <button className="text-sm flex-1" onClick={() => handleSort()}>
          Date of Transaction
        </button>
      </th>
    </tr>
  );
};
