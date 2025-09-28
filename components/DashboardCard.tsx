import React from "react";

type DashboardCardProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

export const DashboardCard = ({ 
  title, 
  children, 
  className = "", 
  hover = true 
}: DashboardCardProps) => {
  return (
    <div 
      className={`
        relative
        rounded-xl 
        bg-[var(--theme-bg-card)]
        border border-[var(--theme-border-primary)]
        text-[var(--theme-text-primary)]
        p-6 
        shadow-[var(--theme-shadow-card)]
        transition-all duration-200 ease-in-out
        ${hover ? 'hover:shadow-[var(--theme-shadow-hover)] hover:border-[var(--theme-border-accent)]' : ''}
        ${className}
      `}
    >
      {title && (
        <div className="mb-6 pb-4 border-b border-[var(--theme-border-primary)]">
          <h2 className="text-lg font-semibold text-[var(--theme-text-primary)] tracking-wide">
            {title}
          </h2>
        </div>
      )}
      <div className="relative">
        {children}
      </div>
    </div>
  );
};