import React, { useState } from 'react';
import Tooltip from '../components/ToolTip';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import HorizontalChart from '../components/HorizontalChart';
import { ResponsiveContainer } from 'recharts';

export default function CategoryCard({ category, canHover }) {
  return (
    <>
      <div
        className={`w-full justify-start bg-slate-100 border border-green-400 rounded-lg p-4 ${
          canHover ? '' : ''
        } transition duration-200 ease-in-out`}
      >
        <div className="flex justify-between items-center mb-4 ">
          <p className="text-sm">{category.label}</p>
          <Tooltip
            tooltipText={
              <p className="text-sm">
                {category.list_of_included_categories.join(', ')}
              </p>
            }
            position="top"
          >
            <InformationCircleIcon className="h-4 w-4 ml-2" />
          </Tooltip>
        </div>
        <ResponsiveContainer width="99%" height={120}>
          <HorizontalChart
            graph_data={[
              { name: 'Target', value: category.goal },
              { name: 'Actual', value: category.value },
            ]}
            dataKeys={['actual', 'target']}
          />
        </ResponsiveContainer>
      </div>
    </>
  );
}
