import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import TextInput from '../components/TextInput';
import Select from '../components/Select';

interface StatusRow {
  order: number;
  status: string;
  fixedStatus: string;
  colour: string;
}

interface AddStatusProps {
  rowData: StatusRow;
  onDelete: () => void;
  onUpdate: (field: keyof StatusRow, value: string | number) => void;
}

const AddStatus: React.FC<AddStatusProps> = ({ rowData, onDelete, onUpdate }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="border px-4 py-2">
        <div className="flex items-center gap-2">
          <FiEdit2 className="cursor-pointer text-gray-500 hover:text-blue-600" />
          <FiTrash2 onClick={onDelete} className="cursor-pointer text-gray-500 hover:text-red-600" />
        </div>
      </td>
      <td className="border px-2 py-1">
        <TextInput
          name="order" label="" type="number" value={String(rowData.order)}
          onChange={(e) => onUpdate('order', Number(e.target.value))}
        />
      </td>
      <td className="border px-2 py-1">
        <TextInput
          name="status" label="" value={rowData.status}
          onChange={(e) => onUpdate('status', e.target.value)}
        />
      </td>
      <td className="border px-2 py-1">
        <Select
          name="fixedStatus" label="" value={rowData.fixedStatus}
          options={['Open', 'Closed', 'Pending']}
          onChange={(e) => onUpdate('fixedStatus', e.target.value)}
          placeholder="Select State"
        />
      </td>
      <td className="border px-2 py-1">
        <div className="flex items-center justify-center">
            <input
              type="color"
              value={rowData.colour}
              onChange={(e) => onUpdate('colour', e.target.value)}
              className="w-10 h-10 "
            />
        </div>
      </td>
    </tr>
  );
};

export default AddStatus;
