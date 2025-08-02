import React, { type ReactNode } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string | ReactNode;
  current?: string;
  onClick?: (item: BreadcrumbItem) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = <ChevronRight className="w-4 h-4 mx-1" />,
  current,
  onClick,
  onPrevious,
  onNext,
  className = "text-sm text-gray-500",
}) => {
  return (
    <nav className={`flex items-center ${className}`} aria-label="Breadcrumb">
      {onPrevious && (
        <button
          onClick={onPrevious}
          className="mr-2 p-1 hover:text-black"
          aria-label="Previous"
          type="button"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isCurrent = current ? item.label === current : isLast;

        return (
          <span key={index} className="flex items-center">
            {index !== 0 && <span className="mx-1">{separator}</span>}
            {isCurrent ? (
              <span className="font-medium text-gray-900">{item.label}</span>
            ) : (
              <button
                onClick={() => onClick?.(item)}
                className="hover:underline focus:outline-none"
              >
                {item.label}
              </button>
            )}
          </span>
        );
      })}

      {onNext && (
        <button
          onClick={onNext}
          className="ml-2 p-1 hover:text-black"
          aria-label="Next"
          type="button"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </nav>
  );
};

export default Breadcrumb;