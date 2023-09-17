import { CheckCircleIcon } from '@heroicons/react/24/outline';
import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';

export default function SelectWithTimer({
  timerEndFunction,
  value,
  setValue,
  options,
}) {
  const [timer, setTimer] = useState(null);
  const firstUpdate = useRef(true);

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (firstUpdate.current === true) {
      firstUpdate.current = false;
      return;
    }
    if (timer) {
      clearTimeout(timer);
    }
    if (value !== '' && value !== null) {
      setTimer(
        setTimeout(() => {
          setSaved(true);
          timerEndFunction();
        }, 300)
      );
    }
  }, [value]);

  return (
    <div className="flex flex-row justify-start items-center gap-1 w-full">
      <Select
        options={options}
        value={options.find((option) => option.value === value)}
        onChange={(selectedOption) => {
          setValue(selectedOption.value);
        }}
        className="w-full"
      />
      <CheckCircleIcon
        className={`h-6 w-6 text-green-500 ${
          saved ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
