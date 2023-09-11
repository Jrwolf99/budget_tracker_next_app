import React, { useEffect, useState } from 'react';
import InputWithTimer from './utility/InputWithTimer';
import { authedPut } from '@/app/utility/common';
import SelectWithTimer from './utility/SelectWithTimer';

export default function SpendRow({ spend, listOfCategories }) {
  const [notes, setNotes] = useState(spend.notes);

  console.log(spend);

  const [spendCategory, setSpendCategory] = useState(
    spend.spend_category_identifier
  );

  const handleSaveNotes = () => {
    authedPut('/spends/update_spend_notes', {
      spend_id: spend.id,
      notes: notes,
    });
  };

  const handleSaveSpendCategory = () => {
    console.log('spend', spend);
    console.log('spendCategory', spendCategory);

    authedPut('/spends/update_spend_category', {
      spend_id: spend.id,
      spend_category: spendCategory,
    });
  };

  const selectOptionsSpendCategory = listOfCategories
    ?.map((category) => {
      return {
        value: category.identifier,
        label: category.name,
      };
    })
    .filter((category) => {
      return category.value !== 'uncategorized' && category.value !== 'all';
    });

  return (
    <tr className="hover:bg-slate-200">
      <td className="px-4 py-2 text-sm">
        <div>{spend.description}</div>
      </td>
      <td className="px-4 py-2">
        <InputWithTimer
          timerEndFunction={() => {
            handleSaveNotes();
          }}
          value={notes}
          setValue={setNotes}
        />
      </td>
      <td className="px-4 py-2">
        <div>{spend.amount}</div>
      </td>
      <td className="px-4 py-2 min-w-[220px]">
        <SelectWithTimer
          timerEndFunction={() => {
            handleSaveSpendCategory();
          }}
          value={spendCategory}
          setValue={setSpendCategory}
          options={selectOptionsSpendCategory}
        />
      </td>
      <td className="px-4 py-2">{spend.date_of_spend}</td>
    </tr>
  );
}
