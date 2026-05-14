'use client';

import React from 'react';
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartConfig } from '@/types/chart.types';
import { formatAxisTick, formatTooltipValue, CHART_TOOLTIP_STYLE } from '@/lib/chartHelpers';

interface AreaChartProps {
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
          style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
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

export const AreaChart: React.FC<AreaChartProps> = ({
  config,
  height = 320,
  stacked = false,
}) => {
  const { data, xKey, yKeys, colors } = config;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsAreaChart
        data={data}
        margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
      >
        <defs>
          {yKeys.map((key, i) => (
            <linearGradient key={key} id={`areaGrad-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={colors[i] || 'var(--color-chart-1)'}
                stopOpacity={0.2}
              />
              <stop
                offset="95%"
                stopColor={colors[i] || 'var(--color-chart-1)'}
                stopOpacity={0.02}
              />
            </linearGradient>
          ))}
        </defs>
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
          <Area
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colors[i] || 'var(--color-chart-1)'}
            strokeWidth={2}
            fill={`url(#areaGrad-${i})`}
            stackId={stacked ? 'stack' : undefined}
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
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
};