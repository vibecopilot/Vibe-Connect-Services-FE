// PlanMyCalendar.tsx
import React, { useState } from "react";
import ScheduleComponent from "../tabs/schedule";
import Button from "../components/Button";
import DatePicker from "../components/DatePicker";

interface Schedule {
  date: string;
  slots: string[];
}



const PlanMyCalendar: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const [fromDate, setFromDate] = useState("2025-06-05");
  const [toDate, setToDate] = useState("2025-06-12");
  const [showSchedule, setShowSchedule] = useState(false);

const handleSave = (data: Schedule[]) => {
  setSchedules((prev) => [...prev, ...data]);
  setShowSchedule(false);
};


  const filteredSchedules = schedules.filter((s) => {
    const [d, m, y] = s.date.split("-");
    if (!d || !m || !y) return false;
    const scheduleDate = new Date(`${y}-${m}-${d}`).getTime();
    const from = new Date(fromDate).getTime();
    const to = new Date(toDate).getTime();
    return scheduleDate >= from && scheduleDate <= to;
  });

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Top Buttons */}
      <div className="flex gap-3 px-6 py-4 border-b border-gray-300 bg-white">
        <Button variant="secondary" label="Sync to Google" />
        <Button variant="light" label="Plan My Calendar" />
        <Button
          variant="primary"
          label="Schedule"
          onClick={() => setShowSchedule(true)}
        />
      </div>

      {showSchedule ? (
        <ScheduleComponent
          onSave={handleSave}
          onClose={() => setShowSchedule(false)}
        />
      ) : (
        <>
          {/* Date Range Filter */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-300 text-sm">
            <span className="font-semibold text-gray-800">
              View Schedule By selecting Date Range
            </span>
            <DatePicker
              label=""
              value={fromDate}
              onChange={(e) => {
                const iso = e.target.value;
                setFromDate(iso);
                if (new Date(iso).getTime() > new Date(toDate).getTime()) {
                  setToDate(iso);
                }
              }}
            />
            <span>To</span>
            <DatePicker
              label=""
              value={toDate}
              onChange={(e) => {
                const iso = e.target.value;
                setToDate(iso);
                if (new Date(iso).getTime() < new Date(fromDate).getTime()) {
                  setFromDate(iso);
                }
              }}
            />
          </div>

          {/* Schedule Display */}
          <div className="px-6 py-4 space-y-4">
            {filteredSchedules.length === 0 ? (
              <p className="text-center text-gray-500">
                No schedules found for selected date range.
              </p>
            ) : (
              filteredSchedules.map((schedule, idx) => (
                <div
                  key={idx}
                  className="border border-gray-300 rounded p-4 bg-white"
                >
                  <p className="font-semibold text-gray-700">
                    DATE: {schedule.date}
                  </p>
                  <p className="mt-1 mb-2 text-gray-700">Time Slot Schedule:</p>
                  <div className="flex flex-wrap gap-2">
                    {schedule.slots.map((slot, i) => (
                      <span
                        key={i}
                        className="bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded"
                      >
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PlanMyCalendar;
