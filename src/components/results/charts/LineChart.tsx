'use client';

import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartConfig } from '@/types/chart.types';
import { formatAxisTick, formatTooltipValue, CHART_TOOLTIP_STYLE } from '@/lib/chartHelpers';

interface LineChartProps {
  config: ChartConfig;
  height?: number;
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: unknown; color: string }[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={CHART_TOOLTIP_STYLE}>
      <p
        style={{
          color: 'var(--color-text-muted)',
          fontSize: '10px',
          marginBottom: '6px',
          fontFamily: 'var(--font-dm-mono)',
        }}
      >
        {formatAxisTick(label)}
      </p>
      {payload.map((entry) => (
        <div
          key={entry.name}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '2px',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: entry.color,
              flexShrink: 0,
            }}
          />
          <span style={{ color: 'var(--color-text-secondary)', fontSize: '11px' }}>
            {entry.name.replace(/_/g, ' ')}:
          </span>
          <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>
            {formatTooltipValue(entry.value, entry.name)}
          </span>
        </div>
      ))}
    </div>
  );
};

export const LineChart: React.FC<LineChartProps> = ({ config, height = 320 }) => {
  const { data, xKey, yKeys, colors } = config;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart
        data={data}
        margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="var(--color-border-subtle)"
          vertical={false}
        />
        <XAxis
          dataKey={xKey}
          tickFormatter={formatAxisTick}
          tick={{
            fontSize: 10,
            fill: 'var(--color-text-muted)',
            fontFamily: 'var(--font-dm-mono)',
          }}
          axisLine={{ stroke: 'var(--color-border)' }}
          tickLine={false}
          dy={6}
        />
        <YAxis
          tickFormatter={formatAxisTick}
          tick={{
            fontSize: 10,
            fill: 'var(--color-text-muted)',
            fontFamily: 'var(--font-dm-mono)',
          }}
          axisLine={false}
          tickLine={false}
          dx={-4}
          width={44}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{
            fontSize: '10px',
            fontFamily: 'var(--font-dm-mono)',
            color: 'var(--color-text-secondary)',
            paddingTop: '12px',
          }}
          formatter={(value: string) => value.replace(/_/g, ' ')}
        />
        {yKeys.map((key, i) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colors[i] || 'var(--color-chart-1)'}
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 4,
              fill: colors[i],
              stroke: 'var(--color-bg-surface)',
              strokeWidth: 2,
            }}
            animationDuration={800}
            animationEasing="ease-out"
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};