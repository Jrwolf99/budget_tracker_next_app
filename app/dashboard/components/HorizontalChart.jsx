import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const HorizontalChart = ({ dataKey, width, height, graph_data }) => {
  return (
    <BarChart data={graph_data} width={width} height={height} layout="vertical">
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" />
      <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} />
      <Tooltip />
      <Legend
        formatter={(value) => (
          <span className="text-green-700">{value}</span> // Apply Tailwind CSS color class
        )}
      />{' '}
      <Bar dataKey={dataKey} fill="#56d64f" />
    </BarChart>
  );
};

export default HorizontalChart;
