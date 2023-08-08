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
      fill="black"
      fontSize="12px"
      fontWeight="bold"
      textAnchor="start"
      dominantBaseline="central"
    >
      {formatDollar(value)}
    </text>
  );
};

const HorizontalChart = ({ width, height, graph_data }) => {
  return (
    <BarChart width={width} height={height} data={graph_data} layout="vertical">
      <XAxis type="number" domain={[0, 'dataMax+100']} hide />
      <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} />
      <Tooltip />
      <Bar dataKey="value" fill="#4DBD3D">
        <LabelList dataKey="value" content={renderCustomizedLabel} />
      </Bar>
    </BarChart>
  );
};

export default HorizontalChart;
