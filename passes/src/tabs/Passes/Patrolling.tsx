import React, { useRef, useState } from "react";
import { FiEdit, FiEye} from "react-icons/fi";
import TableHead from "../../components/TopHead";
import TopBar from "../../components/TopBar";
import IconButton from "../../components/IconButton";
import Modal from "../../components/Modal";
import Pagination from "../../components/Pagination";
import NoDataFound from "../../components/NoDataFound";
import type { GeneralFormHandle } from "../../forms/GeneralForm";
import GeneralForm from "../../forms/GeneralForm";
import ChecklistForm from "../../forms/ChecklistForm";
import ToggleSwitch from "../../components/ToggleSwitch";

interface Checklist {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  frequency: string;
  priorityLevel: string;
  groups: number;
  associations: string;
}

interface PatrolItem {
  id: number;
  name: string;
  type: string;
  status: string;
  createdOn: string;
  createdBy: string;
}

const Patrolling: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastClickedButton, setLastClickedButton] = useState("");
  const [showChecklist, setShowChecklist] = useState(false);
  const [checklists, setChecklists] = useState<Checklist[]>([
    {
      id: 1,
      name: "Checklist",
      startDate: "2025-05-01",
      endDate: "2025-05-31",
      frequency: "Daily",
      priorityLevel: "High",
      groups: 2,
      associations: "Associations",
    },
    {
      id: 2,
      name: "User",
      startDate: "2025-05-05",
      endDate: "2025-06-05",
      frequency: "Half yearly",
      priorityLevel: "Medium",
      groups: 2,
      associations: "Associations",
    },{
      id: 3,
      name: "Test",
      startDate: "2025-05-05",
      endDate: "2025-06-05",
      frequency: "Daily",
      priorityLevel: "Akshat Shrawat",
      groups: 2,
      associations: "Associations",
    }
  ]);

  const [patrolItems, setPatrolItems] = useState<PatrolItem[]>([
    {
      id: 101,
      name: "Morning Patrol",
      type: "Foot",
      status: "Active",
      createdOn: "23 May 2025",
      createdBy: "Admin",
    },
    {
      id: 102,
      name: "Night Surveillance",
      type: "Vehicle",
      status: "Inactive",
      createdOn: "21 May 2025",
      createdBy: "Supervisor",
    },
  ]);

  const [currentView, setCurrentView] = useState<"checklists" | "patrols">("patrols");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = 20;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const generalFormRef = useRef<GeneralFormHandle>(null);
  const [activeItemId, setActiveItemId] = useState<number | null>(null);

  const patrolColumns = [
    { label: "Actions", align: "center"},
    { label: "Name", align: "center"},
    { label: "Type", align: "center"},
    { label: "Status", align: "center"},
    { label: "Created On", align: "center"},
    { label: "Created By", align: "center"},
    { label: "Active", align: "center"}
  ];

  const checklistColumns = [
    { label: "Actions", align: "center" },
    { label: "Name", align: "center"},
    { label: "Start Date", align: "center"},
    { label: "End Date", align: "center"},
    { label: "Groups", align: "center"},
    { label: "Frequency", align: "center"},
    { label: "Priority", align: "center"},
    { label: "Associations", align: "center"},
  ];

  const filteredData =
    currentView === "patrols"
      ? patrolItems.filter(item =>
          Object.values(item).some(value =>
            String(value).toLowerCase().includes(searchValue.toLowerCase())
          )
        )
      : checklists.filter(item =>
          Object.values(item).some(value =>
            String(value).toLowerCase().includes(searchValue.toLowerCase())
          )
        );

  const handleButtonClick = (type: string) => {
    if (type === "Add Checklist") {
      setCurrentView("checklists");
      setShowChecklist(true);
    } else {
      setCurrentView("patrols");
      setLastClickedButton(type);
      setIsModalOpen(true);
    }
  };

  const handleChecklistSubmit = (checklistData: any) => {
    const newChecklist: Checklist = {
      id: Date.now(),
      name: checklistData.name,
      startDate: checklistData.startDate,
      endDate: checklistData.endDate,
      frequency: checklistData.frequency,
      priorityLevel: "High",
      groups: 2,
      associations: "Associations",
    };
    setChecklists([...checklists, newChecklist]);
    setShowChecklist(false);
  };

  const handleDelete = (id: number) => {
    if (currentView === "patrols") {
      setPatrolItems(patrolItems.filter(item => item.id !== id));
      if (activeItemId === id) setActiveItemId(null);
    } else {
      setChecklists(checklists.filter(c => c.id !== id));
    }
  };

  const handleModalConfirm = () => {
    if (generalFormRef.current) {
      const payload = generalFormRef.current.getPayload();
      if (!payload) return;

      if (lastClickedButton === "Add Patrolling") {
        const newItem: PatrolItem = {
          id: Date.now(),
          name: payload.name || "Unnamed Patrol",
          type: payload.type || "General",
          status: "Active",
          createdOn: new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          createdBy: "System",
        };
        setPatrolItems([...patrolItems, newItem]);
      }
      setIsModalOpen(false);
      setLastClickedButton("");
    }
  };

  return (
    <div className="text-[#5E5E5E]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-1">
        <TopBar
          onSearch={setSearchValue}
          onButtonClick={handleButtonClick}
          buttons={["Add Patrolling", "Add Checklist"]}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          onPageChange={setCurrentPage}
          showControls={true}
        />
      </div>

      {showChecklist && (
        <div className="mb-6 p-4">
          <h2 className="text-xl font-semibold mb-4 text-[#5E5E5E]">New Checklist</h2>
          <ChecklistForm
            onCancel={() => setShowChecklist(false)}
            onSubmit={handleChecklistSubmit}
          />
        </div>
      )}

      {!showChecklist && (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200 text-[#5E5E5E]">
            <TableHead columns={currentView === "patrols" ? patrolColumns : checklistColumns} />
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-3 border-b border-gray-200 text-center space-x-3">
                      <IconButton tooltip="View">
                        <FiEye/>
                      </IconButton>
                      <IconButton tooltip="Edit">
                        <FiEdit />
                      </IconButton>
                    </td>

                    {currentView === "patrols" ? (
                      <>
                        <td className="p-3 border-b border-gray-200 text-center">{(item as PatrolItem).name}</td>
                        <td className="p-3 border-b border-gray-200 text-center">{(item as PatrolItem).type}</td>
                        <td className="p-3 border-b border-gray-200 text-center">{(item as PatrolItem).status}</td>
                        <td className="p-3 border-b border-gray-200 text-center">{(item as PatrolItem).createdOn}</td>
                        <td className="p-3 border-b border-gray-200 text-center">{(item as PatrolItem).createdBy}</td>
                        <td className="p-3 border-b border-gray-200 flex justify-center">
                          <ToggleSwitch
                            isOn={activeItemId === item.id}
                            handleToggle={() =>
                              setActiveItemId(activeItemId === item.id ? null : item.id)
                            }
                          />
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-3 border-b border-gray-200 text-center">{(item as Checklist).name}</td>
                        <td className="p-3 border-b border-gray-200 text-center">{(item as Checklist).startDate}</td>
                        <td className="p-3 border-b border-gray-200 text-center">{(item as Checklist).endDate}</td>
                        <td className="p-3 border-b border-gray-200 text-center">{(item as Checklist).groups}</td>
                        <td className="p-3 border-b border-gray-200 text-center">{(item as Checklist).frequency}</td>
                        <td className="p-3 border-b border-gray-200 text-center">{(item as Checklist).priorityLevel}</td>
                        <td className="p-3 border-b border-gray-200 flex justify-center">
                          <span className="inline-block px-5 py-1 bg-[#7991BB] text-white rounded-md">
                            {(item as Checklist).associations}
                          </span>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={currentView === "patrols" ? 7 : 8}
                    className="text-center py-4 text-[#5E5E5E]"
                  >
                    <NoDataFound />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={<span className="text-[#5E5E5E]">{lastClickedButton || "Modal"}</span>}
        content={<GeneralForm ref={generalFormRef} />}
        onConfirm={handleModalConfirm}
        confirmButtonClassName="w-full bg-[#7991BB] text-white rounded hover:bg-[#6a82b0] py-2"
        confirmText="Submit"
        width="max-w-sm"
      />
    </div>
  );
};

export default Patrolling;
