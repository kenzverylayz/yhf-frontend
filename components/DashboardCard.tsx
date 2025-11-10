import React from "react";

type DashboardCardProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  headerActions?: React.ReactNode;
  fullHeight?: boolean;
};

export const DashboardCard = ({ 
  title, 
  children, 
  className = "", 
  hover = true,
  headerActions,
  fullHeight = false
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
        ${fullHeight ? 'h-full flex flex-col' : ''}
        ${className}
      `}
    >
      {title && (
        <div className={`pb-4 border-b border-[var(--theme-border-primary)] ${fullHeight ? 'mb-6 flex-shrink-0' : 'mb-6'}`}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[var(--theme-text-primary)] tracking-wide">
              {title}
            </h2>
            {headerActions && (
              <div className="flex items-center">
                {headerActions}
              </div>
            )}
          </div>
        </div>
      )}
      <div className={`relative ${fullHeight ? 'flex-1 flex flex-col min-h-0' : ''}`}>
        {children}
      </div>
    </div>
  );
};