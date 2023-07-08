'use client';

import useFormat from '@/app/utility_hooks/useFormat';
import useGet from '@/app/utility_hooks/useGet';
import useLocalStorage from '@/app/utility_hooks/useLocalStorage';
import React, { useEffect, useState } from 'react';
import usePost from '@/app/utility_hooks/usePost';
import GoalInput from './goalInput';

export default function SetGoalsPage() {
  const { data: listOfCategories } = useGet(`/categories`);
  const [month] = useLocalStorage('selectedMonth');
  const [year] = useLocalStorage('selectedYear');
  const { data: listOfGoals } = useGet(`/goals?month=${month}&year=${year}`);
  const { monthIntToString } = useFormat();
  const [myGoals, setMyGoals] = useState({});

  useEffect(() => {
    const newGoals = {};
    listOfGoals?.forEach((goal) => {
      newGoals[goal.category_id] = goal.goal_amount;
    });
    setMyGoals(newGoals);
  }, [listOfGoals]);

  const { postDataJSON: updateOrCreateGoal, isLoading } = usePost(
    `/goals/update_or_create_goal`
  );

  const handleGoalsSubmit = (e) => {
    e.preventDefault();

    Object.keys(myGoals).forEach((category_id) => {
      updateOrCreateGoal({
        category_id: category_id,
        goal_amount: myGoals[category_id],
        month: month,
        year: year,
      });
    });
  };

  return (
    <div className="mt-4 mx-8 p-8 shadow-lg rounded-lg bg-white overflow-x-auto">
      <h2 className="font-bold mb-8">
        Set Goals for {monthIntToString(month)} {year}
      </h2>
      <form
        onSubmit={handleGoalsSubmit}
        className="flex flex-col justify-center items-center gap-8"
      >
        <div className="grid grid-cols-2 gap-8">
          {listOfCategories?.map((category) => (
            <div
              key={category.id}
              className="flex flex-wrap gap-2 w-max-[600px]"
            >
              <GoalInput
                category={category}
                myGoals={myGoals}
                setMyGoals={setMyGoals}
              />
            </div>
          ))}
        </div>
        {isLoading ? (
          <button
            type="submit"
            className="bg-primaryButton hover:bg-primaryButtonHover w-[200px] text-white rounded-md p-2 mt-4"
            disabled
          >
            is loading...
          </button>
        ) : (
          <button
            type="submit"
            className="bg-primaryButton hover:bg-primaryButtonHover w-[200px] text-white rounded-md p-2 mt-4"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
}
