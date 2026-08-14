interface ProgressBarProps {
  percent: number;
}

export default function ProgressBar({ percent }: ProgressBarProps) {
  const safePercent = Math.min(Math.max(percent, 0), 100);
  const isDanger = safePercent > 90;
  
  return (
    <div className="w-[100px] h-1.5 bg-[#F4F4F5] rounded-full overflow-hidden shrink-0 mt-1.5">
      <div 
        className="h-full rounded-full transition-all duration-300"
        style={{
          width: `${safePercent}%`,
          backgroundColor: isDanger ? 'var(--color-danger)' : 'var(--color-primary)'
        }}
      />
    </div>
  );
}
