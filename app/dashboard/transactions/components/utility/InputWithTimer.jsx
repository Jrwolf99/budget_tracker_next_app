import { CheckCircleIcon } from '@heroicons/react/24/outline';
import React, { useState, useEffect, useRef } from 'react';

const InputWithTimer = ({ timerEndFunction, value, setValue }) => {
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
        }, 2000)
      );
    }
  }, [value]);

  return (
    <div className="flex flex-row justify-start items-center gap-1">
      <input
        type="text"
        className="border border-gray-400 rounded-md p-1 w-full"
        value={value || ''}
        onChange={(e) => setValue(e.target.value)}
      />
      <CheckCircleIcon
        className={`h-6 w-6 text-green-500 ${
          saved ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

export default InputWithTimer;
