import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-100">

      <Sidebar />

      <Navbar />

      {/* main area of application = knows as main atg  */ }

      <main className="ml-64 pt-20">
         {/* 64 margin from left cuz of side bar took it and pading from top 20 cuz of navbar  */ }
        <div className="p-8 ">
          <Outlet />
            {/* outlet helps to render the react routers like if dhasboard it will be here ain putlet like cenetr 
            of the page  */ }

        </div>
      </main>

    </div>
  );
}

export default DashboardLayout;