import React, { useState } from "react";
import TopBar from "../../components/TopBar";
import TableHead from "../../components/TopHead";
import IconButton from "../../components/IconButton";
import NoDataFound from "../../components/NoDataFound";
import Pagination from "../../components/Pagination";
import { FiEye, FiTrash2 } from "react-icons/fi";
import TopSearch from "../../components/TopSearch";
import TextInput from "../../components/TextInput";

// Chat item type definition
interface ChatItem {
  id: number;
  vendorName: string;
}

// Initial data for the chat table
const INITIAL_DATA: ChatItem[] = [
  { id: 1, vendorName: "Vendor 1" },
  { id: 2, vendorName: "Vendor 2" },
];

// Chat window component for a selected vendor
const ChatWindow: React.FC<{
  onBack: () => void;
  vendor: ChatItem;
}> = ({ onBack, vendor }) => {
  // State for chat messages and input
  const [messages, setMessages] = useState([
    { from: "vendor", text: "Vendor Request" },
    { from: "me", text: "How can i help you?" },
  ]);
  const [input, setInput] = useState("");

  // Handle sending a new message
  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { from: "me", text: input }]);
      setInput("");
    }
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md flex h-[600px]" style={{ fontFamily: "'PT Sans', sans-serif" }}>
      {/* Sidebar with vendors */}
      <div className="w-1/4 border-r pr-2 flex flex-col gap-2">
        {[{ id: 1, vendorName: "Vendor 1" }, { id: 2, vendorName: "Vendor 2" }].map((v) => (
          <div
            key={v.id}
            className={`flex items-center gap-3 px-4 py-3 rounded cursor-pointer ${
              v.id === vendor.id ? "bg-[#7991BB] text-white" : "bg-gray-100 text-gray-500"
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-white border" />
            <span className="font-medium">{v.vendorName}</span>
          </div>
        ))}
      </div>
      {/* Chat area */}
      <div className="flex-1 flex flex-col pl-6">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-6">
          {messages.map((msg, idx) =>
            msg.from === "vendor" ? (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-300" />
                <div className="bg-white border rounded-l-none rounded-2xl px-8 py-4 text-gray-600 border-gray-300">
                  {msg.text}
                </div>
              </div>
            ) : (
              <div key={idx} className="flex items-center gap-3 justify-end">
                <div className="bg-white border rounded-r-none rounded-2xl px-8 py-4 text-gray-600 border-gray-300">
                  {msg.text}
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-300" />
              </div>
            )
          )}
        </div>
        {/* Input area for sending messages */}
        <div className="flex items-center border-t pt-4 gap-2">
          <button
            className="text-2xl px-2"
            tabIndex={-1}
            aria-label="Emoji"
            type="button"
          >
            😊
          </button>
          <input
            className="flex-1 border rounded px-4 py-2"
            placeholder="Message......"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            className="text-xl px-2"
            tabIndex={-1}
            aria-label="Attachment"
            type="button"
          >
            {/* Attachment icon */}
            <svg width="20" height="20" fill="none">
              <path
                d="M17 13.5V7.5C17 4.46243 14.5376 2 11.5 2C8.46243 2 6 4.46243 6 7.5V15C6 16.6569 7.34315 18 9 18C10.6569 18 12 16.6569 12 15V8.5C12 7.67157 11.3284 7 10.5 7C9.67157 7 9 7.67157 9 8.5V15"
                stroke="#888"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className="bg-[#7991BB] text-white px-6 py-2 rounded hover:bg-[#5a6e99] transition"
            onClick={handleSend}
            type="button"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

const PAGE_SIZE = 5;

// Main Communication component
const Communication: React.FC = () => {
  // State for chat data, search, pagination, and active chat
  const [data, setData] = useState<ChatItem[]>(INITIAL_DATA);
  const [searchValue, setSearchValue] = useState("");
  const [activeChat, setActiveChat] = useState<ChatItem | null>(null);
  const [page, setPage] = useState(1);
  // Column-wise search state
  const [filterRowVisible, setFilterRowVisible] = useState(false);
  const [columnFilters, setColumnFilters] = useState({
    vendorName: "",
  });

  // Filter chat data based on search value and column filters
  const filteredData = data.filter((item) => {
    const matchesGlobal = item.vendorName.toLowerCase().includes(searchValue.toLowerCase());
    const matchesColumns = item.vendorName.toLowerCase().includes(columnFilters.vendorName.toLowerCase());
    return matchesGlobal && matchesColumns;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const paginatedData = filteredData.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // Delete a chat item
  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      {/* Show chat table or chat window based on activeChat */}
      {!activeChat ? (
        <>
          {/* Top bar with search and add button */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="flex flex-1 items-center gap-4">
              <TopSearch
                onSearch={() => setFilterRowVisible((v) => !v)}
                onButtonClick={() => setActiveChat(data[0])}
                buttons={["Add New Chat"]}
              />
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                totalItems={filteredData.length}
                onPageChange={setPage}
                showControls={true}
                className="ml-auto"
              />
            </div>
          </div>
          {/* Chat table */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-200">
              <TableHead
                columns={[
                  { label: "Action" },
                  { label: "Vendor Name" },
                ]}
              />
              {/* Filter row for column-wise search */}
              {filterRowVisible && (
                <tbody>
                  <tr>
                    <td></td>
                    <td>
                      <TextInput
                        label=""
                        name="vendorName"
                        value={columnFilters.vendorName}
                        onChange={(e) => setColumnFilters((prev) => ({ ...prev, vendorName: e.target.value }))}
                        type="search"
                      />
                    </td>
                  </tr>
                </tbody>
              )}
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="p-3 border-b">
                        <span className="inline-flex items-center gap-2">
                          <IconButton tooltip="View" onClick={() => setActiveChat(item)}>
                            <FiEye />
                          </IconButton>
                          <IconButton tooltip="Delete" onClick={() => handleDelete(item.id)}>
                            <FiTrash2 />
                          </IconButton>
                        </span>
                      </td>
                      <td className="p-3 border-b">{item.vendorName}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="text-center py-4 text-gray-500">
                      <NoDataFound />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        // Show chat window for selected vendor
        <ChatWindow onBack={() => setActiveChat(null)} vendor={activeChat} />
      )}
    </div>
  );
};

export default Communication;