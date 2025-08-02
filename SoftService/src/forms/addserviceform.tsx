import React, { useState } from 'react';
import TextInput from '../components/TextInput';
import Select from '../components/Select';
import FileUpload from '../components/FileUpload';
import { useNavigate } from 'react-router-dom';

interface AddServiceFormProps {
  onClose?: () => void;
}

const AddServiceForm: React.FC<AddServiceFormProps> = ({ onClose }) => {
  const [serviceName, setServiceName] = useState('');
  const [building, setBuilding] = useState('');
  const [serviceGroups, setServiceGroups] = useState('');
  const [floor, setFloor] = useState('');
  const [unit, setUnit] = useState('');
  const [serviceSubGroups, setServiceSubGroups] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [cronEvery, setCronEvery] = useState('Day');
  const [cronHour, setCronHour] = useState('0');
  const [cronMinute, setCronMinute] = useState('0');
  const [attachments, setAttachments] = useState<File[]>([]);
  const navigate = useNavigate();

  const buildingOptions = ['digi', 'vibe'];
  const floorOptions = ['1st', '2nd Floor'];
  const unitOptions = ['Vibe Workforce'];
  const cronEveryOptions = ['Day', 'Week', 'Month'];
  const hourOptions = Array.from({ length: 24 }, (_, i) => i.toString());
  const minuteOptions = Array.from({ length: 60 }, (_, i) => i.toString());

  const handleFileChange = (files: FileList | null) => {
    if (files) {
      setAttachments(Array.from(files));
    } else {
      setAttachments([]);
    }
  };

  const handleSave = () => {
    console.log({
      serviceName,
      building,
      serviceGroups,
      floor,
      unit,
      serviceSubGroups,
      latitude,
      longitude,
      cronEvery,
      cronHour,
      cronMinute,
      attachments,
    });
    if (onClose) onClose();
    navigate('/softservice');
  };

  const handleClearCron = () => {
    setCronEvery('Day');
    setCronHour('0');
    setCronMinute('0');
  };

  return (
    <div className="p-4" style={{ fontFamily: "'PT Sans', sans-serif",color: 'gray' }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
        <TextInput label="Service Name:" value={serviceName} onChange={(e) => setServiceName(e.target.value)} name="serviceName" />
        <Select label="Select Building:" value={building} onChange={(e) => setBuilding(e.target.value)} options={buildingOptions} name="building" />
        <TextInput label="Service Groups:" value={serviceGroups} onChange={(e) => setServiceGroups(e.target.value)} name="serviceGroups" />
        <Select label="Select Floor:" value={floor} onChange={(e) => setFloor(e.target.value)} options={floorOptions} name="floor" />
        <Select label="Select Unit:" value={unit} onChange={(e) => setUnit(e.target.value)} options={unitOptions} name="unit" />
        <TextInput label="Service Sub Groups:" value={serviceSubGroups} onChange={(e) => setServiceSubGroups(e.target.value)} name="serviceSubGroups" />
        <TextInput label="Latitude:" value={latitude} onChange={(e) => setLatitude(e.target.value)} name="latitude" />
        <TextInput label="Longitude:" value={longitude} onChange={(e) => setLongitude(e.target.value)} name="longitude" />
        <div></div>
      </div>
      <div className="mt-6 mb-4 text-left" style={{ fontFamily: "'PT Sans', sans-serif" }} >
        <h4 className="font-semibold mb-2">Cron setting</h4>
      <div className="flex flex-col p-7 w-150 rounded-lg space-y-2 border-2 border-dotted border-gray-400">
        <div className="flex items-center gap-4 ">
          <span className='mb-4'>Every</span>
          <Select value={cronEvery} onChange={(e) => setCronEvery(e.target.value)} options={cronEveryOptions} name="cronEvery" />
          <span className='mb-4'>at</span>
          <Select value={cronHour} onChange={(e) => setCronHour(e.target.value)} options={hourOptions} name="cronHour" />
          <span className='mb-4'>:</span>
          <Select value={cronMinute} onChange={(e) => setCronMinute(e.target.value)} options={minuteOptions} name="cronMinute" />
          <button className="bg-red-500 text-white px-3 py-1 mb-4 rounded hover:bg-red-600 transition" onClick={handleClearCron}>
            Clear
          </button>
        </div>
      </div>
</div>
      <div className="mt-6 mb-4 text-left">
        <h4 className="font-semibold mb-2">Attachments</h4>
        <FileUpload onChange={handleFileChange} />
      </div>

      <div className="mt-6 flex justify-center">
        <button className="bg-[#7991BB] text-white px-6 py-2 rounded-md hover:bg-[#5e6e99] transition" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddServiceForm;
