import React from 'react';
import CardContainer from '../components/general/CardContainer';
import LinesChart from '../components/LinesChart';
import { humanize } from '../utility/common';

export default function CategoryLineGraphs({
  selectedIdentifier,
  overviewData,
}) {
  const expenseData = overviewData.map((month) => ({
    name: month.month_name.slice(0, 3),
    value: Math.abs(month.month_expenses),
    secondValue: Math.abs(month.month_expense_goals),
  }));

  const incomeData = overviewData.map((month) => ({
    name: month.month_name.slice(0, 3),
    value: Math.abs(month.month_income),
  }));

  const profitMarginData = overviewData.map((month) => {
    const income = Math.abs(month.month_income);
    const expenses = Math.abs(month.month_expenses);
    const expenseGoals = Math.abs(month.month_expense_goals);

    const value = ((income - expenses) / income) * 100;
    const secondValue = ((income - expenseGoals) / income) * 100;

    return {
      name: month.month_name.slice(0, 3),
      value: value.toFixed(2),
      secondValue: secondValue.toFixed(2),
    };
  });

  return (
    <CardContainer customClassNames="mb-[150px] w-[90vw] max-w-[1000px] mx-6">
      {selectedIdentifier === 'all' && (
        <div>
          <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">
            Income
          </h1>
          <div className="w-full h-[400px]">
            <LinesChart graph_data={incomeData} labelOne="Income" />
          </div>
        </div>
      )}
      <div>
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Expenses {'(' + humanize(selectedIdentifier) + ')'}
        </h1>
        <div className="w-full h-[400px]">
          <LinesChart
            graph_data={expenseData}
            labelOne="Expenses"
            labelTwo="Goal"
            color="#bd3d3d"
          />
        </div>
      </div>

      {selectedIdentifier === 'all' && (
        <div>
          <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">
            Profit
          </h1>
          <div className="w-full h-[400px]">
            <LinesChart
              graph_data={profitMarginData}
              labelOne="Actual Profit Margin"
              labelTwo="Goal Profit Margin"
            />
          </div>
        </div>
      )}
    </CardContainer>
  );
}
