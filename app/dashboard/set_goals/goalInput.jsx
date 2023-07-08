import usePost from '@/app/utility_hooks/usePost';
import React, { useState } from 'react';

export default function GoalInput({ category, myGoals, setMyGoals }) {
  const handleGoalAmountChange = (e) => {
    setMyGoals({ ...myGoals, [category.id]: e.target.value });
  };

  return (
    <label className="flex flex-col gap-1">
      {category.category_name}
      <input
        type="number"
        value={myGoals[category.id] || ''}
        onChange={handleGoalAmountChange}
        className="border border-gray-300 rounded-md p-2 w-[300px]"
      />
    </label>
  );
}
