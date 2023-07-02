import React, { useEffect } from 'react';
import useFormat from '../../utility_hooks/useFormat';
import { useState } from 'react';
import InputWithTimer from './InputWithTimer';
import usePut from '@/app/utility_hooks/usePut';
import useGet from '@/app/utility_hooks/useGet';
import Select from 'react-select';
export default function TransactionRow({ transaction }) {
  const { formatDate } = useFormat();

  const { putData: updateRowNotes } = usePut('/transactions/update_row_notes');
  const { putData: updateRowCategory } = usePut(
    '/transactions/update_row_category'
  );
  const { data: listOfCategories, loading } = useGet('/categories');

  const [notes, setNotes] = useState(transaction.notes);
  const [options, setOptions] = useState();
  const [selectedOption, setSelectedOption] = useState();

  useEffect(() => {
    if (!loading) {
      setOptions(
        listOfCategories.map((category) => ({
          value: category.category_name,
          label: category.category_name,
        }))
      );
    }
  }, [loading, listOfCategories]);

  const handleCategorySelectChange = (selectedOption) => {
    updateRowCategory({
      id: transaction.id,
      category: selectedOption.label,
    });
    setSelectedOption(selectedOption);
  };

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
          options={options}
          className="text-sm min-w-[200px]"
          classNamePrefix="select"
          onChange={handleCategorySelectChange}
          value={selectedOption}
        />
      </td>
      <td className="px-4 py-2">{formatDate(transaction.transaction_date)}</td>
    </>
  );
}
