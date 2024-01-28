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

  const profitData = overviewData.map((month) => ({
    name: month.month_name.slice(0, 3),
    value: (
      Math.abs(month.month_income).toFixed(2) -
      Math.abs(month.month_expenses).toFixed(2)
    ).toFixed(2),
    secondValue:
      Math.abs(month.month_income).toFixed(2) -
      Math.abs(month.month_expense_goals).toFixed(2),
  }));

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
              graph_data={profitData}
              labelOne="Actual Profit"
              labelTwo="Expected Profit"
            />
          </div>
        </div>
      )}
    </CardContainer>
  );
}
