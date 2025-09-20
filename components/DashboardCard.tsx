import React from "react";

type DashboardCardProps = {
  title?: string;
  children: React.ReactNode;
  bgColor?: string;
};

export const DashboardCard = ({ title, children, bgColor= 'bg-white' }: DashboardCardProps) => {
  return (
    <div className={`rounded-xl ${bgColor} text-white p-6 shadow-md`}>
      {title && (
        <h2 className="mb-4 text-lg text-center font-semibold tracking-wide text-blue-200">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}