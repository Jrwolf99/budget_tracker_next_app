import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const HorizontalChart = ({ width, height, graph_data }) => {
  return (
    <BarChart width={width} height={height} data={graph_data} layout="vertical">
      <CartesianGrid strokeDasharray="5 0" />
      <XAxis type="number" />
      <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} />
      <Tooltip />
      <Bar dataKey="value" fill="#4DBD3D" />
    </BarChart>
  );
};

export default HorizontalChart;
