import React from 'react'
import useFormat from '../../utility_hooks/useFormat';
import { useState } from 'react';
import InputWithTimer from './InputWithTimer';
import usePut from '@/app/utility_hooks/usePut';
import CreatableSelect from 'react-select/creatable';
export default function TransactionRow({transaction}) {
  
    const { formatDate } = useFormat();
    const { putData: updateRowNotes } = usePut('/transactions/update_row_notes');
    const { putData: updateRowCategory } = usePut('/transactions/update_row_category');
    const [notes, setNotes] = useState(transaction.notes);
    const [options, setOptions] = useState(transaction.list_of_categories);
    const [selectedOption, setSelectedOption] = useState({ label: transaction.category, value: transaction.category });
    
    const handleCategorySelectChange = (selectedOption) => {
      updateRowCategory({
        id: transaction.id,
        category: selectedOption.label
      });
      setSelectedOption(selectedOption);
    }

    const handleCreateOption = (inputValue) => {
        const newOption = {
            label: inputValue,
            value: inputValue
        };
        setOptions((prev) => [...prev, newOption]);
        handleCategorySelectChange(newOption);
    };


    return (
      <>
          <td className="px-4 py-2 text-sm">{transaction.description}</td>
          <td className="px-4 py-2">
            <InputWithTimer timerEndFunction={() => {
                 updateRowNotes({
                  id: transaction.id,
                  notes: notes
              });
            }} value={notes} setValue={setNotes} />
          </td>
          <td className="px-4 py-2">{transaction.amount}</td>
          <td className="px-4 py-2">
            <CreatableSelect
              name="colors"
              defaultValue={{ label: transaction.category, value: transaction.category }}
              options={options}
              className="text-sm min-w-[200px]"
              classNamePrefix="select"
              onChange={handleCategorySelectChange}
              onCreateOption={handleCreateOption}
              value={selectedOption}
            />
          </td>
          <td className="px-4 py-2">{formatDate(transaction.transaction_date)}</td>
      </>
  )
}
