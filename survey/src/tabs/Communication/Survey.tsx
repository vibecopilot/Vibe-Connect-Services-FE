import React, { useEffect, useState } from "react";
import { FiEdit, FiEye } from "react-icons/fi";
import TableHead from "../../components/TopHead";
import TopSearch from "../../components/TopSearch";
import IconButton from "../../components/IconButton";
import NoDataFound from "../../components/NoDataFound";
import Pagination from "../../components/Pagination";
import CreateSurvey from "../../forms/CreateSurvey";
import AddSurvey from "../../forms/AddSurvey";
import SurveyViewModal from "../../forms/SurveyViewModal";

interface Question {
  id: string;
  question: string;
  type: string;
}

interface SurveyFormData {
  surveyTitle: string;
  startDate: Date | null;
  endDate: Date | null;
  threadDescription: string;
  questions: Question[];
}

interface SurveyItem {
  id: number;
  surveyName: string;
  startDate: Date | null;
  endDate: Date | null;
  status: boolean;
  responses: {
    current: number;
    total: number;
  };
  threadDescription?: string;
  questions?: Question[];
}

const Survey: React.FC = () => {
  const [data, setData] = useState<SurveyItem[]>([]);
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showAddSurvey, setShowAddSurvey] = useState(false);
  const [editingSurvey, setEditingSurvey] = useState<SurveyItem | null>(null);
  const [viewingSurvey, setViewingSurvey] = useState<SurveyItem | null>(null);
  const [searchFilters, setSearchFilters] = useState({
    surveyName: "",
    startDate: "",
    endDate: "",
    status: "",
    responses: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const generateRandomResponses = () => {
      const total = Math.floor(Math.random() * 21) + 10;
      const current = Math.floor(Math.random() * (total + 1));
      return { current, total };
    };

    setData([
      {
        id: 1,
        surveyName: "Customer Feedback Survey",
        startDate: new Date("2025-01-01"),
        endDate: new Date("2025-01-10"),
        status: true,
        responses: generateRandomResponses(),
        threadDescription: "This survey aims to collect customer feedback about our products and services to improve customer satisfaction.",
        questions: [
          {
            id: "1",
            question: "How satisfied are you with our product?",
            type: "Star"
          },
          {
            id: "2",
            question: "What features would you like to see improved?",
            type: "Multiple choice"
          }
        ]
      },
      {
        id: 2,
        surveyName: "Product Satisfaction Survey",
        startDate: new Date("2025-02-05"),
        endDate: new Date("2025-02-15"),
        status: false,
        responses: generateRandomResponses(),
        threadDescription: "Evaluate customer satisfaction with our new product line and gather insights for future improvements.",
        questions: [
          {
            id: "3",
            question: "Rate the product quality",
            type: "Matrix Rating"
          },
          {
            id: "4",
            question: "Additional comments",
            type: "Comment Box"
          }
        ]
      },
    ]);
  }, []);

  const handleFilterChange = (
    key: keyof typeof searchFilters,
    value: string
  ) => {
    setSearchFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveSurvey = (surveyData: SurveyFormData) => {
    if (editingSurvey) {
      // Update existing survey
      setData((prev) =>
        prev.map((item) =>
          item.id === editingSurvey.id
            ? {
                ...item,
                surveyName: surveyData.surveyTitle,
                startDate: surveyData.startDate,
                endDate: surveyData.endDate,
                threadDescription: surveyData.threadDescription,
                questions: surveyData.questions,
              }
            : item
        )
      );
      setEditingSurvey(null);
    } else {
      // Create new survey
      const newSurvey: SurveyItem = {
        id: Date.now(),
        surveyName: surveyData.surveyTitle,
        startDate: surveyData.startDate,
        endDate: surveyData.endDate,
        status: true,
        responses: { current: 0, total: 0 },
        threadDescription: surveyData.threadDescription,
        questions: surveyData.questions,
      };
      setData((prev) => [...prev, newSurvey]);
    }
    setShowAddSurvey(false);
  };

  const handleEditSurvey = (survey: SurveyItem) => {
    setEditingSurvey(survey);
    setShowAddSurvey(true);
  };

  const handleViewSurvey = (survey: SurveyItem) => {
    setViewingSurvey(survey);
  };

  const getEditData = (): SurveyFormData | undefined => {
    if (!editingSurvey) return undefined;
    return {
      surveyTitle: editingSurvey.surveyName,
      startDate: editingSurvey.startDate,
      endDate: editingSurvey.endDate,
      threadDescription: editingSurvey.threadDescription || "",
      questions: editingSurvey.questions || [],
    };
  };

  const filteredData = data.filter((item) =>
    Object.entries(searchFilters).every(([key, val]) => {
      if (!val) return true;

      if ((key === "startDate" || key === "endDate") && item[key as keyof SurveyItem]) {
        const date = (item[key as keyof SurveyItem] as Date).toISOString().slice(0, 10);
        return date === val;
      }

      if (key === "status") {
        if (val === "active") return item.status === true;
        if (val === "inactive") return item.status === false;
        return true;
      }

      if (key === "responses") {
        const resString = `${item.responses.current}/${item.responses.total}`;
        return resString.includes(val);
      }

      const field = item[key as keyof SurveyItem];
      if (field === null || field === undefined) return false;
      return field.toString().toLowerCase().includes(val.toLowerCase());
    })
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    { label: "Actions", align: "center" },
    { label: "Survey Name" },
    { label: "Start Date" },
    { label: "End Date" },
    { label: "Number of Responses", align: "center" },
    { label: "Status", align: "center" },
  ];

  // Handle back navigation
  const handleBack = () => {
    if (showAddSurvey) {
      setShowAddSurvey(false);
      setEditingSurvey(null);
    } else if (showCreateForm) {
      setShowCreateForm(false);
    }
  };

  const handleStartFromScratch = () => {
    setShowCreateForm(false);
    setShowAddSurvey(true);
  };

  return (
    <div className="p-4">
      {showAddSurvey ? (
        <AddSurvey
          onBack={handleBack}
          onSave={handleSaveSurvey}
          editData={getEditData()}
        />
      ) : showCreateForm ? (
        <CreateSurvey
          onBack={handleBack}
          onStartFromScratch={handleStartFromScratch}
        />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <TopSearch
              onSearch={() => setShowFilterRow((prev) => !prev)}
              onButtonClick={() => setShowCreateForm(true)}
              buttons={["Add Survey"]}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredData.length / itemsPerPage) || 1}
              totalItems={filteredData.length}
              onPageChange={setCurrentPage}
            />
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="min-w-full table-auto">
              <TableHead columns={columns} />
              <tbody>
                {showFilterRow && (
                  <tr>
                    <td className="p-2 border-b border-gray-400 text-center" />
                    <td className="p-2 border-b border-gray-400">
                      <input
                        name="surveyName"
                        value={searchFilters.surveyName}
                        onChange={(e) => handleFilterChange("surveyName", e.target.value)}
                        placeholder="Filter Survey Name"
                        className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                      />
                    </td>
                    <td className="p-2 border-b border-gray-400">
                      <input
                        name="startDate"
                        type="date"
                        value={searchFilters.startDate}
                        onChange={(e) => handleFilterChange("startDate", e.target.value)}
                        className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                      />
                    </td>
                    <td className="p-2 border-b border-gray-400">
                      <input
                        name="endDate"
                        type="date"
                        value={searchFilters.endDate}
                        onChange={(e) => handleFilterChange("endDate", e.target.value)}
                        className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                      />
                    </td>
                    <td className="p-2 border-b border-gray-400 text-center">
                      <input
                        name="responses"
                        value={searchFilters.responses}
                        onChange={(e) => handleFilterChange("responses", e.target.value)}
                        placeholder="Filter (e.g. 3/10)"
                        className="w-full px-2 py-1 text-sm border rounded border-gray-300 text-center"
                      />
                    </td>
                    <td className="p-2 border-b border-gray-400 text-center">
                      <select
                        name="status"
                        value={searchFilters.status}
                        onChange={(e) => handleFilterChange("status", e.target.value)}
                        className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                      >
                        <option value="">All</option>
                        <option value="active">Open</option>
                        <option value="inactive">Close</option>
                      </select>
                    </td>
                  </tr>
                )}

                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={6}>
                      <NoDataFound />
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-100">
                      <td className="p-3 border-b border-gray-400 text-center space-x-3">
                        <IconButton 
                          tooltip="View" 
                          className="hover:text-blue-600"
                          onClick={() => handleViewSurvey(item)}
                        >
                          <FiEye />
                        </IconButton>
                        <IconButton 
                          tooltip="Edit" 
                          className="hover:text-green-600"
                          onClick={() => handleEditSurvey(item)}
                        >
                          <FiEdit />
                        </IconButton>
                      </td>
                      <td className="p-2 border-b border-gray-400">{item.surveyName}</td>
                      <td className="p-2 border-b border-gray-400">
                        {item.startDate?.toLocaleDateString("en-US")}
                      </td>
                      <td className="p-2 border-b border-gray-400">
                        {item.endDate?.toLocaleDateString("en-US")}
                      </td>
                      <td className="p-2 border-b border-gray-400 text-center">
                        {item.responses.current}/{item.responses.total}
                      </td>
                      <td className="p-2 border-b border-gray-400 text-center">
                        {item.status ? "Open" : "Close"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Survey View Modal with Blurred Background */}
          {viewingSurvey && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              {/* Blurred Backdrop */}
              <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setViewingSurvey(null)}
              />
              
              {/* Modal Content */}
              <div className="relative z-10 max-w-4xl w-full mx-4">
                <SurveyViewModal
                  survey={viewingSurvey}
                  isOpen={!!viewingSurvey}
                  onClose={() => setViewingSurvey(null)}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Survey;