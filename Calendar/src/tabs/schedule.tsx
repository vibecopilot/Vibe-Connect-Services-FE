import React, { useState } from "react";
import DatePicker from "../components/DatePicker";
import Button from "../components/Button";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface Schedule {
  date: string;
  slots: string[];
}

interface ScheduleProps {
  onSave: (data: Schedule[]) => void;
  onClose: () => void;
}

const ScheduleComponent: React.FC<ScheduleProps> = ({ onSave, onClose }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const getDatesInRange = (start: string, end: string, days: string[]) => {
    const result: string[] = [];
    let current = new Date(start);
    const last = new Date(end);
    while (current <= last) {
      const dayName = dayNames[current.getDay()];
      if (days.includes(dayName)) {
        const isoDate = current.toISOString().split("T")[0]; // YYYY-MM-DD
        const [year, month, day] = isoDate.split("-");
        const formatted = `${day}-${month}-${year}`; // DD-MM-YYYY
        result.push(formatted);
      }
      current.setDate(current.getDate() + 1);
    }
    return result;
  };

  const handleSave = () => {
    const dateList = getDatesInRange(fromDate, toDate, selectedDays);
   const newSchedule= dateList.map((date) => ({
  date,
  slots: [`${fromTime} - ${toTime}`],
}));

    if (onSave) {
      onSave(newSchedule); // newSchedule is an array
    }
    
    onClose();
  };

  return (
    <div className="pl-30 pt-20 w-250 ml-80 mt-10 bg-white rounded shadow">
      <p className="mb-10 text-2xl font-semibold">Working Days Setup </p>
      <div className="flex gap-4">
        <DatePicker label="From Date" type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        <DatePicker label="To Date" type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
      </div>

      <div className="mt-4">
        <label className="block mb-2 font-medium text-sm">Select Days</label>
        <div className="flex flex-wrap gap-2">
          {daysOfWeek.map((day) => (
            <button
              key={day}
              className={`px-3 py-1 rounded border text-sm ${
                selectedDays.includes(day)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
              onClick={() => toggleDay(day)}
              type="button"
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 mr-180  flex gap-4">
        <DatePicker label="From Time" type="time" value={fromTime} onChange={(e) => setFromTime(e.target.value)} />
        <DatePicker label="To Time" type="time" value={toTime} onChange={(e) => setToTime(e.target.value)} />
      </div>

      <div className="mt-12 mr-185 pb-20 flex justify-end gap-2">
        <Button label="Cancel" onClick={onClose} />
        <Button label="Save" onClick={handleSave} />
      </div>
    </div>
  );
};

export default ScheduleComponent;
