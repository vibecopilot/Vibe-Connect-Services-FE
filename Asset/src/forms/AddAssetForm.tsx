import React, { useState, useRef } from 'react';
import Select from '../components/Select';
import TextInput from '../components/TextInput';
import RadioButton from '../components/RadioButton';
import FileUpload from '../components/FileUpload';
import ToggleSwitch from '../components/ToggleSwitch';
import Accordion from '../components/Accordion';
import DatePicker from '../components/DatePicker';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import Tabs from "../components/Tabs";

type TabType = "Assets" | "AMC" | "Checklist" | "PPM" | "Stock Items";

interface AddAssetFormProps {
  initialData?: any;
  onClose?: () => void;
}

const buildingOptions = ['Building 1', 'Building 2'];
const floorOptions = ['Floor 1', 'Floor 2'];
const unitOptions = ['Unit 1', 'Unit 2'];
const vendorOptions = ['Vendor 1', 'Vendor 2'];
const poOptions = ['PO 1', 'PO 2'];
const assetTypeOptions = ['Type 1', 'Type 2'];
const categoryOptions = ['Category 1', 'Category 2'];
const groupOptions = ['Group 1', 'Group 2'];
const subGroupOptions = ['Sub Group 1', 'Sub Group 2'];
const departmentOptions = ['Department 1', 'Department 2'];

const AddAssetForm: React.FC<AddAssetFormProps> = ({ initialData, onClose }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("Assets");
  const [form, setForm] = useState({
    building: '',
    floor: '',
    unit: '',
    vendor: '',
    po: '',
    latitude: '0',
    longitude: '0',
    altitude: '0',
    breakdown: false,
    inUse: false,
    assetName: '',
    brand: '',
    model: '',
    serial: '',
    assetType: '',
    category: '',
    group: '',
    subGroup: '',
    capacity: '',
    capacityUnit: '',
    department: '',
    critical: 'No',
    assetReading: 'No',
    compliance: 'No',
  });
  type RadioOption = {
  label: string;
  value: string;
};

  const [files, setFiles] = useState({
    invoice: null,
    insurance: null,
    manuals: null,
    other: null,
  });

  const [purchase, setPurchase] = useState({
    cost: '',
    poNumber: '',
    purchaseDate: '',
    endOfLife: '',
    vendorName: ''
  });

  const [warranty, setWarranty] = useState({
    warrantyType: '',
    warrantyStart: '',
    warrantyEnd: '',
    underWarranty: '',
    amcType: '',
    amcStart: '',
    amcEnd: '',
    amcProvider: ''
  });

  const [additional, setAdditional] = useState({
    maintainedBy: '',
    monitoredBy: '',
    managedBy: ''
  });

  type MeasureRow = {
    name: string;
    unitType: string;
    min: string;
    max: string;
    alertBelow: string;
    alertAbove: string;
    multiplier: string;
    checkPrevious: boolean;
    [key: string]: string | boolean;
  };

  const [consumptionMeasures, setConsumptionMeasures] = useState<MeasureRow[]>([
    {
      name: '',
      unitType: '',
      min: '',
      max: '',
      alertBelow: '',
      alertAbove: '',
      multiplier: '',
      checkPrevious: false
    }
  ]);
  const [nonConsumptionMeasures, setNonConsumptionMeasures] = useState<MeasureRow[]>([
    {
      name: '',
      unitType: '',
      min: '',
      max: '',
      alertBelow: '',
      alertAbove: '',
      multiplier: '',
      checkPrevious: false
    }
  ]);

  const unitTypeOptions = ['Unit 1', 'Unit 2'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' && 'checked' in e.target ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleRadio = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFile = (name: string, fileList: FileList | null) => {
    setFiles(prev => ({ ...prev, [name]: fileList }));
  };

  const handleMeasureChange = (type: 'consumption' | 'nonConsumption', idx: number, field: string, value: any) => {
    if (type === 'consumption') {
      const updated = [...consumptionMeasures];
      updated[idx][field] = value;
      setConsumptionMeasures(updated);
    } else {
      const updated = [...nonConsumptionMeasures];
      updated[idx][field] = value;
      setNonConsumptionMeasures(updated);
    }
  };

  const addMeasureRow = (type: 'consumption' | 'nonConsumption') => {
    const newRow = {
      name: '',
      unitType: '',
      min: '',
      max: '',
      alertBelow: '',
      alertAbove: '',
      multiplier: '',
      checkPrevious: false
    };
    if (type === 'consumption') {
      setConsumptionMeasures([...consumptionMeasures, newRow]);
    } else {
      setNonConsumptionMeasures([...nonConsumptionMeasures, newRow]);
    }
  };

  const removeMeasureRow = (type: 'consumption' | 'nonConsumption', idx: number) => {
    if (type === 'consumption') {
      setConsumptionMeasures(consumptionMeasures.filter((_, i) => i !== idx));
    } else {
      setNonConsumptionMeasures(nonConsumptionMeasures.filter((_, i) => i !== idx));
    }
  };

  const handleDropdownClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Combine all form data
      const formData = {
        ...form,
        purchase,
        warranty,
        additional,
        files,
        activeTab
      };
      console.log('Form submitted:', formData);
      
      // Here you would typically send the data to your backend
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Navigate back to the assets list
      navigate('/assetmanagement');
      
      // If we're in edit mode and have an onClose callback, call it
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  // Prevent form submission on any click except the submit button
  const handleFormClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName !== 'BUTTON' || !target.classList.contains('submit-button')) {
      e.preventDefault();
    }
  };
  
