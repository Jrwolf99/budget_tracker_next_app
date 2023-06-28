import React, { useState, useEffect, useRef } from 'react';

const InputWithTimer = ({timerEndFunction, value, setValue}) => {
    const [timer, setTimer] = useState(null);
    const firstUpdate = useRef(true);

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        if (timer) {
            clearTimeout(timer);
        }
        if (value !== '' && value !== null) {
            setTimer(setTimeout(() => {
                console.log('save');
                timerEndFunction();
            }, 3000)); // 3000ms delay
        }
    }, [value]);

    return (
        <input
        type="text"
        className="border border-gray-400 rounded-md p-1"
        value={value || ''}
        onChange={(e) => setValue(e.target.value)}
        />
    );
};

export default InputWithTimer;
