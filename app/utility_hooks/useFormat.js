import React, { useState } from 'react';

function useFormat(dateString) {
  const formatDate = (dateString) => {
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

    const dateParts = dateString.split('-');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]);
    const day = parseInt(dateParts[2]);

    const formattedDate = `${months[month - 1]} ${day}, ${year}`;
    return formattedDate;
  };

  const monthIntToString = (monthInt) => {
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

    return months[monthInt - 1];
  };

  const formatDollar = (dollarAmount) => {
    return dollarAmount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  return { formatDate, monthIntToString, formatDollar };
}

export default useFormat;
