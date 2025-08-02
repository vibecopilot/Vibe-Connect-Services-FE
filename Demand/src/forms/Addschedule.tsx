import React, { useState } from 'react';
import Select from '../components/Select';
import DatePicker from '../components/DatePicker';
import Modal from '../components/Modal';

interface AddscheduleProps {
  onClose: () => void;
  onSubmit: (data: {
    privacy: string;
    category: string;
    subCategory: string;
    date: string;
    payment: string;
  }) => void;
}

const privacyOptions = ['Public', 'Private'];
const categoryOptions = ['Cleaning', 'Plumbing', 'Electrical'];
const subCategoryOptions = ['Kitchen', 'Bathroom', 'Living Room'];
const paymentOptions = ['Card', 'UPI', 'Cash'];

const Addschedule: React.FC<AddscheduleProps> = ({ onClose, onSubmit }) => {
  const [privacy, setPrivacy] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [date, setDate] = useState('');
  const [payment, setPayment] = useState('Card');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = () => {
    onSubmit({ privacy, category, subCategory, date, payment });
  };

  const handleAdd = () => {
    // This function would typically add the category to your data state
    // For now, we'll just close the modal
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white-200 w-full p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-center w-full">Create Schedule</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-black text-xl ml-2">&times;</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
        <div>
          <label className="block text-sm mb-1">Privacy:</label>
          <Select
            name="privacy"
            value={privacy}
            onChange={e => setPrivacy(e.target.value)}
            options={privacyOptions}
            placeholder="Select"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Select Category</label>
          <Select
            name="category"
            value={category}
            onChange={e => setCategory(e.target.value)}
            options={categoryOptions}
            placeholder="Select Category"
          />
        </div>
      </div>
      <div className="mb-2">
        <label className="block text-sm mb-1">Select Category</label>
        <Select
          name="subCategory"
          value={subCategory}
          onChange={e => setSubCategory(e.target.value)}
          options={subCategoryOptions}
          placeholder="Select Sub Category"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm mb-1">Schedule Visit</label>
        <DatePicker
          label=""
          name="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm mb-1">Select Payment Method</label>
        <Select
          name="payment"
          value={payment}
          onChange={e => setPayment(e.target.value)}
          options={paymentOptions}
          placeholder="Card"
        />
      </div>
      <p className="text-xs text-gray-600 mt-2 mb-6">
        Disclaimer: The Services include the provision of the Platform that enables you to arrange and schedule different home-based services with independent third-party service provider of those services ("Service Professionals").
      </p>
      <div className="flex justify-center">
        <button
          className="bg-[#7991BB] text-white px-10 py-2 rounded text-lg"
          onClick={handleSubmit}
        >
          Pay ₹
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-4 bg-gray-500">
          <h2 className="text-lg font-bold mb-2">Add Category</h2>
          <input
            type="text"
            placeholder="Enter Category"
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="border px-2 py-1 rounded w-full mb-2"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              handleAdd();
              setIsModalOpen(false);
            }}
          >
            Save
          </button>
          <button
            className="ml-2 px-4 py-2 rounded border"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Addschedule;
