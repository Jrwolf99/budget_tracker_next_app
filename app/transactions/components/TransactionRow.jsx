import React, { useEffect } from 'react';
import useFormat from '../../utility_hooks/useFormat';
import { useState } from 'react';
import InputWithTimer from './InputWithTimer';
import usePut from '@/app/utility_hooks/usePut';
import useGet from '@/app/utility_hooks/useGet';
import Select from 'react-select';
export default function TransactionRow({ transaction, listOfCategories }) {
  const { formatDate } = useFormat();

  const { putData: updateRowNotes } = usePut('/transactions/set_notes');
  const { putData: updateRowCategory } = usePut('/transactions/set_category');

  const [notes, setNotes] = useState(transaction.notes);
  const [options, setOptions] = useState();
  const [selectedOption, setSelectedOption] = useState();

  useEffect(() => {
    setOptions(
      listOfCategories?.map((category) => ({
        value: category.id,
        label: category.category_name,
      }))
    );
  }, [listOfCategories]);

  useEffect(() => {
    setSelectedOption({
      value: transaction.category_id,
      label: transaction.category_name,
    });
    setNotes(transaction.notes);
  }, [transaction]);

  return (
    <>
      <td className="px-4 py-2 text-sm">{transaction.description}</td>
      <td className="px-4 py-2">
        <InputWithTimer
          timerEndFunction={() => {
            updateRowNotes({
              id: transaction.id,
              notes: notes,
            });
          }}
          value={notes}
          setValue={setNotes}
        />
      </td>
      <td className="px-4 py-2">{transaction.amount}</td>
      <td className="px-4 py-2">
        <Select
          name="colors"
          defaultValue={{
            value: transaction.category_id,
            label: transaction.category_name,
          }}
          options={options}
          className="text-sm min-w-[200px]"
          classNamePrefix="select"
          onChange={(selectedOption) => {
            updateRowCategory({
              id: transaction.id,
              category_id: selectedOption.value,
            });
            setSelectedOption(selectedOption);
          }}
          value={selectedOption}
        />
      </td>
      <td className="px-4 py-2">{formatDate(transaction.transaction_date)}</td>
    </>
  );
}
