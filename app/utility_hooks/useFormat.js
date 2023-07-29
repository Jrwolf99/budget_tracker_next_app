import React, { useState } from 'react';

function useFormat() {


  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const formatDate = (dateString) => {

    const dateParts = dateString.split('-');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]);
    const day = parseInt(dateParts[2]);

    const formattedDate = `${months[month - 1]} ${day}, ${year}`;
    return formattedDate;
  };

  const monthIntToString = (monthInt) => {
    return months[monthInt - 1];
  };

  const formatDollar = (dollarAmount) => {
    return dollarAmount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  return {months, formatDate, monthIntToString, formatDollar };
}

export default useFormat;
