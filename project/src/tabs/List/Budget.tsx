import React, { useState } from 'react';
import { Eye, Trash2, Plus, X, DollarSign, ShoppingCart, TrendingUp, Database, Edit } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import TextInput from '../../components/TextInput';

interface BudgetCategory {
  id: string;
  category: string;
  budget: number;
  spent: number;
}

interface CategoryItem {
  name: string;
  amount: number;
}

const Budget: React.FC = () => {
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>([
    { id: '1', category: 'Design', budget: 11500, spent: 6000 },
    { id: '2', category: 'SaaS Services', budget: 5000, spent: 4000 },
    { id: '3', category: 'Development', budget: 11250, spent: 12000 },
    { id: '4', category: 'Marketing', budget: 8000, spent: 5000 },
    { id: '5', category: 'Entertainment', budget: 3000, spent: 2000 },
    { id: '6', category: 'SEO', budget: 4000, spent: 3000 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedCategory, setSelectedCategory] = useState<BudgetCategory | null>(null);
  const [totalBudget, setTotalBudget] = useState('');
  const [categoryItems, setCategoryItems] = useState<CategoryItem[]>([{ name: '', amount: 0 }]);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Calculate totals
  const totalBudgetAmount = budgetCategories.reduce((sum, cat) => sum + cat.budget, 0);
  const totalSpentAmount = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const remainingAmount = totalBudgetAmount - totalSpentAmount;
  const overSpentAmount = remainingAmount < 0 ? Math.abs(remainingAmount) : 0;

  // Radar chart data
  const radarData = budgetCategories.map(cat => ({
    category: cat.category,
    spent: cat.spent,
    budget: cat.budget,
  }));

  const handleAddCategory = () => {
    setModalMode('add');
    setSelectedCategory(null);
    setTotalBudget('');
    setCategoryItems([{ name: '', amount: 0 }]);
    setErrors({});
    setShowModal(true);
  };

  const handleViewCategory = (category: BudgetCategory) => {
    setModalMode('view');
    setSelectedCategory(category);
    setTotalBudget(category.budget.toString());
    setCategoryItems([{ name: category.category, amount: category.budget }]);
    setShowModal(true);
  };

  const handleEditCategory = (category: BudgetCategory) => {
    setModalMode('edit');
    setSelectedCategory(category);
    setTotalBudget(category.budget.toString());
    setCategoryItems([{ name: category.category, amount: category.budget }]);
    setErrors({});
    setShowModal(true);
  };

  const handleDeleteCategory = (id: string) => {
    setBudgetCategories(prev => prev.filter(cat => cat.id !== id));
  };

  const addCategoryItem = () => {
    setCategoryItems(prev => [...prev, { name: '', amount: 0 }]);
  };

  const removeCategoryItem = (index: number) => {
    setCategoryItems(prev => prev.filter((_, i) => i !== index));
  };

  const updateCategoryItem = (index: number, field: 'name' | 'amount', value: string | number) => {
    setCategoryItems(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!totalBudget || parseFloat(totalBudget) <= 0) {
      newErrors.totalBudget = 'Total budget is required and must be greater than 0';
    }

    categoryItems.forEach((item, index) => {
      if (!item.name.trim()) {
        newErrors[`categoryName${index}`] = 'Category name is required';
      }
      if (item.amount <= 0) {
        newErrors[`categoryAmount${index}`] = 'Amount must be greater than 0';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const newCategory: BudgetCategory = {
      id: modalMode === 'edit' && selectedCategory ? selectedCategory.id : Date.now().toString(),
      category: categoryItems[0].name,
      budget: categoryItems[0].amount,
      spent: modalMode === 'edit' && selectedCategory ? selectedCategory.spent : 0,
    };

    if (modalMode === 'edit' && selectedCategory) {
      setBudgetCategories(prev => prev.map(cat => 
        cat.id === selectedCategory.id ? newCategory : cat
      ));
    } else {
      setBudgetCategories(prev => [...prev, newCategory]);
    }

    setShowModal(false);
  };

  const getPercentage = (spent: number, budget: number) => {
    return budget > 0 ? ((spent / budget) * 100).toFixed(1) : '0.0';
  };

  return (
    <div className="">
      {/* Budget Overview Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Budget</h2>
        <p className="text-gray-600 mb-4">₹ {totalBudgetAmount.toLocaleString()} (Total)</p>
        
        {/* Budget Progress Bar */}
        <div className="w-full h-3 bg-gray-200 rounded-full mb-6 overflow-hidden">
          <div className="h-full flex">
            <div className="bg-yellow-400" style={{ width: '20%' }}></div>
            <div className="bg-gray-400" style={{ width: '15%' }}></div>
            <div className="bg-red-500" style={{ width: '30%' }}></div>
            <div className="bg-purple-500" style={{ width: '20%' }}></div>
            <div className="bg-green-500" style={{ width: '10%' }}></div>
            <div className="bg-blue-900" style={{ width: '5%' }}></div>
          </div>
        </div>

        {/* Budget Items */}
        <div className="grid grid-cols-4 gap-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">₹ {totalBudgetAmount.toLocaleString()}</p>
              <p className="text-gray-600">Total Budget</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          
          <div className="flex items-center justify-between border-l pl-6">
            <div>
              <p className="text-2xl font-bold">₹ {totalSpentAmount.toLocaleString()}</p>
              <p className="text-gray-600">Total Spent</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 text-orange-600" />
            </div>
          </div>
          
          <div className="flex items-center justify-between border-l pl-6">
            <div>
              <p className="text-2xl font-bold">₹ {Math.max(0, remainingAmount).toLocaleString()}</p>
              <p className="text-gray-600">Remaining</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
          </div>
          
          <div className="flex items-center justify-between border-l pl-6">
            <div>
              <p className="text-2xl font-bold">₹ {overSpentAmount.toLocaleString()}</p>
              <p className="text-gray-600">Over Spent</p>
            </div>
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
              <Database className="h-5 w-5 text-pink-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Expenses and Budget Category Cards */}
      <div className="grid grid-cols-5 gap-6 mb-6">
        {/* Expenses Card - 40% */}
        <div className="col-span-2 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Expenses</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="category" />
                <PolarRadiusAxis angle={90} domain={[0, 'dataMax']} />
                <Radar
                  name="Spent"
                  dataKey="spent"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.3}
                />
                <Radar
                  name="Budget"
                  dataKey="budget"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.1}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Budget Category Card - 60% */}
        <div className="col-span-3 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Budget Category</h3>
            <button
              onClick={handleAddCategory}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-3 rounded-l-md text-[#5e5e5e]">Action</th>
                  <th className="text-left p-3 text-[#5e5e5e]">Category</th>
                  <th className="text-left p-3 text-[#5e5e5e]">Budget</th>
                  <th className="text-left p-3 text-[#5e5e5e]">Spent</th>
                  <th className="text-left p-3 rounded-r-md text-[#5e5e5e]">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {budgetCategories.map((category) => (
                  <tr key={category.id} className="border-b border-gray-200 text-gray-600">
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <Eye 
                          className="w-4 h-4 text-blue-500 cursor-pointer hover:text-blue-700" 
                          onClick={() => handleViewCategory(category)}
                        />
                        <Edit 
                          className="w-4 h-4 text-green-500 cursor-pointer hover:text-green-700" 
                          onClick={() => handleEditCategory(category)}
                        />
                        <Trash2 
                          className="w-4 h-4 text-red-500 cursor-pointer hover:text-red-700" 
                          onClick={() => handleDeleteCategory(category.id)}
                        />
                      </div>
                    </td>
                    <td className="p-3">{category.category}</td>
                    <td className="p-3">₹ {category.budget.toLocaleString()}</td>
                    <td className="p-3">₹ {category.spent.toLocaleString()}</td>
                    <td className="p-3">{getPercentage(category.spent, category.budget)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Budget Details Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Budget Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3 rounded-l-md text-[#5e5e5e]">Category Type</th>
                <th className="text-left p-3 text-[#5e5e5e]">Total Budget</th>
                <th className="text-left p-3 text-[#5e5e5e]">Total Spent</th>
                <th className="text-left p-3 text-[#5e5e5e]">Expenses (%)</th>
                <th className="text-left p-3 text-[#5e5e5e]">Remaining</th>
                <th className="text-left p-3 text-[#5e5e5e] rounded-r-md">Over Spent</th>
              </tr>
            </thead>
            <tbody>
              {budgetCategories.map((category) => {
                const remaining = category.budget - category.spent;
                const overSpent = remaining < 0 ? Math.abs(remaining) : 0;
                
                return (
                  <tr key={category.id} className="border-b border-gray-200 text-gray-600">
                    <td className="p-3">{category.category}</td>
                    <td className="p-3">₹ {category.budget.toLocaleString()}</td>
                    <td className="p-3">₹ {category.spent.toLocaleString()}</td>
                    <td className="p-3">{getPercentage(category.spent, category.budget)}%</td>
                    <td className="p-3">₹ {Math.max(0, remaining).toLocaleString()}</td>
                    <td className="p-3">{overSpent > 0 ? `₹ ${overSpent.toLocaleString()}` : '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {modalMode === 'add' ? 'Add Budget' : modalMode === 'edit' ? 'Edit Budget' : 'View Budget'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <TextInput
                  label="Total Budget"
                  name="totalBudget"
                  value={totalBudget}
                  onChange={(e) => setTotalBudget(e.target.value)}
                  type="number"
                  required
                  disabled={modalMode === 'view'}
                />
                {errors.totalBudget && (
                  <p className="text-red-500 text-sm mt-1">{errors.totalBudget}</p>
                )}
              </div>

              {categoryItems.map((item, index) => (
                <div key={index} className="space-y-4 p-4 border border-gray-300 rounded-md">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <TextInput
                        label="Category Name"
                        name={`categoryName${index}`}
                        value={item.name}
                        onChange={(e) => updateCategoryItem(index, 'name', e.target.value)}
                        required
                        disabled={modalMode === 'view'}
                      />
                      {errors[`categoryName${index}`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`categoryName${index}`]}</p>
                      )}
                    </div>
                    <div>
                      <TextInput
                        label="Amount"
                        name={`categoryAmount${index}`}
                        value={item.amount.toString()}
                        onChange={(e) => updateCategoryItem(index, 'amount', parseFloat(e.target.value) || 0)}
                        type="number"
                        required
                        disabled={modalMode === 'view'}
                      />
                      {errors[`categoryAmount${index}`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`categoryAmount${index}`]}</p>
                      )}
                    </div>
                  </div>
                  
                  {modalMode !== 'view' && categoryItems.length > 1 && (
                    <div className="flex justify-end">
                      <button
                        onClick={() => removeCategoryItem(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {modalMode !== 'view' && (
                <button
                  onClick={addCategoryItem}
                  className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Category
                </button>
              )}
            </div>

            {modalMode !== 'view' && (
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  {modalMode === 'add' ? 'Add' : 'Update'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Budget;