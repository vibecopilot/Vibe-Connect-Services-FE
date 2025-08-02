import React from "react";

interface Column {
  label: string;
  align?: "left" | "center" | "right";
}

interface TableHeadProps {
  columns: Column[];
}

const TableHead: React.FC<TableHeadProps> = ({ columns }) => {
  return (
    <thead>
      <tr className="font-PTSans bg-gray-100 text-[#5e5e5e] border border-gray-400 rounded-lg">
        {columns.map((col, idx) => (
          <th
            key={idx}
            className={`p-3 text-${col.align ?? "left"} font-normal`}
          >
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;