const yesNoOptions: RadioOption[] = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
];

  const accordionItems = [
    {
      title: 'Asset Info', 
      content: (
        <div className="bg-white p-4" style={{ fontFamily: "'PT Sans', sans-serif" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextInput label="Asset Name" name="assetName" value={form.assetName} onChange={handleChange} />
            <TextInput label="Brand" name="brand" value={form.brand} onChange={handleChange} />
            <TextInput label="Model" name="model" value={form.model} onChange={handleChange} />
            <TextInput label="Serial Number" name="serial" value={form.serial} onChange={handleChange} />
            <Select label="Asset Type" name="assetType" options={assetTypeOptions} value={form.assetType} onChange={handleChange} />
            <Select label="Category" name="category" options={categoryOptions} value={form.category} onChange={handleChange} />
            <Select label="Group" name="group" options={groupOptions} value={form.group} onChange={handleChange} />
            <Select label="Sub Group" name="subGroup" options={subGroupOptions} value={form.subGroup} onChange={handleChange} />
            <TextInput label="Capacity" name="capacity" value={form.capacity} onChange={handleChange} />
            <TextInput label="Capacity Unit" name="capacityUnit" value={form.capacityUnit} onChange={handleChange} />
            <Select label="Department" name="department" options={departmentOptions} value={form.department} onChange={handleChange} />
            <RadioButton label="Critical Asset" name="critical"  options={yesNoOptions} value={form.critical} onChange={({ target }) => handleRadio('critical', target.value)} />
            <RadioButton label="Asset Reading" name="assetReading"  options={yesNoOptions} value={form.assetReading} onChange={({ target }) => handleRadio('assetReading', target.value)} />
            <RadioButton label="Compliance" name="compliance" options={yesNoOptions} value={form.compliance} onChange={({ target }) => handleRadio('compliance', target.value)} />
          </div>
        </div>
      )
    },
    {
      title: 'Purchase Information',
      content: (
        <div className="bg-white p-4" style={{ fontFamily: "'PT Sans', sans-serif" }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <TextInput label="Purchase Cost" name="cost" value={purchase.cost} onChange={(e) => setPurchase({ ...purchase, cost: e.target.value })} />
            <TextInput label="PO Number" name="poNumber" value={purchase.poNumber} onChange={e => setPurchase({ ...purchase, poNumber: e.target.value })} />
            <DatePicker label="Purchase Date" name="purchaseDate" value={purchase.purchaseDate} onChange={e => setPurchase({ ...purchase, purchaseDate: e.target.value })} />
            <TextInput label="End of Life" name="endOfLife" value={purchase.endOfLife} onChange={e => setPurchase({ ...purchase, endOfLife: e.target.value })} />
            <div className="col-span-2">
              <TextInput label="Vendor Name" name="vendorName" value={purchase.vendorName} onChange={e => setPurchase({ ...purchase, vendorName: e.target.value })} />
            </div>
            <div className="col-span-2 flex items-end">
              <button type="button" className="bg-blue-400 text-white px-4 py-2 rounded">Add Vendor</button>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'AMC Warranty Information',
      content: (
        <div className="bg-white p-4" style={{ fontFamily: "'PT Sans', sans-serif" }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <TextInput label="Warranty Type" name="warrantyType" value={warranty.warrantyType} onChange={e => setWarranty({ ...warranty, warrantyType: e.target.value })} />
            <DatePicker label="Warranty Start Date" name="warrantyStart" value={warranty.warrantyStart} onChange={e => setWarranty({ ...warranty, warrantyStart: e.target.value })} />
            <DatePicker label="Warranty End Date" name="warrantyEnd" value={warranty.warrantyEnd} onChange={e => setWarranty({ ...warranty, warrantyEnd: e.target.value })} />
            <RadioButton label="Under Warranty" name="underWarranty"  options={yesNoOptions} value={warranty.underWarranty} onChange={({ target }) => setWarranty({ ...warranty, underWarranty: target.value })} />
            <TextInput label="AMC Type" name="amcType" value={warranty.amcType} onChange={e => setWarranty({ ...warranty, amcType: e.target.value })} />
            <DatePicker label="AMC Start Date" name="amcStart" value={warranty.amcStart} onChange={e => setWarranty({ ...warranty, amcStart: e.target.value })} />
            <DatePicker label="AMC End Date" name="amcEnd" value={warranty.amcEnd} onChange={e => setWarranty({ ...warranty, amcEnd: e.target.value })} />
            <TextInput label="AMC Provider Company Name" name="amcProvider" value={warranty.amcProvider} onChange={e => setWarranty({ ...warranty, amcProvider: e.target.value })} />
          </div>
        </div>
      )
    },
    {
      title: 'Maintenance Information',
      content: (
        <div className="bg-white p-4" style={{ fontFamily: "'PT Sans', sans-serif" }}>
          <div className="mb-4">
            <div className="font-semibold mb-2">Consumption Asset Measure:</div>
            {consumptionMeasures.map((row, idx) => (
              <div key={idx} className="grid grid-cols-9 gap-2 items-center mb-2">
                <TextInput label="Name" name="name" value={row.name as string} onChange={e => handleMeasureChange('consumption', idx, 'name', e.target.value)} />
                <Select label="Unit Type" name="unitType" options={unitTypeOptions} value={row.unitType as string} onChange={e => handleMeasureChange('consumption', idx, 'unitType', e.target.value)} />
                <TextInput label="Min" name="min" value={row.min as string} onChange={e => handleMeasureChange('consumption', idx, 'min', e.target.value)} />
                <TextInput label="Max" name="max" value={row.max as string} onChange={e => handleMeasureChange('consumption', idx, 'max', e.target.value)} />
                <TextInput label="Alert Below Value" name="alertBelow" value={row.alertBelow as string} onChange={e => handleMeasureChange('consumption', idx, 'alertBelow', e.target.value)} />
                <TextInput label="Alert Above Value" name="alertAbove" value={row.alertAbove as string} onChange={e => handleMeasureChange('consumption', idx, 'alertAbove', e.target.value)} />
                <TextInput label="Multiplier Factor" name="multiplier" value={row.multiplier as string} onChange={e => handleMeasureChange('consumption', idx, 'multiplier', e.target.value)} />
                <div className="flex items-center justify-center">
                  <input type="checkbox" checked={row.checkPrevious} onChange={e => handleMeasureChange('consumption', idx, 'checkPrevious', e.target.checked)} />
                  <span className="ml-1 text-xs">Check Previous Reading</span>
                </div>
<button
  type="button"
  onClick={() => removeMeasureRow('consumption', idx)}
  className="text-red-500 text-lg"
>
  <FaTrash />
</button>              </div>
            ))}
            <button type="button" onClick={() => addMeasureRow('consumption')} className="text-blue-500 text-xl">＋</button>
          </div>
          <div>
            <div className="font-semibold mb-2">Non Consumption Asset Measure:</div>
            {nonConsumptionMeasures.map((row, idx) => (
              <div key={idx} className="grid grid-cols-9 gap-2 items-center mb-2">
                <TextInput label="Name" name="name" value={row.name as string} onChange={e => handleMeasureChange('nonConsumption', idx, 'name', e.target.value)} />
                <Select label="Unit Type" name="unitType" options={unitTypeOptions} value={row.unitType as string} onChange={e => handleMeasureChange('nonConsumption', idx, 'unitType', e.target.value)} />
                <TextInput label="Min" name="min" value={row.min as string} onChange={e => handleMeasureChange('nonConsumption', idx, 'min', e.target.value)} />
                <TextInput label="Max" name="max" value={row.max as string} onChange={e => handleMeasureChange('nonConsumption', idx, 'max', e.target.value)} />
                <TextInput label="Alert Below Value" name="alertBelow" value={row.alertBelow as string} onChange={e => handleMeasureChange('nonConsumption', idx, 'alertBelow', e.target.value)} />
                <TextInput label="Alert Above Value" name="alertAbove" value={row.alertAbove as string} onChange={e => handleMeasureChange('nonConsumption', idx, 'alertAbove', e.target.value)} />
                <TextInput label="Multiplier Factor" name="multiplier" value={row.multiplier as string} onChange={e => handleMeasureChange('nonConsumption', idx, 'multiplier', e.target.value)} />
                <div className="flex items-center justify-center">
                  <input type="checkbox" checked={row.checkPrevious} onChange={e => handleMeasureChange('nonConsumption', idx, 'checkPrevious', e.target.checked)} />
                  <span className="ml-1 text-xs">Check Previous Reading</span>
                </div>
<button
  type="button"
  onClick={() => removeMeasureRow('consumption', idx)}
  className="text-red-500 text-lg"
>
  <FaTrash />
</button>                  </div>
            ))}
            <button type="button" onClick={() => addMeasureRow('nonConsumption')} className="text-blue-500 text-xl">＋</button>
          </div>
        </div>
      )
    },
    {
      title: 'Additional Information',
      content: (
        <div className="bg-white p-4" style={{ fontFamily: "'PT Sans', sans-serif" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextInput label="Maintained By" name="maintainedBy" value={additional.maintainedBy} onChange={e => setAdditional({ ...additional, maintainedBy: e.target.value })} />
            <TextInput label="Monitored By" name="monitoredBy" value={additional.monitoredBy} onChange={e => setAdditional({ ...additional, monitoredBy: e.target.value })} />
            <TextInput label="Managed By" name="managedBy" value={additional.managedBy} onChange={e => setAdditional({ ...additional, managedBy: e.target.value })} />
          </div>
        </div>
      )
    },
    {
      title: 'Attachments',
      content: (
        <div className="bg-white p-4" style={{ fontFamily: "'PT Sans', sans-serif" }}>
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <div className="mb-2 font-medium">Purchase Invoice</div>
                <FileUpload
                  name="invoice"
                  label=""
                  onChange={files => handleFile('invoice', files)}
                />
              </div>
              <div>
                <div className="mb-2 font-medium">Insurance Details</div>
                <FileUpload
                  name="insurance"
                  label=""
                  onChange={files => handleFile('insurance', files)}
                />
              </div>
              <div>
                <div className="mb-2 font-medium">Manuals</div>
                <FileUpload
                  name="manuals"
                  label=""
                  onChange={files => handleFile('manuals', files)}
                />
              </div>
              <div>
                <div className="mb-2 font-medium">Other Files</div>
                <FileUpload
                  name="other"
                  label=""
                  onChange={files => handleFile('other', files)}
                />
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <form 
      onSubmit={handleFormSubmit} 
      onClick={handleFormClick}
      className="bg-white p-6 rounded shadow-md w-full max-w-6xl mx-auto"
    >
      {/* Tabs - Only show when not in edit mode */}
      {!initialData && (
        <div className="mb-4">
          <Tabs
            tabs={[
              { label: "Assets", key: "Assets" },
              { label: "AMC", key: "AMC" },
              { label: "Checklist", key: "Checklist" },
              { label: "PPM", key: "PPM" },
              { label: "Stock Items", key: "Stock Items" }
            ]}
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab as TabType)}
          />
        </div>
      )}

      {/* Location Details */}
      <div className="mb-4 border-b-4 border-gray-300 pb-2" style={{ fontFamily: "'PT Sans', sans-serif" }}>
        <h2 className="text-lg font-semibold text-center bg-gray-200 py-1 mb-4">Location Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div onClick={handleDropdownClick}>
            <Select label="Select Building:" name="building" options={buildingOptions} value={form.building} onChange={handleChange} />
          </div>
          <div onClick={handleDropdownClick}>
            <Select label="Select Floor:" name="floor" options={floorOptions} value={form.floor} onChange={handleChange} />
          </div>
          <div onClick={handleDropdownClick}>
            <Select label="Select Unit:" name="unit" options={unitOptions} value={form.unit} onChange={handleChange} />
          </div>
          <TextInput label="Latitude:" name="latitude" value={form.latitude} onChange={handleChange} />
          <TextInput label="Longitude:" name="longitude" value={form.longitude} onChange={handleChange} />
          <TextInput label="Altitude:" name="altitude" value={form.altitude} onChange={handleChange} />
          <div onClick={handleDropdownClick}>
            <Select label="Existing Vendor" name="vendor" options={vendorOptions} value={form.vendor} onChange={handleChange} />
          </div>
          <div onClick={handleDropdownClick}>
            <Select label="PO Number:" name="po" options={poOptions} value={form.po} onChange={handleChange} />
          </div>
        </div>
        <div className="flex items-center justify-center gap-8 mt-4">
          <div className="flex items-center gap-2">
            <span>Breakdown</span>
            <ToggleSwitch checked={form.breakdown} onChange={checked => setForm(f => ({ ...f, breakdown: checked }))} />
          </div>
          <div className="flex items-center gap-2">
            <span>In Use</span>
            <ToggleSwitch checked={form.inUse} onChange={checked => setForm(f => ({ ...f, inUse: checked }))} />
          </div>
        </div>
      </div>

      {/* Accordion Sections */}
      <Accordion items={accordionItems} />

      {/* Save button below Attachments */}
      <div className="mt-8 flex justify-center" style={{ fontFamily: "'PT Sans', sans-serif" }}>
        <button 
          type="submit" 
          className="submit-button bg-[#7991BB] text-white text-xl px-16 py-3 rounded hover:bg-blue-500 transition-colors"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddAssetForm;
