import React, { useState } from 'react';
import Category from './Category';
import SubCategory from './Subcategory';
import Status from './Status'; // If you have this component
import Schedule from '../Schedule'; // Adjust path if needed

const Setup = () => {
  const [activeTab, setActiveTab] = useState<'Category' | 'Sub Category' | 'Status'>('Category');
  const [categories, setCategories] = useState<string[]>([]);
  const [subCategories, setSubCategories] = useState<string[]>([]);

  return (
    <div className="p-4">
      <div className="flex border-b border-gray-300 mb-4 space-x-4">
        {['Category', 'Sub Category', 'Status'].map((tab) => (
          <button
            key={tab}
            className={`pb-2 border-b-2 text-sm font-medium ${
              activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-blue-600'
            }`}
            onClick={() => setActiveTab(tab as typeof activeTab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {activeTab === 'Category' && (
          <Category categories={categories} setCategories={setCategories} />
        )}
        {activeTab === 'Sub Category' && (
          <SubCategory
            categories={categories}
            subCategories={subCategories}
            setSubCategories={setSubCategories}
          />
        )}
        {activeTab === 'Status' && <Status />}
      </div>
    </div>
  );
};

export default Setup;
