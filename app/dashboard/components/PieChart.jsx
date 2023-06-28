import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const data = [
  { category: 'Category 1', value: 25 },
  { category: 'Category 2', value: 50 },
  { category: 'Category 3', value: 30 },
  // Add more categories as needed
];

const PieChartComponent = () => {
  const sortedData = data.sort((a, b) => a.amount - b.amount);

  const colorScale = [
    '#A2E9B7', // Lightest shade
    '#7EDC91',
    '#59CF6B',
    '#43C455',
    '#32B94A',
    '#24A638', // Darkest shade
  ];
  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="category"
        cx="50%"
        cy="50%"
        innerRadius={60} // Adjust the inner radius for the ring shape
        outerRadius={80} // Adjust the outer radius for the ring shape
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={colorScale[index % colorScale.length]}
          />
        ))}
      </Pie>
      <Tooltip />
      <Legend
        formatter={(value) => (
          <span className="text-green-700">{value}</span> // Apply Tailwind CSS color class
        )}
      />
    </PieChart>
  );
};

export default PieChartComponent;
