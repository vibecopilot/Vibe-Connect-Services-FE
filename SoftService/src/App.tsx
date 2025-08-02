// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import './App.css';
import SoftService from './pages/SoftService';
import AddServiceForm from './forms/addserviceform';
import Checklist from './tabs/Checklist';
import Checklistform from './forms/checklistform'
import EditFormChecklist from './forms/editformchecklist';

function App() {
  return (
    <>

      <Routes>
    
          
         <Route path='/addservice' element={<AddServiceForm/>}/>
        <Route path="/softservice" element={<SoftService />} />
         <Route path="/checklist" element={<Checklist/>} />
         <Route path="/checklistform" element={<Checklistform/>} />
         <Route path="/checklist/view/:id" element={<Checklistform />} />
         <Route path="/checklist/edit/:id" element={<EditFormChecklist />} />
      </Routes>
    </>
  );
}

export default App;
