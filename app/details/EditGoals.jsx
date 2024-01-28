import React, { useEffect } from 'react';
import { useState } from 'react';
import EditGoalsCalculator from './EditGoalsCalculator';
import { authedPost } from '../utility/common';
import { currentUserId } from '../utility/localStorage';
export default function EditGoals({ month, year, setTab }) {
  const [categoryAmounts, setCategoryAmounts] = useState({
    groceries_food: 380,
    needed_goods: 50,
    insurance: 362,
    gas_and_car: 50,
    rent: 900,
    utilities: 200,
    other_food: 200,
    wanted_goods: 150,
    gift: 150,
    subscriptions: 150,
    fun_activities: 150,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    Object.entries(categoryAmounts).forEach(([category, amount]) => {
      if (!amount) {
        return;
      }
      authedPost('/goals/create_or_update_goal', {
        target_value: amount,
        user_id: currentUserId(),
        month,
        year,
        spend_category_identifier: category,
      })
        .then((res) => {
          console.log(res);
          setTab('details');
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  if (month === 'all') {
    return (
      <div className="text-center">
        Setting goals is not avaible for the all months selection
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <EditGoalsCalculator
          categoryAmounts={categoryAmounts}
          setCategoryAmounts={setCategoryAmounts}
        />

        <button
          type="submit"
          className="bg-blue-500 hover-bg-blue-500 text-white font-bold py-2 px-4 rounded-full mt-4 hover:bg-blue-700 transition duration-[10ms] ease-in-out"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
