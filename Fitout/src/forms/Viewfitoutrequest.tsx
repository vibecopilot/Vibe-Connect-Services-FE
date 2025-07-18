import React, { useState } from 'react';
import CapturePaymentModal from '../components/Modal';
import TableHead from '../components/TopHead'; // Make sure path is correct
import FitoutChecklist from "../tabs/Fitoutchecklist";


const ViewFitoutRequest: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);
  const [isLogsModalOpen, setIsLogsModalOpen] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);


  const [questions, setQuestions] = useState([
    { id: 1, text: 'Demo Question 1' },
    { id: 2, text: 'Demo Question 2' },
  ]);

  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      text: `Demo Question ${questions.length + 1}`,
    };
    setQuestions([...questions, newQuestion]);
  };

  return (
    <div className="p-4 flex flex-col gap-6">
      {/* Fitout Detail Section */}
      <section>
        <div className="bg-gray-300 px-4 py-2 flex justify-between items-center">
          <h3 className="text-sm font-semibold">Fitout Detail</h3>
          <div className="flex gap-2">
            <button
              className="bg-[#4D6FA9] text-white px-3 py-1 rounded text-sm"
              onClick={() => setIsModalOpen(true)}
            >
              Capture Payment
            </button>
            <button className="bg-[#4D6FA9] text-white px-3 py-1 rounded text-sm">Edit</button>
            <button
              className="bg-[#4D6FA9] text-white px-3 py-1 rounded text-sm"
              onClick={() => setIsLogsModalOpen(true)}
            >
              Logs
            </button>
            <button
              className="bg-[#4D6FA9] text-white px-3 py-1 rounded text-sm"
              onClick={() => setIsChecklistModalOpen(true)}
            >
              Checklist
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 text-sm">
          <p>Status - Pending</p>
          <p>ID- 001</p>
          <p>Tower - D</p>
          <p>Flat: 1201</p>
          <p>Created By: Demo</p>
          <p>Requested Date:</p>
          <p>Description:</p>
          <p>Total Amount: 0.00</p>
          <p>Created On: 27/05/2024 6:30 PM</p>
        </div>
      </section>

      {/* Annexure Details Table */}
      <section>
        <h3 className="bg-gray-300 px-2 py-1 text-sm font-semibold flex justify-center">Annexure Details</h3>
        <table className="w-full text-sm border">
          <TableHead
            columns={[
              { label: 'Action' },
              { label: 'Annexure' },
              { label: 'Status' },
              { label: 'Amount' },
              { label: 'Attachments' },
              { label: 'Attachment Count' },
              { label: 'Comments' },
            ]}
          />
          <tbody>
            <tr>
              <td className="p-2 border">-</td>
              <td className="p-2 border">-</td>
              <td className="p-2 border">-</td>
              <td className="p-2 border">-</td>
              <td className="p-2 border">-</td>
              <td className="p-2 border">-</td>
              <td className="p-2 border">-</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Transaction Details Table */}
      <section>
        <h3 className="bg-gray-300 px-2 py-1 text-sm font-semibold flex justify-center">Transaction Details</h3>
        <table className="w-full text-sm border">
          <TableHead
            columns={[
              { label: 'Action' },
              { label: 'Reference No' },
              { label: 'Payment Status' },
              { label: 'Amount Paid' },
              { label: 'Payment Method' },
              { label: 'Payment Mode' },
              { label: 'Paid On' },
              { label: 'Notes' },
              { label: 'Attachments' },
            ]}
          />
          <tbody>
            <tr>
              <td className="p-2 border">-</td>
              <td className="p-2 border">-</td>
              <td className="p-2 border">-</td>
              <td className="p-2 border">-</td>
              <td className="p-2 border">-</td>
              <td className="p-2 border">-</td>
              <td className="p-2 border">-</td>
              <td className="p-2 border">-</td>
              <td className="p-2 border">-</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Violations Table */}
      <section>
        <h3 className="bg-gray-300 px-2 py-1 text-sm font-semibold flex justify-center">Violations</h3>
        <table className="w-full text-sm border">
          <TableHead
            columns={[
              { label: 'Action' },
              { label: 'Description' },
              { label: 'Status' },
              { label: 'Created At' },
              { label: 'Comments' },
            ]}
          />
          <tbody>
            <tr>
              <td className="p-2 border">-</td>
              <td className="p-2 border">-</td>
              <td className="p-2 border">-</td>
              <td className="p-2 border">-</td>
              <td className="p-2 border">-</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Create Button */}
      <div className="flex justify-center">
        <button
  type="button"
  className="bg-[#4D6FA9] text-white px-8 py-2 rounded-md"
  onClick={() => setShowChecklist(true)}
>
  Create
</button>

      </div>
      

      {/* Modals */}
      <CapturePaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Receive Payment"
        content={
          <form className="grid grid-cols-2 gap-4 p-2 text-black">
            <div className="flex flex-col">
              <label>Amount</label>
              <input type="number" className="bg-gray-200 p-1 rounded" value="0.00" readOnly />
            </div>
            <div className="flex flex-col">
              <label>Payment Mode</label>
              <input type="text" className="border p-1 rounded" />
            </div>
            <div className="flex flex-col">
              <label>Cheque/ Transaction No:</label>
              <select className="border p-1 rounded">
                <option>Select Mode</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label>Notes</label>
              <input type="text" className="border p-1 rounded" />
            </div>
            <div className="flex flex-col col-span-2">
              <label>Image</label>
              <input type="file" />
            </div>
          </form>
        }
      />

      <CapturePaymentModal
        isOpen={isChecklistModalOpen}
        onClose={() => setIsChecklistModalOpen(false)}
        title="Checklist"
        showFooter={false}
        content={
          <div className="flex flex-col gap-4 text-sm text-black">
            {questions.map((q, index) => (
              <div key={q.id} className="pb-4 mb-4 border-b last:border-b-0">
                <p className="font-semibold">{`${index + 1}. ${q.text}`}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span>Response:</span>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="radio" name={`response-${q.id}`} value="Yes" className="h-4 w-4" /> Yes
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="radio" name={`response-${q.id}`} value="No" className="h-4 w-4" /> No
                  </label>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <input type="text" placeholder="Comments" className="border p-2 rounded w-full" />
                  <button className="border-2 border-dashed rounded h-10 w-10 flex items-center justify-center text-xl font-bold text-gray-400 hover:bg-gray-100">
                    +
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={addQuestion}
              className="bg-[#7B8FC7] text-white px-4 py-2 rounded-md self-start hover:bg-opacity-90"
            >
              Add New Question
            </button>
            <textarea placeholder="Remarks" className="border p-2 rounded w-full mt-2" rows={3} />
            <div className="flex justify-center mt-4">
              <button type="submit" className="bg-[#7B8FC7] text-white px-8 py-2 rounded-md hover:bg-opacity-90">
                Submit
              </button>
            </div>
          </div>
        }
      />

      <CapturePaymentModal
        isOpen={isLogsModalOpen}
        onClose={() => setIsLogsModalOpen(false)}
        title="Logs"
        showFooter={false}
        content={
          <div className="flex flex-col gap-4 text-sm text-black">
            <div className="flex gap-4 items-start">
              <span className="text-md font-medium whitespace-nowrap">6:58 Pm</span>
              <div className="border rounded p-3 bg-white shadow text-black">
                <p>Fitout Request Created By For Unit</p>
                <p className="font-semibold mt-2">Request Date - 27/02/2025</p>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default ViewFitoutRequest;
