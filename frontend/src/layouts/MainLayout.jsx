import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-base-200 text-base-content">
      <div className="w-1/5 min-w-[200px] border-r border-base-300 bg-base-100">
        <Sidebar />
      </div>


      <div className="flex-1 flex overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;