import useFormat from '@/app/utility_hooks/useFormat';
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
    <div className="rounded-md shadow-lg mt-4 overflow-hidden text-sm">
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
        </tbody>
      </table>
    </div>
  );
};

const PieChartComponent = ({ data }) => {
  console.log(data);

  const sortedData = data.sort((a, b) => a.value - b.value);

  const colorScale = [
    '#A2E9B7',
    '#7EDC91',
    '#59CF6B',
    '#43C455',
    '#32B94A',
    '#24A638',
    '#1D8C2B',
    '#177324',
    '#0F5B1A',
    '#0A3F12',
  ];

  return (
    <PieChart width={500} height={610}>
      <Pie
        data={sortedData}
        dataKey="value"
        nameKey="category"
        cx="50%"
        cy="50%"
        innerRadius={35}
        outerRadius={80}
      >
        {sortedData.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={colorScale[index % colorScale.length]}
          />
        ))}
      </Pie>
      <Tooltip />
      <Legend content={renderCustomizedLegend} />
    </PieChart>
  );
};

export default PieChartComponent;
