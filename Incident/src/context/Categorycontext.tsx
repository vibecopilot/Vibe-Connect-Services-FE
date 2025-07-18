import React, { createContext, useContext, useState,  type ReactNode } from "react";

type Category = { id: number; type: string };

type CategoryContextType = {
  categories: Category[];
  addCategory: (type: string) => boolean;
};

const initialCategories: Category[] = [
  { id: 1, type: "Electrical Issues" },
  { id: 2, type: "Fire" },
];

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const addCategory = (type: string) => {
    if (categories.some((cat) => cat.type.toLowerCase() === type.toLowerCase())) {
      return false;
    }
    setCategories((prev) => [...prev, { id: prev.length + 1, type }]);
    return true;
  };

  return (
    <CategoryContext.Provider value={{ categories, addCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  const ctx = useContext(CategoryContext);
  if (!ctx) throw new Error("useCategoryContext must be used within CategoryProvider");
  return ctx;
};
