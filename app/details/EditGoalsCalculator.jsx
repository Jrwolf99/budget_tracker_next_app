import React, { useState, useEffect } from 'react';
import { humanize } from '../utility/common';

export default function EditGoalsCalculator({
  categoryAmounts,
  setCategoryAmounts,
}) {
  const [totalBudget, setTotalBudget] = useState(2742);

  const [categoryPercentages, setCategoryPercentages] = useState({
    groceries_food: 0,
    needed_goods: 0,
    insurance: 0,
    gas_and_car: 0,
    rent: 0,
    utilities: 0,
    other_food: 0,
    wanted_goods: 0,
    gift: 0,
    subscriptions: 0,
    fun_activities: 0,
  });

  const handleCategoryAmountChange = (category, amount) => {
    setCategoryAmounts({
      ...categoryAmounts,
      [category]: parseFloat(amount),
    });
  };

  useEffect(() => {
    const totalAmount = Object.values(categoryAmounts).reduce(
      (acc, currentValue) => acc + currentValue,
      0
    );

    const newCategoryPercentages = {};
    for (const category in categoryAmounts) {
      newCategoryPercentages[category] = (
        (categoryAmounts[category] / totalAmount) *
        100
      ).toFixed(2);
    }

    setCategoryPercentages(newCategoryPercentages);
  }, [totalBudget, categoryAmounts]);

  const handleTotalBudgetChange = (budget) => {
    setTotalBudget(parseFloat(budget));
  };

  const amountLeft =
    totalBudget -
    Object.values(categoryAmounts).reduce(
      (acc, currentValue) => acc + currentValue,
      0
    );

  return (
    <>
      <div className="mb-4">
        <label
          htmlFor="totalBudget"
          className="block text-gray-700 font-bold mb-2"
        >
          Total Budget:
        </label>
        <input
          type="number"
          id="totalBudget"
          name="totalBudget"
          value={totalBudget}
          onChange={(e) => handleTotalBudgetChange(e.target.value)}
          className="bg-gray-200 border-2 border-gray-300 rounded-lg py-2 px-4 w-full"
        />
      </div>

      <div
        className={`mb-4 ${
          amountLeft < 0 ? 'text-red-500 font-bold' : 'text-green-500 font-bold'
        }`}
      >
        Amount Left: ${amountLeft.toFixed(2)}
      </div>

      <table className="w-full table-fixed max-w-[400px]">
        <thead>
          <tr>
            <th className="text-left"></th>
            <th className="text-right"></th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(categoryAmounts).map((category) => (
            <tr key={category}>
              <td>
                <label
                  htmlFor={category}
                  className="block text-gray-700 font-bold mb-2"
                >
                  {humanize(category)} ($):
                </label>
                <input
                  type="number"
                  id={category}
                  name={category}
                  value={categoryAmounts[category]}
                  onChange={(e) =>
                    handleCategoryAmountChange(category, e.target.value)
                  }
                  className={`bg-gray-200 border-2 border-gray-300 rounded-lg py-2 px-4 w-full`}
                />
              </td>
              <td className="text-right">
                <span className="text-sm text-gray-500">
                  {categoryPercentages[category]
                    ? `${categoryPercentages[category]}%`
                    : '0.00%'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
