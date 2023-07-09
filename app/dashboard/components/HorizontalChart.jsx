import useFormat from '@/app/utility_hooks/useFormat';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from 'recharts';

const HorizontalChart = ({ width, height, graph_data }) => {
  const { formatDollar } = useFormat();

  return (
    <BarChart width={width} height={height} data={graph_data} layout="vertical">
      <CartesianGrid strokeDasharray="5 0" />
      <XAxis type="number" />
      <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} />
      <Tooltip />
      <Bar dataKey="value" fill="#4DBD3D">
        <LabelList
          dataKey={formatDollar('value')}
          style={{
            fill: '#ffffff',
            fontSize: 12,
            fontWeight: 'bold',
          }}
        />
      </Bar>
    </BarChart>
  );
};

export default HorizontalChart;
