import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Layout from "./components/Layout"
import FlightTrainList from "./components/FlightOrTrain/FlightTrainList"
import FlightTrainDetail from "./components/FlightOrTrain/FlightTrainDetail"
import FlightTrainForm from "./components/FlightOrTrain/FlightTrainForm"
import HotelList from "./components/Hotel/HotelList"
import HotelDetail from "./components/Hotel/HotelDetail"
import HotelForm from "./components/Hotel/HotelForm"
import TransportationList from "./components/Transportation/TransportationList"
import CabBusDetail from "./components/Transportation/CabBusDetail"
import CabBusForm from "./components/Transportation/CabBusForm"
import RentalForm from "./components/Transportation/RentalForm"
import ShuttleForm from "./components/Transportation/ShuttleForm"

// Travelling Allowance Components
import AdvanceReimbursementList from "./components/TravellingAllowance/AdvanceReimbursementList"
import AdvanceReimbursementDetail from "./components/TravellingAllowance/AdvanceReimbursementDetail"
import AdvanceReimbursementForm from "./components/TravellingAllowance/AdvanceReimbursementForm"
import DisbursementList from "./components/TravellingAllowance/DisbursementList"
import DisbursementDetail from "./components/TravellingAllowance/DisbursementDetail"
import ExpenseSubmissionList from "./components/TravellingAllowance/ExpenseSubmissionList"
import ExpenseSubmissionDetail from "./components/TravellingAllowance/ExpenseSubmissionDetail"

// Reimbursement Components
import ReimbursementRequestList from "./components/TravellingAllowance/ReimbursementRequestList"
import ReimbursementRequestDetail from "./components/TravellingAllowance/ReimbursementRequestDetail"
import ReimbursementRequestForm from "./components/TravellingAllowance/ReimbursementRequestForm"
import ReimbursementDisbursementList from "./components/TravellingAllowance/ReimbursementDisbursementList"
import ReimbursementDisbursementDetail from "./components/TravellingAllowance/ReimbursementDisbursementDetail"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<FlightTrainList />} />
          <Route path="/flight-train" element={<FlightTrainList />} />
          <Route path="/flight-train/detail/:id" element={<FlightTrainDetail />} />
          <Route path="/flight-train/add" element={<FlightTrainForm />} />
          <Route path="/flight-train/edit/:id" element={<FlightTrainForm />} />
          <Route path="/hotel" element={<HotelList />} />
          <Route path="/hotel/detail/:id" element={<HotelDetail />} />
          <Route path="/hotel/add" element={<HotelForm />} />
          <Route path="/hotel/edit/:id" element={<HotelForm />} />

          {/* Transportation Routes */}
          <Route path="/transportation" element={<TransportationList />} />
          <Route path="/transportation/cab-bus" element={<TransportationList />} />
          <Route path="/transportation/cab-bus/detail/:id" element={<CabBusDetail />} />
          <Route path="/transportation/cab-bus/add" element={<CabBusForm />} />
          <Route path="/transportation/cab-bus/edit/:id" element={<CabBusForm />} />

          <Route path="/transportation/rentals" element={<TransportationList />} />
          <Route path="/transportation/rentals/detail/:id" element={<CabBusDetail />} />
          <Route path="/transportation/rentals/add" element={<RentalForm />} />
          <Route path="/transportation/rentals/edit/:id" element={<RentalForm />} />

          <Route path="/transportation/shuttle" element={<TransportationList />} />
          <Route path="/transportation/shuttle/detail/:id" element={<CabBusDetail />} />
          <Route path="/transportation/shuttle/add" element={<ShuttleForm />} />
          <Route path="/transportation/shuttle/edit/:id" element={<ShuttleForm />} />

          {/* Travelling Allowance Routes - Direct redirects */}
          <Route
            path="/travelling-allowance"
            element={<Navigate to="/travelling-allowance/advance-reimbursements" replace />}
          />

          {/* Advance Reimbursement Routes */}
          <Route path="/travelling-allowance/advance-reimbursements" element={<AdvanceReimbursementList />} />
          <Route
            path="/travelling-allowance/advance-reimbursements/detail/:id"
            element={<AdvanceReimbursementDetail />}
          />
          <Route path="/travelling-allowance/advance-reimbursements/add" element={<AdvanceReimbursementForm />} />
          <Route path="/travelling-allowance/advance-reimbursements/edit/:id" element={<AdvanceReimbursementForm />} />

          {/* Disbursement Routes */}
          <Route path="/travelling-allowance/disbursement" element={<DisbursementList />} />
          <Route path="/travelling-allowance/disbursement/detail/:id" element={<DisbursementDetail />} />

          {/* Expense Submission Routes */}
          <Route path="/travelling-allowance/expense-submission" element={<ExpenseSubmissionList />} />
          <Route path="/travelling-allowance/expense-submission/detail/:id" element={<ExpenseSubmissionDetail />} />

          {/* Reimbursement Routes - Direct redirect */}
          <Route
            path="/travelling-allowance/reimbursement"
            element={<Navigate to="/travelling-allowance/reimbursement/requests" replace />}
          />

          {/* Reimbursement Request Routes */}
          <Route path="/travelling-allowance/reimbursement/requests" element={<ReimbursementRequestList />} />
          <Route
            path="/travelling-allowance/reimbursement/requests/detail/:id"
            element={<ReimbursementRequestDetail />}
          />
          <Route path="/travelling-allowance/reimbursement/requests/add" element={<ReimbursementRequestForm />} />
          <Route path="/travelling-allowance/reimbursement/requests/edit/:id" element={<ReimbursementRequestForm />} />

          {/* Reimbursement Disbursement Routes */}
          <Route path="/travelling-allowance/reimbursement/disbursement" element={<ReimbursementDisbursementList />} />
          <Route
            path="/travelling-allowance/reimbursement/disbursement/detail/:id"
            element={<ReimbursementDisbursementDetail />}
          />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
