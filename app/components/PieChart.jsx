import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const renderCustomizedLegend = ({ payload }) => {
  const formatDollar = (dollarAmount) => {
    let dollar = dollarAmount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return dollar;
  };

  return (
    <div className="rounded-md shadow-lg mt-4 overflow-hidden text-sm bg-slate-200 border">
      <table className="divide-gray-200 table-auto min-w-full">
        <thead>
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
              <strong>{15}</strong>
            </td>
            <td className="px-1 py-2 whitespace-nowrap"></td>
          </tr>
          {payload.map((entry, index) => (
            <tr key={`item-${index}`} className="hover:bg-slate-200">
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

const PieChartComponent = ({ data }) => {
  console.log(data);
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
  ];

  return (
    <ResponsiveContainer height="100%" width={500}>
      <PieChart>
        <Pie
          data={sortedData}
          dataKey="value"
          nameKey="category_name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          label={renderCustomizedLabel}
          labelLine={false}
          className="text-xs"
        >
          {sortedData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colorScale[index % colorScale.length]}
            />
          ))}
        </Pie>
        <Legend content={renderCustomizedLegend} verticalAlign="bottom" />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
