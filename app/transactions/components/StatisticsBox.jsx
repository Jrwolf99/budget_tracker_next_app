import CardContainer from '@/app/components/general/CardContainer';
import useFormat from '@/app/utility/useFormat';
import React from 'react';

export default function StatisticsBox({ totalSpent, totalEarned }) {
  const { formatDollar } = useFormat();

  return (
    <CardContainer customClassNames="flex-1 min-w-[300px] max-w-[400px]">
      <div className="text-sm mb-4 font-semibold text-gray-600">
        Statistics on the Shown Transactions
      </div>

      <div className="flex flex-row gap-16">
        <div className="flex flex-col gap-1">
          <div className="text-sm text-gray-600">Total Spent Amount</div>
          <div className="text-sm text-gray-600">Total Income</div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-sm text-red-600">{formatDollar(totalSpent)}</div>
          <div className="text-sm text-green-600">
            {formatDollar(totalEarned)}
          </div>
        </div>
      </div>
    </CardContainer>
  );
}
