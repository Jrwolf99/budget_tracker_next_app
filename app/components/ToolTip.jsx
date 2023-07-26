import React, { useRef } from 'react';

export default function Tooltip({ children, tooltipText }) {
  const tipRef = useRef(null);

  function handleMouseEnter() {
    tipRef.current.style.opacity = 1;
  }

  function handleMouseLeave() {
    tipRef.current.style.opacity = 0;
  }

  return (
    <div className="relative flex items-center z-50">
      <div
        className="absolute whitespace-no-wrap bg-gradient-to-r from-black to-gray-700 text-white px-4 py-2 rounded flex items-center transition-all duration-150"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, 20%)',
          opacity: 0,
        }}
        ref={tipRef}
      >
        <div />
        {tooltipText}
      </div>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </div>
    </div>
  );
}
