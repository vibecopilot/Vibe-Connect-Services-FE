import React from "react";
import  TextInput  from "../components/TextInput";

interface BudgetTypesFormProps {
  formData: {
    budgetType: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  errors: {
    budgetType?: string;
  };
  isEditing: boolean;
}

const BudgetTypesForm: React.FC<BudgetTypesFormProps> = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  errors,
  isEditing,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-4 rounded-md shadow-md border border-gray-200"
    >
      <h2 className="text-lg font-semibold mb-4">
        {isEditing ? "Edit Budget Type" : "Add Budget Type"}
      </h2>

        <TextInput
          label="Budget Type"
          name="budgetType"
          required
          value={formData.budgetType}
          onChange={onChange}
          minimum_length={3}
          maximum_length={100}
          error={errors.budgetType}
        />

      <div className="flex justify-end space-x-2 mt-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          {isEditing ? "Update" : "Submit"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BudgetTypesForm;
