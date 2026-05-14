'use client';

import React, { useState } from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieProps,
} from 'recharts';
import { ChartConfig } from '@/types/chart.types';
import { CHART_TOOLTIP_STYLE, formatTooltipValue } from '@/lib/chartHelpers';

interface PieChartProps {
  config: ChartConfig;
  height?: number;
  donut?: boolean;
}

const RADIAN = Math.PI / 180;

// Corrected Label Component with explicit types to satisfy the 'label' prop
const CustomLabel = (props: any) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  } = props;

  if (percent < 0.05) return null;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="var(--color-text-primary)"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={11}
      style={{ 
        fontFamily: 'var(--font-dm-mono)', 
        fontWeight: 500,
        pointerEvents: 'none' 
      }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: any[];
}) => {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  
  return (
    <div style={{
      ...CHART_TOOLTIP_STYLE,
      backgroundColor: 'var(--color-bg-surface)',
      border: '1px solid var(--color-brand-deep)',
      borderRadius: '4px',
      padding: '12px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: item.payload.fill || item.color,
          }}
        />
        <span style={{ 
          color: 'var(--color-text-secondary)', 
          fontSize: '11px',
          fontFamily: 'var(--font-body)' 
        }}>
          {String(item.name).replace(/_/g, ' ')}
        </span>
      </div>
      <p
        style={{
          color: 'var(--color-text-primary)',
          fontSize: '14px',
          fontWeight: 600,
          marginTop: '4px',
          fontFamily: 'var(--font-dm-mono)',
        }}
      >
        {formatTooltipValue(item.value, String(item.name))}
      </p>
    </div>
  );
};

export const PieChart: React.FC<PieChartProps> = ({
  config,
  height = 320,
  donut = true,
}) => {
  const { data, xKey, yKeys, colors } = config;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const valueKey = yKeys[0] || 'value';

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={donut ? '55%' : 0} // Increased for a more modern "Lendable" look
          outerRadius="85%"
          dataKey={valueKey}
          nameKey={xKey}
          labelLine={false}
          label={CustomLabel}
          animationBegin={0}
          animationDuration={800}
          onMouseEnter={(_, index) => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
          stroke="none" // Remove default stroke for cleaner look
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length] || 'var(--color-chart-1)'}
              style={{
                filter: activeIndex === index ? 'brightness(1.1)' : 'none',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              opacity={activeIndex === null || activeIndex === index ? 1 : 0.4}
              stroke="var(--color-bg-surface)"
              strokeWidth={3}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{
            paddingTop: '20px',
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '11px',
          }}
          formatter={(value: string) => (
            <span style={{ color: 'var(--color-text-secondary)' }}>
              {value.replace(/_/g, ' ')}
            </span>
          )}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};