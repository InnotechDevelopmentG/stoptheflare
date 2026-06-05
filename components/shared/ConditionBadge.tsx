import type { BadgeColor } from '@/lib/types';
import clsx from 'clsx';

const colorMap: Record<BadgeColor, string> = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/15 text-secondary',
  flare: 'bg-flare/10 text-flare',
  warning: 'bg-warning/15 text-[#9a6c12]',
};

export default function ConditionBadge({
  label,
  color = 'primary',
}: {
  label: string;
  color?: BadgeColor;
}) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-pill px-3 py-1 text-caption font-medium',
        colorMap[color],
      )}
    >
      {label}
    </span>
  );
}
