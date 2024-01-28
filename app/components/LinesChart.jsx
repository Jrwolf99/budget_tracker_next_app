import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
  ReferenceLine,
} from 'recharts';
import useResize from '../utility/useResize';

const renderCustomizedDot = (props) => {
  const formatDollar = (dollarAmount) => {
    let dollar = dollarAmount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return dollar;
  };

  const { cx, cy, value } = props;
  return (
    <text
      x={cx}
      y={cy - 10}
      fill="black"
      fontSize="12px"
      fontWeight="bold"
      textAnchor="middle"
    >
      {formatDollar(value)}
    </text>
  );
};

const renderOriginLabel = (props) => {
  const { viewBox } = props;
  return (
    <text
      x={viewBox.x}
      y={viewBox.y}
      fill="red"
      fontSize="14px"
      fontWeight="bold"
    >
      Origin
    </text>
  );
};

const CustomTooltip = ({ active, payload, label, labelOne, labelTwo }) => {
  const formatDollar = (dollarAmount) => {
    let dollar = dollarAmount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return dollar;
  };

  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: '#fff',
          padding: '10px',
          border: '1px solid #ccc',
        }}
      >
        <p className="label">{`Name: ${label}`}</p>
        <p style={{ color: payload[0].color }}>{`${labelOne}: ${formatDollar(
          payload[0].value
        )}`}</p>
        {payload[1] && (
          <p style={{ color: payload[1].color }}>{`${labelTwo}: ${formatDollar(
            payload[1].value
          )}`}</p>
        )}
      </div>
    );
  }

  return null;
};

const LinesChart = ({ graph_data, labelOne = null, labelTwo = null }) => {
  const { isExtraSmallScreenAndUnder } = useResize();

  return (
    <ResponsiveContainer
      width="99%"
      height={isExtraSmallScreenAndUnder ? 150 : 300}
    >
      <LineChart
        data={graph_data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip
          content={<CustomTooltip labelOne={labelOne} labelTwo={labelTwo} />}
        />
        <ReferenceLine x={0} stroke="black" strokeDasharray="5 5" />
        <ReferenceLine y={0} stroke="black" strokeDasharray="5 5" />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#4DBD3D"
          dot={{ stroke: '#4DBD3D', strokeWidth: 2, fill: '#4DBD3D' }}
          activeDot={{ r: 8 }}
          label={renderCustomizedDot}
        />
        {graph_data[0].secondValue && (
          <Line
            type="monotone"
            dataKey="secondValue"
            stroke="#8884d8" // Different color for the second line
            dot={{ stroke: '#8884d8', strokeWidth: 2, fill: '#8884d8' }}
            activeDot={{ r: 8 }}
            // You can use the same or a different custom dot renderer
            label={renderCustomizedDot}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LinesChart;
