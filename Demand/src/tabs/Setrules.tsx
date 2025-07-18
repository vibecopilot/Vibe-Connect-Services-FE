import React, { useState } from 'react';
import { Card } from '../components/Card';

const SetRules = () => {
  // State for all fields
  const [staffReminder1, setStaffReminder1] = useState('');
  const [staffReminder2, setStaffReminder2] = useState('');
  const [userReminder1, setUserReminder1] = useState('');
  const [userReminder2, setUserReminder2] = useState('');
  const [userReminder2Hrs, setUserReminder2Hrs] = useState('');
  const [userReminder2Val, setUserReminder2Val] = useState('');
  const [finalUserReminder1, setFinalUserReminder1] = useState('');
  const [finalUserReminder2, setFinalUserReminder2] = useState('');
  const [finalUserReminder2Val, setFinalUserReminder2Val] = useState('');
  const [beforeReminderHrs, setBeforeReminderHrs] = useState('');
  const [cancellationRows, setCancellationRows] = useState([
    { cutoff: '', amount: '' },
    { cutoff: '', amount: '' },
    { cutoff: '', amount: '' },
  ]);
  const [scheduleBefore, setScheduleBefore] = useState('');
  const [disclaimer, setDisclaimer] = useState('');

  // Handlers for cancellation table
  const handleCancellationChange = (idx: number, field: 'cutoff' | 'amount', value: string) => {
    setCancellationRows(rows =>
      rows.map((row, i) =>
        i === idx ? { ...row, [field]: value } : row
      )
    );
  };

  return (
    <Card className="p-6">
      {/* Notification Reminder for Staff */}
      <div className="font-semibold mb-2">Notification Reminder for Staff</div>
      <hr className="my-4 border-gray-300" />
      <div className="grid grid-cols-6 gap-2 mb-4 items-center">
        <div>Reminder Notification 01</div>
        <input
          className="border border-gray-300 bg-white px-2 py-1 text-sm w-full"
          style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray' }}
          value={staffReminder1}
          onChange={e => setStaffReminder1(e.target.value)}
        />
        <div>Minutes</div>
        <div>Reminder Notification 02</div>
        <input
          className="border border-gray-300 bg-white px-2 py-1 text-sm w-full"
          style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray' }}
          value={staffReminder2}
          onChange={e => setStaffReminder2(e.target.value)}
        />
        <div>Minutes</div>
      </div>

      {/* Notification Reminder for User 1 */}
      <div className="font-semibold mb-2">Notification Reminder for User</div>
      <hr className="my-4 border-gray-300" />
      <div className="grid grid-cols-8 gap-2 mb-4 items-center">
        <div>Reminder Notification 01</div>
        <input
          className="border border-gray-300 bg-white px-2 py-1 text-sm w-full"
          style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray' }}
          value={userReminder1}
          onChange={e => setUserReminder1(e.target.value)}
        />
        <div>Minutes</div>
        <div>Reminder Notification 02</div>
        <input
          className="border border-gray-300 bg-white px-2 py-1 text-sm w-full"
          style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray' }}
          value={userReminder2Hrs}
          onChange={e => setUserReminder2Hrs(e.target.value)}
          placeholder="Hrs"
        />
        <div>Hrs</div>
        <input
          className="border border-gray-300 bg-white px-2 py-1 text-sm w-full"
          style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray' }}
          value={userReminder2Val}
          onChange={e => setUserReminder2Val(e.target.value)}
          placeholder="Minutes"
        />
        <div>Minutes</div>
      </div>

      {/* Notification Reminder for User 2 */}
      <div className="font-semibold mb-2">Notification Reminder for User</div>
      <hr className="my-4 border-gray-300" />
      <div className="grid grid-cols-6 gap-2 mb-4 items-center">
        <div>Final Reminder Notification to User</div>
        <input
          className="border border-gray-300 bg-white px-2 py-1 text-sm w-full"
          style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray' }}
          value={finalUserReminder1}
          onChange={e => setFinalUserReminder1(e.target.value)}
        />
        <div>Minutes</div>
        <div>Reminder Notification 02</div>
        <input
          className="border border-gray-300 bg-white px-2 py-1 text-sm w-full"
          style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray' }}
          value={finalUserReminder2}
          onChange={e => setFinalUserReminder2(e.target.value)}
        />
        <div>Minutes</div>
      </div>

      {/* Notification Reminder for User 3 */}
      <div className="font-semibold mb-2">Notification Reminder for User</div>
      <hr className="my-4 border-gray-300" />
      <div className="grid grid-cols-6 gap-2 mb-4 items-center">
        <div>Notification before</div>
        <input
          className="border border-gray-300 bg-white px-2 py-1 text-sm w-full"
          style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray' }}
          placeholder="Hrs"
          value={beforeReminderHrs}
          onChange={e => setBeforeReminderHrs(e.target.value)}
        />
        <div className="col-span-4"></div>
      </div>

      {/* Cancellation Setup */}
      <div className="font-semibold mb-2">Cancellation Setup</div>
      <hr className="my-4 border-gray-300" />
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <div className="text-xs text-gray-600 mb-2">
            In the event that you cancel your booking/order, cancellation fees will be charged as detailed below.<br/> We will endeavour to resell your booking and, if successful, any payments received for such booking <br/> sold will be taken into account, based on the applied percentage, when calculating your cancellation fee.
          </div>
        </div>
        <div>
          <table className="border-gray w-full text-sm">
            <thead>
              <tr>
                <th className="border-gray px-3 py-1">Cutoff Time</th>
                <th className="border-gray px-2 py-1">Return Amount(%)</th>
              </tr>
            </thead>
            <tbody>
              {cancellationRows.map((row, idx) => (
                <tr key={idx}>
                  <td className="border px-2 py-1">
                    <input
                      className="border border-gray-300 bg-white px-2 py-1 w-16"
                      style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray' }}
                      value={row.cutoff}
                      onChange={e => handleCancellationChange(idx, 'cutoff', e.target.value)}
                    />
                  </td>
                  <td className="border px-2 py-1 flex items-center">
                    <input
                      className="border border-gray-300 bg-white px-2 py-1 w-16"
                      style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray' }}
                      value={row.amount}
                      onChange={e => handleCancellationChange(idx, 'amount', e.target.value)}
                    />
                    <span className="ml-1">%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule Setting */}
      <div className="font-semibold mb-2">Schedule Setting</div>
      <hr className="my-4 border-gray-300" />
      <div className="flex gap-2 mb-4 items-center">
        <input
          className="border border-gray-300 bg-white px-2 py-1 text-sm w-full"
          style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray' }}
          placeholder="User can select a schedule before"
          value={scheduleBefore}
          onChange={e => setScheduleBefore(e.target.value)}
        />
        <input
          className="border border-gray-300 bg-white px-2 py-1 text-sm w-16"
          style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray' }}
          value={scheduleBefore}
          onChange={e => setScheduleBefore(e.target.value)}
        />
        <div>Minutes</div>
      </div>

      {/* Disclaimer */}
      <div className="font-semibold mb-2">Disclaimer</div>
      <hr className="my-4 border-gray-300" />
      <textarea
        className="border rounded px-2 py-1 text-sm w-full mb-2"
        placeholder="Enter disclaimer text which will appear on OSR create screen"
        value={disclaimer}
        onChange={e => setDisclaimer(e.target.value)}
        rows={2}
      />
      <div className="text-xs text-gray-600 mb-4">
        The Services include the provision of the Platform that enables you to arrange and schedule different home-based services with independent third-party service provider of those services (“Service Professionals”).
      </div>

      <div className="flex justify-center">
        <button className="bg-[#7991BB] text-white px-8 py-2 rounded ">
          Submit
        </button>
      </div>
    </Card>
  );
};

export default SetRules;
