// src/forms/Addcapa.tsx
import React, { useState, useMemo, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import TextInput from '../components/TextInput';
import TextArea from '../components/TextArea';
import Select from '../components/Select';
import DatePicker from '../components/DatePicker';
import RadioButton from '../components/RadioButton';

interface CapaFormValues {
  incidentNo: string;
  date: string;
  department: string;
  raisedBy: string;
  issueSummary: string;
  rootCause: string;
  corrective: string;
  preventive: string;
  owner: string;
  status: string;
  dueDate: string;
  repetitiveFlag: boolean;
}

const departments = ['Maintenance', 'Production', 'Quality'];
const users = ['Aniket', 'Anurag', 'Neeraj'];
const owners = ['Ravi', 'Neeraj'];
const statuses = ['Open', 'Closed', 'WIP'];

const Addcapa: React.FC = () => {
  const navigate = useNavigate();

  const nextIncidentNo = useMemo(() => {
    const yr = new Date().getFullYear().toString().slice(-2);
    const seq = Math.floor(Math.random() * 90 + 10);
    return `INC-20${yr}-${seq}`;
  }, []);

  const [values, setValues] = useState<CapaFormValues>({
    incidentNo: nextIncidentNo,
    date: '',
    department: '',
    raisedBy: '',
    issueSummary: '',
    rootCause: '',
    corrective: '',
    preventive: '',
    owner: '',
    status: '',
    dueDate: '',
    repetitiveFlag: false,
  });

  const update = <K extends keyof CapaFormValues>(key: K, val: CapaFormValues[K]) =>
    setValues((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('CAPA submitted:', values);
    navigate(-1);
  };

  return (
    <div className="p-5" style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray' }}>
      <h2 className="mb-4 text-xl font-semibold">Add</h2>

      <form onSubmit={handleSubmit} className="rounded border border-gray-200 p-6 grid grid-cols-2 gap-x-8 gap-y-4" style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray' }}>
        {/* Row 1 */}
        <div className="flex items-center gap-4 mt-4">
          <label className="w-40 text-sm text-gray-700">Inc Id:</label>
          <TextInput
            name="incidentNo"
            value={values.incidentNo}
            disabled
            onChange={() => {}}
          />
        </div>
        <div className="flex items-center gap-4 mt-4">
          <label className="w-40 text-sm text-gray-700">Date:</label>
          <DatePicker
            label=""
            value={values.date}
            onChange={(e) => update('date', e.target.value)}
          />
        </div>

        {/* Row 2 */}
        <div className="flex items-center gap-4 mt-4">
          <label className="w-40 text-sm text-gray-700">Raised by:</label>
          <Select
            name="raisedBy"
            options={users}
            value={values.raisedBy}
            onChange={(e) => update('raisedBy', e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4 mt-4">
          <label className="w-40 text-sm text-gray-700">Department:</label>
          <Select
            name="department"
            options={departments}
            value={values.department}
            onChange={(e) => update('department', e.target.value)}
          />
        </div>

        {/* Issue Summary (full width) */}
        <div className="flex items-start gap-4 col-span-2 mt-4">
          <label className="w-40 text-sm text-gray-700 pt-1">Issue Summary:</label>
          <div className="flex-1">
            <TextArea
              name="issueSummary"
              rows={4}
              value={values.issueSummary}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                update('issueSummary', e.target.value)
              }
            />
          </div>
        </div>

        {/* Row 4 */}
        <div className="flex items-center gap-4 mt-4">
          <label className="w-40 text-sm text-gray-700">Root Cause:</label>
          <TextInput
            name="rootCause"
            value={values.rootCause}
            onChange={(e) => update('rootCause', e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4 mt-4">
          <label className="w-40 text-sm text-gray-700">Corrective Action:</label>
          <TextInput
            name="corrective"
            value={values.corrective}
            onChange={(e) => update('corrective', e.target.value)}
          />
        </div>

        {/* Row 5 */}
        <div className="flex items-center gap-4 mt-4">
          <label className="w-40 text-sm text-gray-700">Preventive Action:</label>
          <TextInput
            name="preventive"
            value={values.preventive}
            onChange={(e) => update('preventive', e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4 mt-4">
          <label className="w-40 text-sm text-gray-700">Owner:</label>
          <Select
            name="owner"
            options={owners}
            value={values.owner}
            onChange={(e) => update('owner', e.target.value)}
          />
        </div>

        {/* Row 6 */}
        <div className="flex items-center gap-4 mt-4">
          <label className="w-40 text-sm text-gray-700">Due Date:</label>
          <DatePicker
            label=""
            value={values.dueDate}
            onChange={(e) => update('dueDate', e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4 mt-4">
          <label className="w-40 text-sm text-gray-700">Status:</label>
          <Select
            name="status"
            options={statuses}
            value={values.status}
            onChange={(e) => update('status', e.target.value)}
          />
        </div>

        {/* Repetitive Flag (full width) */}
        <div className="flex items-center gap-4 col-span-2">
          <label className="w-40 text-sm text-gray-700">Flag as Repetitive:</label>
          <div className="flex-1 mt-4">
            <RadioButton
              label=""
              name="repetitiveFlag"
              options={["Yes", "No"]}
              value={values.repetitiveFlag ? "Yes" : "No"}
              onChange={(e) => update('repetitiveFlag', e.target.value === "Yes")}
            />
          </div>
        </div>

        {/* Buttons (full width, right aligned) */}
        <div className="col-span-2 flex justify-end gap-3 mt-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded border border-gray-300 px-4 py-1.5 text-sm hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-1.5 text-sm text-white hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addcapa;
