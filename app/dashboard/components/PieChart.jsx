import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const renderCustomizedLegend = ({ payload }) => {
  const formatDollar = (dollarAmount) => {
    let dollar = dollarAmount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return dollar;
  };

  return (
    <div className="rounded-md shadow-lg mt-4 overflow-hidden text-sm bg-red-400">
      <table className="divide-gray-200 table-auto min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            ></th>
            <th
              scope="col"
              className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Category
            </th>
            <th
              scope="col"
              className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Expense
            </th>
            <th
              scope="col"
              className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Percentage of Total
            </th>
          </tr>
        </thead>
        <tbody className="min-w-full bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-1 py-2 whitespace-nowrap"></td>
            <td className="px-1 py-2 whitespace-nowrap text-left">
              <strong>Total Expenses</strong>
            </td>
            <td className="px-1 py-2 whitespace-nowrap">
              <strong>
                {formatDollar(
                  payload.reduce((acc, curr) => acc + curr.payload.value, 0)
                )}
              </strong>
            </td>
            <td className="px-1 py-2 whitespace-nowrap"></td>
          </tr>
          {payload.map((entry, index) => (
            <tr key={`item-${index}`}>
              <td className="px-1 py-2 whitespace-nowrap">
                <span style={{ color: entry.color }}>■</span>
              </td>
              <td className="px-1 py-2 whitespace-nowrap">{entry.value}</td>
              <td className="px-1 py-2 whitespace-nowrap">
                {formatDollar(entry.payload.value)}
              </td>
              <td className="px-1 py-2 whitespace-nowrap">
                {entry.payload.percentage}%
              </td>
            </tr>
          ))}
        </tbody>
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

  if ((percent * 100).toFixed(0) > 2) return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={textAnchor}
      dominantBaseline="central"
    >
      {`${name}: ${(percent * 100).toFixed(0)}%`}
    </text>
  )
  else return null;


};

const PieChartComponent = ({ data }) => {
  const sortedData = data.sort((a, b) => b.percentage - a.percentage);

  const colorScale = [
    '#24A638',
    '#32B94A',
    '#43C455',
    '#59CF6B',
    '#7EDC91',
    '#A2E9B7',
    '#C6F6DD',
    '#EAF3F9',
    '#F2F9FC',
  ];

  return (
    <PieChart width={500} height={700}>
      <Legend content={renderCustomizedLegend} verticalAlign="top" />
      <Pie
        data={sortedData}
        dataKey="value"
        nameKey="category"
        cx="50%"
        cy="50%"
        innerRadius={35}
        outerRadius={80}
        label={renderCustomizedLabel}
        labelLine={false}
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
  );
};

export default PieChartComponent;
