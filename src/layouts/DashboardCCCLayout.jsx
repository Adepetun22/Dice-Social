// layouts/DashboardLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/DashboardCCC/layout/Sidebar";
import Header from "../components/DashboardCCC/layout/Header";

const DashboardCCCLayout = ({ children }) => (
  <div className="inline-flex w-full h-[100vh] overflow-y-hidden">
    <Sidebar />
    <main className="w-full">
      <Header />
      <div className="overflow-y-auto h-screen">
        <Outlet />
      </div>
    </main>
  </div>
);

export default DashboardCCCLayout;