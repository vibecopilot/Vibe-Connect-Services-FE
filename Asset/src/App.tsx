import React from "react";
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Asset from './pages/Assets';
import AddAssetForm from './forms/AddAssetForm';
import AMCExpiredAssets from "./tabs/Assetmanagement/AMCExpiredAssets";
import AddAMCForm from './forms/AddAMCForm';
import AMCExpired90Days from "./tabs/Assetmanagement/AMCExpiringIn90Days";
import ChecklistTab from "./tabs/Assetmanagement/Checklist";
import Checklistform from "./forms/Checklistform";
import AssociationBtn from "./forms/Associationbtn";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<AssetManagementLayout />}> */}
      <Route>
        <Route index element={<ChecklistTab />} />
        <Route path="assetmanagement" element={<Asset />} />
        <Route path="addasset" element={<AddAssetForm />} />
        <Route path="amcexpiredassets" element={<AMCExpiredAssets />} />
        <Route path="addamc" element={<AddAMCForm onSubmit={() => {}} />} />
        <Route path="addchecklist" element={<Checklistform onSubmit={() => {}} onClose={() => {}} />}/>
        <Route path="checklist/:id/associations" element={<AssociationBtn />} />
        
      </Route>
    </Routes>
  );
}

export default App;
