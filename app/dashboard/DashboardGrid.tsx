"use client";

import { useCallback, useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CLV from "./widgets/CLV";
import RevenueByMonth from "./widgets/RevenueByMonth";
import PieBreakdown from "./widgets/PieBreakdown";
import AverageOrderSize from "./widgets/AverageOrderSizeHistogram";
import CustomerChurnValuePredictionTable from "./widgets/CustomerChurnValuePredictionTable";
import CLVPieChart from "./widgets/PieCLVSegment";
import type { Customer } from "@/types/customer";
import type { ClVSegment } from "@/types/segment";

type WidgetType = 
  | "clv" 
  | "pieBreakdown" 
  | "averageOrderSize" 
  | "revenueByMonth" 
  | "clvPieChart" 
  | "customerChurn";

type WidgetItem = {
  id: WidgetType;
  colSpan?: string;
};

type DashboardGridProps = {
  topCustomers: Customer[];
  clvSegments: ClVSegment[];
};

const WIDGET_CONFIG: Record<WidgetType, { defaultColSpan: string; component: React.ComponentType<any> }> = {
  clv: { 
    defaultColSpan: "md:col-span-2", 
    component: CLV 
  },
  pieBreakdown: { 
    defaultColSpan: "", 
    component: PieBreakdown 
  },
  averageOrderSize: { 
    defaultColSpan: "", 
    component: AverageOrderSize 
  },
  revenueByMonth: { 
    defaultColSpan: "", 
    component: RevenueByMonth 
  },
  clvPieChart: { 
    defaultColSpan: "", 
    component: CLVPieChart 
  },
  customerChurn: { 
    defaultColSpan: "col-span-full", 
    component: CustomerChurnValuePredictionTable 
  },
};

const DraggableWidget = ({ 
  id, 
  index, 
  colSpan, 
  moveWidget,
  children 
}: { 
  id: WidgetType; 
  index: number; 
  colSpan?: string; 
  moveWidget: (dragIndex: number, hoverIndex: number) => void;
  children: React.ReactNode;
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "widget",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "widget",
    hover: (draggedItem: { id: WidgetType; index: number }) => {
      if (draggedItem.index !== index) {
        moveWidget(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`
        ${colSpan || ""} 
        cursor-move
        ${isDragging ? "opacity-50" : "opacity-100"}
        transition-opacity duration-200
      `}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      <div className="relative group">
        <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-gray-700/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded shadow-lg flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
            </svg>
            Drag
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default function DashboardGrid({ topCustomers, clvSegments }: DashboardGridProps) {
  const [widgets, setWidgets] = useState<WidgetItem[]>(() => {
    // Initialize with default order
    const defaultOrder: WidgetItem[] = [
      { id: "clv", colSpan: "md:col-span-2" },
      { id: "pieBreakdown", colSpan: "" },
      { id: "averageOrderSize", colSpan: "" },
      { id: "revenueByMonth", colSpan: "" },
      { id: "clvPieChart", colSpan: "" },
      { id: "customerChurn", colSpan: "col-span-full" },
    ];
    
    // Try to load from localStorage
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("dashboard-widget-order");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Validate that all widgets are present
          const defaultIds = defaultOrder.map(w => w.id);
          const parsedIds = parsed.map((w: WidgetItem) => w.id);
          if (defaultIds.every(id => parsedIds.includes(id)) && 
              parsedIds.every((id: string) => defaultIds.includes(id))) {
            return parsed;
          }
        } catch (e) {
          // If parsing fails, use default
        }
      }
    }
    return defaultOrder;
  });

  // Save to localStorage whenever widgets change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("dashboard-widget-order", JSON.stringify(widgets));
    }
  }, [widgets]);

  const moveWidget = useCallback((dragIndex: number, hoverIndex: number) => {
    setWidgets((prev) => {
      const newWidgets = [...prev];
      const [removed] = newWidgets.splice(dragIndex, 1);
      newWidgets.splice(hoverIndex, 0, removed);
      return newWidgets;
    });
  }, []);

  const renderWidget = (widget: WidgetItem, index: number) => {
    const config = WIDGET_CONFIG[widget.id];
    const Component = config.component;

    // Preserve original colSpan if it exists, otherwise use default
    const colSpan = widget.colSpan ?? config.defaultColSpan;

    // Widgets that should have the same height (excluding customerChurn which is full width)
    const equalHeightWidgets: WidgetType[] = ["clv", "pieBreakdown", "averageOrderSize", "revenueByMonth", "clvPieChart"];
    const shouldHaveEqualHeight = equalHeightWidgets.includes(widget.id);

    let props: any = {};
    if (widget.id === "clv") {
      props.initialData = topCustomers;
    } else if (widget.id === "clvPieChart") {
      props.data = clvSegments;
    }

    return (
      <DraggableWidget
        key={widget.id}
        id={widget.id}
        index={index}
        colSpan={colSpan}
        moveWidget={moveWidget}
      >
        {shouldHaveEqualHeight ? (
          <div className="h-[500px] flex flex-col">
            <Component {...props} />
          </div>
        ) : (
          <Component {...props} />
        )}
      </DraggableWidget>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {widgets.map((widget, index) => renderWidget(widget, index))}
      </main>
    </DndProvider>
  );
}
