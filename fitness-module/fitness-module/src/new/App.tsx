
import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useParams } from "react-router-dom"
import TrainersList from "./pages/TrainersList"
import TrainerForm from "./pages/TrainerForm"

interface Trainer {
  id: string
  firstName: string
  lastName: string
  email: string
  contactNumber: string
  password: string
  speciality: string
  gender: string
  yearsOfExperience: string
  languagesSpoken: string
  modeOfAppointment: string
  availability: string
  affiliatedOrganization: string
  branch: string
  profileImage?: string
  status: boolean
}

function FitnessApp() {
  // Remove default data - start with empty array
  const [trainers, setTrainers] = useState<Trainer[]>([])
  const navigate = useNavigate()

  const handleAddTrainer = () => {
    navigate("/fitness/form")
  }

  const handleViewTrainer = (id: string) => {
    navigate(`/fitness/${id}?mode=view`)
  }

  const handleEditTrainer = (id: string) => {
    navigate(`/fitness/${id}?mode=edit`)
  }

  const handleSaveTrainer = (trainerData: any) => {
    if (trainerData.id) {
      // Update existing trainer
      setTrainers((prev) =>
        prev.map((trainer) => (trainer.id === trainerData.id ? { ...trainerData, status: trainer.status } : trainer)),
      )
    } else {
      // Add new trainer
      const newTrainer: Trainer = {
        ...trainerData,
        id: Date.now().toString(),
        status: true,
      }
      setTrainers((prev) => [...prev, newTrainer])
    }
    navigate("/fitness") // Navigate back to fitness list after saving
  }

  const handleCancel = () => {
    navigate("/fitness")
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/fitness" replace />} />
      <Route
        path="/fitness"
        element={
          <TrainersList
            trainers={trainers}
            onAddTrainer={handleAddTrainer}
            onViewTrainer={handleViewTrainer}
            onEditTrainer={handleEditTrainer}
          />
        }
      />
      <Route path="/fitness/form" element={<TrainerForm onSave={handleSaveTrainer} onCancel={handleCancel} />} />
      <Route
        path="/fitness/:id"
        element={<TrainerDetailPage trainers={trainers} onSave={handleSaveTrainer} onCancel={handleCancel} />}
      />
    </Routes>
  )
}

function TrainerDetailPage({ trainers, onSave, onCancel }: { trainers: Trainer[]; onSave: any; onCancel: any }) {
  const { id } = useParams<{ id: string }>()
  const searchParams = new URLSearchParams(window.location.search)
  const mode = searchParams.get("mode") || "view"

  const trainer = trainers.find((t) => t.id === id)

  if (!trainer) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Trainer not found</h2>
          <button onClick={onCancel} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Back to Trainers List
          </button>
        </div>
      </div>
    )
  }

  if (mode === "view") {
    return <TrainerForm trainer={trainer} onSave={onSave} onCancel={onCancel} isEdit={false} isView={true} />
  }

  return <TrainerForm trainer={trainer} onSave={onSave} onCancel={onCancel} isEdit={true} isView={false} />
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <FitnessApp />
      </div>
    </Router>
  )
}

export default App
