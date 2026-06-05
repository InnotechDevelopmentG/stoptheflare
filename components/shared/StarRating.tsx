import { useId } from 'react';

interface StarRatingProps {
  rating: number;
  showValue?: boolean;
  size?: 'sm' | 'md';
}

export default function StarRating({ rating, showValue = true, size = 'md' }: StarRatingProps) {
  const px = size === 'sm' ? 14 : 18;
  const baseId = useId();
  return (
    <div className="flex items-center gap-1.5" aria-label={`${rating} out of 5 stars`}>
      <span className="flex items-center gap-0.5">
        {[0, 1, 2, 3, 4].map((i) => {
          const fill = Math.max(0, Math.min(1, rating - i));
          const id = `${baseId}-${i}`;
          return (
            <svg key={i} width={px} height={px} viewBox="0 0 20 20" aria-hidden="true">
              <defs>
                <linearGradient id={id}>
                  <stop offset={`${fill * 100}%`} stopColor="#E8A838" />
                  <stop offset={`${fill * 100}%`} stopColor="#E5DDD3" />
                </linearGradient>
              </defs>
              <path
                d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.77l-5.2 2.73.99-5.79L1.58 7.62l5.82-.85L10 1.5z"
                fill={`url(#${id})`}
              />
            </svg>
          );
        })}
      </span>
      {showValue && (
        <span className="font-mono text-small text-text-secondary">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
