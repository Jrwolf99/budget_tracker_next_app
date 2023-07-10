import useFormat from '@/app/utility_hooks/useFormat';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from 'recharts';

const renderCustomizedLabel = (props) => {
  const formatDollar = (dollarAmount) => {
    let dollar = dollarAmount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return dollar;
  };

  const { x, y, width, height, value } = props;
  return (
    <text
      x={x + 5}
      y={y + height / 2}
      fill="white"
      textAnchor="start"
      dominantBaseline="middle"
    >
      {formatDollar(value)}
    </text>
  );
};

const HorizontalChart = ({ width, height, graph_data }) => {
  return (
    <BarChart width={width} height={height} data={graph_data} layout="vertical">
      <CartesianGrid strokeDasharray="5 0" />
      <XAxis type="number" />
      <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} />
      <Tooltip />
      <Bar dataKey="value" fill="#4DBD3D">
        <LabelList dataKey="value" content={renderCustomizedLabel} />
      </Bar>
    </BarChart>
  );
};

export default HorizontalChart;
