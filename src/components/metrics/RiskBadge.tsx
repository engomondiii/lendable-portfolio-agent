'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { getStatusBadgeVariant } from '@/lib/riskColors';
import { RISK_STATUS_CONFIG } from '@/lib/constants';
import { Tooltip } from '@/components/ui/Tooltip';

interface RiskBadgeProps {
  status: string;
  showTooltip?: boolean;
  size?: 'xs' | 'sm' | 'md';
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  status,
  showTooltip = true,
  size = 'sm',
}) => {
  const config = RISK_STATUS_CONFIG[status as keyof typeof RISK_STATUS_CONFIG];
  const variant = getStatusBadgeVariant(status);

  const badge = (
    <Badge variant={variant} size={size} dot>
      {status}
    </Badge>
  );

  if (showTooltip && config?.description) {
    return (
      <Tooltip content={config.description} position="top">
        {badge}
      </Tooltip>
    );
  }

  return badge;
};