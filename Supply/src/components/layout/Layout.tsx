import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => (
  <div className="flex flex-col h-screen">
    <Navbar />
    <div className="flex flex-1 overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
        <Outlet />
      </main>
    </div>
  </div>
);

export default Layout;