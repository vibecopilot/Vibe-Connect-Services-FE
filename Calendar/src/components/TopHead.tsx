import React from "react";

interface Column {
  label: string;
  align?: "left" | "center" | "right";
}

interface TableHeadProps {
  columns: Column[];
}

const TableHead = ({ columns }: TableHeadProps) => (
  <div className="grid grid-cols-[10%_35%_35%_20%] items-center border-b px-3 py-2 text-sm font-semibold bg-gray-100">
    {columns.map((col: Column, idx: number) => (
      <div key={idx} className="text-center">{col.label}</div>
        ))}
  </div>
  );

export default TableHead;
