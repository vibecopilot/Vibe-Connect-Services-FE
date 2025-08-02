import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

import DropdownMenu from '../components/DropdownMenu';
import TextInput from '../components/TextInput';
import TextArea from '../components/TextArea';
import DatePicker from '../components/DatePicker';
import FileUpload from '../components/FileUpload';
import IconButton from '../components/IconButton';

import FitoutRequest from '../tabs/Fitoutrequest'; // ✅ update path if needed

interface AnnexureItem {
  id: number;
  name: string;
  file?: File;
}

const towerOptions = ['Tower A', 'Tower B', 'Tower C'];
const userOptions = ['John Doe', 'Jane Smith', 'Alex Brown'];
const annexureTypes = ['NOC Letter', 'Drawings', 'Indemnity Bond'];

const towerFlatMap: Record<string, string[]> = {
  'Tower A': ['101', '102', '103'],
  'Tower B': ['201', '202', '203'],
  'Tower C': ['301', '302', '303'],
};

const AddFitoutRequest: React.FC = () => {
  const [tower, setTower] = useState('');
  const [flat, setFlat] = useState('');
  const [user, setUser] = useState('');
  const [requestedDate, setRequestedDate] = useState<Date | null>(null);
  const [contractorName, setContractorName] = useState('');
  const [contractorPhone, setContractorPhone] = useState('');
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);
  const [refundDate, setRefundDate] = useState<Date | null>(null);
  const [description, setDescription] = useState('');

  const [selectedAnnexure, setSelectedAnnexure] = useState('');
  const [annexureFile, setAnnexureFile] = useState<File | null>(null);
  const [annexures, setAnnexures] = useState<AnnexureItem[]>([]);

  const [dropdownOpen, setDropdownOpen] = useState({
    tower: false,
    flat: false,
    user: false,
    annexure: false,
  });

  const [showFitoutRequest, setShowFitoutRequest] = useState(false); // ✅ NEW STATE

  const flatOptions = tower ? towerFlatMap[tower] || [] : [];

  const handleTowerChange = (label: string) => {
    setTower(label);
    if (!towerFlatMap[label]?.includes(flat)) {
      setFlat('');
    }
  };

  const addAnnexure = () => {
    if (!selectedAnnexure) return;
    setAnnexures((prev) => [
      ...prev,
      { id: Date.now(), name: selectedAnnexure, file: annexureFile ?? undefined },
    ]);
    setSelectedAnnexure('');
    setAnnexureFile(null);
  };

  const removeAnnexure = (id: number) =>
    setAnnexures((prev) => prev.filter((a) => a.id !== id));

  const amount = annexures.length * 0;
  const convenienceCharge = 0;
  const total = amount + convenienceCharge;

  const handleSubmit = () => {
    setShowFitoutRequest(true); // ✅ SHOW FITOUT REQUEST INLINE
  };

  if (showFitoutRequest) {
    return <FitoutRequest />; // ✅ INLINE RENDERED COMPONENT
  }

  return (
    <div className="p-4 flex flex-col gap-6 text-gray-700" style={{ fontFamily: "'PT Sans', sans-serif" }}>
      <section>
        <h3 className="bg-[#d0d0d0] px-2 py-1 text-sm font-semibold flex justify-center gap-4">Request Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
          <div>
            <label className="block text-sm mb-1">Tower*</label>
            <DropdownMenu
              trigger={<div className="border px-3 py-2 rounded-md">{tower || 'Select Tower'}</div>}
              items={towerOptions.map((label) => ({ label, onClick: () => handleTowerChange(label) }))}
              open={dropdownOpen.tower}
              onToggle={(open) => setDropdownOpen((prev) => ({ ...prev, tower: open }))}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Flat*</label>
            <DropdownMenu
              trigger={<div className="border px-3 py-2 rounded-md">{flat || 'Select Flat'}</div>}
              items={flatOptions.map((label) => ({ label, onClick: () => setFlat(label) }))}
              open={dropdownOpen.flat}
              onToggle={(open) => setDropdownOpen((prev) => ({ ...prev, flat: open }))}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">User*</label>
            <DropdownMenu
              trigger={<div className="border px-3 py-2 rounded-md">{user || 'Select User'}</div>}
              items={userOptions.map((label) => ({ label, onClick: () => setUser(label) }))}
              open={dropdownOpen.user}
              onToggle={(open) => setDropdownOpen((prev) => ({ ...prev, user: open }))}
            />
          </div>

          <DatePicker
            label="Requested Date*"
            value={requestedDate || ''}
            onChange={(e) => setRequestedDate(e.target.value ? new Date(e.target.value) : null)}
            required
          />

          <TextInput
            name="contractorName"
            label="Contractor Name"
            value={contractorName}
            onChange={(e) => setContractorName(e.target.value)}
          />
          <TextInput
            name="contractorPhone"
            label="Contractor Mobile No"
            value={contractorPhone}
            onChange={(e) => setContractorPhone(e.target.value)}
          />
          <DatePicker
            label="Expiry Date"
            value={expiryDate || ''}
            onChange={(e) => setExpiryDate(e.target.value ? new Date(e.target.value) : null)}
          />
          <DatePicker
            label="Refund Date"
            value={refundDate || ''}
            onChange={(e) => setRefundDate(e.target.value ? new Date(e.target.value) : null)}
          />
          <div className="md:col-span-4">
            <TextArea
              name="description"
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
        </div>
      </section>

      <section>
        <h3 className="bg-[#d0d0d0] px-2 py-1 text-sm font-semibold flex justify-center gap-4">Annexure Info</h3>
        <div className="p-4 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div>
              <label className="block text-sm mb-1">Annexure*</label>
              <DropdownMenu
                trigger={<div className="border px-3 py-2 rounded-md">{selectedAnnexure || 'Select Annexure'}</div>}
                items={annexureTypes.map((label) => ({ label, onClick: () => setSelectedAnnexure(label) }))}
                open={dropdownOpen.annexure}
                onToggle={(open) => setDropdownOpen((prev) => ({ ...prev, annexure: open }))}
              />
            </div>
            <IconButton tooltip="Remove selection" onClick={() => setSelectedAnnexure('')}>
              <FiX />
            </IconButton>
          </div>

          <FileUpload
            label="Upload Annexure"
            accept="application/pdf,image/*"
            onChange={(f) => setAnnexureFile(f && f.length > 0 ? f[0] : null)}
          />

          <button
            type="button"
            onClick={addAnnexure}
            className="w-max bg-[#4D6FA9] text-white px-4 py-2 rounded-md"
          >
            Add Annexure
          </button>

          {annexures.length > 0 && (
            <ul className="space-y-2">
              {annexures.map((a) => (
                <li key={a.id} className="flex items-center gap-2 text-sm">
                  <span>{a.name}</span>
                  {a.file && <span className="text-xs text-gray-500">({a.file.name})</span>}
                  <IconButton tooltip="Remove" onClick={() => removeAnnexure(a.id)}>
                    <FiX />
                  </IconButton>
                </li>
              ))}
            </ul>
          )}

          <div className="text-sm space-y-1 pt-2">
            <p>Amount: {amount.toFixed(2)}</p>
            <p>Convenience Charge: {convenienceCharge.toFixed(2)}</p>
            <p>Total: {total.toFixed(2)}</p>
            <p>
              Payment Mode : <span className="font-semibold">PAY AT SITE</span>
            </p>
          </div>
        </div>
      </section>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-[#4D6FA9] text-white px-8 py-2 rounded-md"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default AddFitoutRequest;
