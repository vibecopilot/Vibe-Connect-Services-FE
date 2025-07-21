import React from "react";

interface Column {
  label: string;
  align?: "left" | "center" | "right";
}

interface TableHeadProps {
  columns: Column[];
}

const TableHead: React.FC<TableHeadProps> = ({ columns }) => {
  const getTextAlignClass = (align?: "left" | "center" | "right") => {
    switch (align) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  };

  return (
    <thead className="bg-gray-100">
      <tr>
        {columns.map((col, idx) => (
          <th
            key={idx}
            className={`p-3 text-xs font-semibold  ${getTextAlignClass(col.align)}`}
          >
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
