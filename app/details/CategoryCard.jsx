import React, { useState } from 'react';
import { GoalEditModal } from '../components/GoalEditModal';
import Tooltip from '../components/ToolTip';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import HorizontalChart from '../components/HorizontalChart';
import { ResponsiveContainer } from 'recharts';

export default function CategoryCard({
  category,
  month,
  year,
  currentReportType,
  reportTypes,
}) {
  const [showEditGoalModal, setShowEditGoalModal] = useState(false);
  const [pickedCategory, setPickedCategory] = useState(null);

  return (
    <>
      <div
        onClick={() => {
          console.log('clicked');
          setShowEditGoalModal(true);
          setPickedCategory(category);
        }}
        className="w-full justify-start bg-slate-100 border border-green-400 rounded-lg p-4 hover:bg-slate-200 transition duration-200 ease-in-out"
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
        <ResponsiveContainer width="100%" height={120}>
          <HorizontalChart
            graph_data={[
              { name: 'Target', value: category.goal },
              { name: 'Actual', value: category.value },
            ]}
            dataKeys={['actual', 'target']}
          />
        </ResponsiveContainer>
      </div>
      <GoalEditModal
        poweredOn={
          'granular' === reportTypes[currentReportType].identifier
            ? showEditGoalModal
            : false
        }
        onClose={() => setShowEditGoalModal(false)}
        month={month}
        year={year}
        currentGoal={pickedCategory?.goal}
        categoryName={pickedCategory?.label}
        spendCategoryID={pickedCategory?.identifier}
      />
    </>
  );
}
