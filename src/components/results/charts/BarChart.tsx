'use client';

import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { ChartConfig } from '@/types/chart.types';
import { formatAxisTick, formatTooltipValue, CHART_TOOLTIP_STYLE } from '@/lib/chartHelpers';

interface BarChartProps {
  config: ChartConfig;
  height?: number;
  stacked?: boolean;
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
              height: '3px',
              borderRadius: '2px',
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

export const BarChart: React.FC<BarChartProps> = ({
  config,
  height = 320,
  stacked = false,
}) => {
  const { data, xKey, yKeys, colors } = config;

  // Single series — use risk-aware colors per bar
  const isSingleSeries = yKeys.length === 1;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart
        data={data}
        margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
        barCategoryGap="28%"
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
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(46,204,113,0.04)' }} />
        {yKeys.length > 1 && (
          <Legend
            wrapperStyle={{
              fontSize: '10px',
              fontFamily: 'var(--font-dm-mono)',
              color: 'var(--color-text-secondary)',
              paddingTop: '12px',
            }}
            formatter={(value: string) => value.replace(/_/g, ' ')}
          />
        )}
        {yKeys.map((key, i) => (
          <Bar
            key={key}
            dataKey={key}
            fill={colors[i] || 'var(--color-chart-1)'}
            radius={[3, 3, 0, 0]}
            stackId={stacked ? 'stack' : undefined}
            animationDuration={600}
            animationEasing="ease-out"
          >
            {isSingleSeries &&
              data.map((_, idx) => (
                <Cell
                  key={idx}
                  fill={colors[idx % colors.length] || 'var(--color-chart-1)'}
                />
              ))}
          </Bar>
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};