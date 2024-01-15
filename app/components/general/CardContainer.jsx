import React from 'react';

export default function CardContainer({ children, customClassNames }) {
  return (
    <div
      className={`p-2 mx-1 sm:p-8 sm:mx-2 shadow-lg rounded-lg bg-white overflow-x-auto ${customClassNames}`}
    >
      {children}
    </div>
  );
}
