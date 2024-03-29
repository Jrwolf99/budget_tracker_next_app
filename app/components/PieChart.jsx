import { ChevronDownIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import useResize from '../utility/useResize';

const MyTable = ({ payload, colorScale, month, year }) => {
  const formatDollar = (dollarAmount) => {
    let dollar = dollarAmount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return dollar;
  };

  const [folded, setFolded] = useState(false);
  const router = useRouter();

  return (
    <div className="rounded-md shadow-lg mt-4 overflow-hidden text-sm bg-slate-200 border">
      <table className="divide-gray-200 table-auto min-w-full transform-all transition duration-200 ease-in-out">
        <thead
          onClick={() => setFolded(!folded)}
          className="cursor-pointer h-[40px]"
        >
          <tr>
            <th
              scope="col"
              className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <ChevronDownIcon
                className={`${
                  folded ? 'transform -rotate-90' : ''
                } w-4 h-4 text-gray-500`}
              />
            </th>
            {!folded ? (
              <>
                <th
                  scope="col"
                  className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="pl-4 pr-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Expense
                </th>
              </>
            ) : (
              <th
                scope="col"
                className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                See Expense Percentage Breakdown
              </th>
            )}
          </tr>
        </thead>
        {folded ? null : (
          <tbody className="min-w-full bg-white divide-y divide-gray-200">
            <tr className="hover:bg-slate-200 font-bold">
              <td className="px-1 py-2 whitespace-nowrap">
                <span style={{ color: '#000' }}>■</span>
              </td>
              <td className="px-1 py-2 whitespace-nowrap">Total Spent</td>
              <td className="pl-4 pr-6 py-2 whitespace-nowrap">
                {formatDollar(payload.reduce((a, b) => a + b.value, 0))}
              </td>
            </tr>
            {payload.map((entry, index) => (
              <tr
                key={`item-${index}`}
                className="hover:bg-slate-200"
                onClick={() => {
                  console.log(payload);
                  if (
                    payload.includes(
                      payload.find(
                        (item) => item.identifier === 'groceries_food'
                      )
                    )
                  ) {
                    router.push(
                      `/transactions?month=${month}&year=${year}&selected_identifier=${entry.identifier}`
                    );
                  }
                }}
                style={{ cursor: 'pointer' }}
              >
                <td className="px-1 py-2 whitespace-nowrap">
                  <span
                    style={{ color: colorScale[index % colorScale.length] }}
                  >
                    ■
                  </span>
                </td>
                <td className="px-1 py-2 whitespace-nowrap">
                  {entry.label.length > 15
                    ? entry.label.slice(0, 15) + '...'
                    : entry.label}
                </td>
                <td className="pl-4 pr-6 py-2 whitespace-nowrap">
                  {formatDollar(entry.value)}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
  name,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 10;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const textAnchor = x > cx ? 'start' : 'end';

  if ((percent * 100).toFixed(0) > 2)
    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={textAnchor}
        dominantBaseline="central"
      >
        {`${name}: ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  else return null;
};

const PieChartComponent = ({ data, month, year }) => {
  const { isSmallScreenAndUnder, setIsSmallScreenAndUnder } = useResize();

  const sortedData = data.sort((a, b) => b.percentage - a.percentage);
  const colorScale = [
    '#0C8111',
    '#188F20',
    '#2A9D37',
    '#4CAB5B',
    '#6EB97F',
    '#90C8A3',
    '#B3D6C7',
    '#D6E4EC',
    '#D6E4EC',
    '#D6E4EC',
    '#D6E4EC',
    '#D6E4EC',
  ];

  return (
    <div className="">
      <PieChart
        width={isSmallScreenAndUnder ? 300 : 400}
        height={isSmallScreenAndUnder ? 300 : 400}
      >
        <Pie
          data={sortedData}
          dataKey="value"
          nameKey="label"
          cx="50%"
          cy="50%"
          innerRadius={isSmallScreenAndUnder ? 40 : 60}
          outerRadius={isSmallScreenAndUnder ? 60 : 90}
          label={renderCustomizedLabel}
          labelLine={false}
          className="text-[8px] sm:text-[12px]"
        >
          {sortedData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colorScale[index % colorScale.length]}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <MyTable
        payload={sortedData}
        colorScale={colorScale}
        month={month}
        year={year}
      />
    </div>
  );
};

export default PieChartComponent;
