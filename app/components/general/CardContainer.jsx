import React from 'react';

export default function CardContainer({ children, customClassNames }) {
  return (
    <div
      className={`p-8 mx-8 shadow-lg rounded-lg bg-white overflow-x-auto ${customClassNames}`}
    >
      {children}
    </div>
  );
}
