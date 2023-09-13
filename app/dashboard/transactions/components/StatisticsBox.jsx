import CardContainer from '@/app/components/general/CardContainer';
import React from 'react';

export default function StatisticsBox() {
  return (
    <CardContainer customClassNames="flex-1 min-w-[300px] max-w-[400px]">
      <div className="text-sm mb-4 font-semibold text-gray-600">
        Statistics on the Shown Transactions
      </div>

      <div className="">
        <div className="flex flex-row justify-between">
          <div className="text-sm text-gray-600">Total Spent Amount</div>
          <div className="text-sm text-gray-600">$0.00</div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="text-sm text-gray-600">Total Income</div>
          <div className="text-sm text-gray-600">$0.00</div>
        </div>
      </div>
    </CardContainer>
  );
}
