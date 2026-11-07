import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
 
  LogOut,
} from "lucide-react";// react icon 
import { useState } from "react";

const menuItems = [
  // =========================
  // DASHBOARD
  // =========================
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    roles: ["admin", "hr"],
  },

  // =========================
  // INVENTORY
  // ADMIN ONLY
  // =========================
  {
    name: "Tractors",
    path: "/tractor",
    roles: ["admin"],
  },

  {
    name: "Barcode/QR Code",
    path: "/barcode",
    roles: ["admin"],
  },

  {
    name: "Stock Alert",
    path: "/stockalert",
    roles: ["admin"],
  },

  // =========================
  // CUSTOMERS
  // ADMIN ONLY
  // =========================
  {
    name: "Customers",
    path: "/customers",
    roles: ["admin"],
  },

  {
    name: "Customers360",
    path: "/customers360",
    roles: ["admin"],
  },

  // =========================
  // SALES
  // ADMIN ONLY
  // =========================
  {
    name: "POS",
    path: "/pos",
    roles: ["admin"],
  },

  {
    name: "Billing",
    path: "/billing",
    roles: ["admin"],
  },

  // =========================
  // HR MANAGEMENT
  // ADMIN + HR
  // =========================
  {
    name: "Employees",
    path: "/employees",
    roles: ["admin", "hr"],
  },

  {
    name: "Attendance",
    path: "/attandance",
    roles: ["admin", "hr"],
  },

  {
    name: "Leave",
    path: "/leave",
    roles: ["admin", "hr"],
  },

  {
    name: "Performance",
    path: "/performance",
    roles: ["admin", "hr"],
  },

  // =========================
  // REPORTS
  // =========================
  {
    name: "Sales Reports",
    path: "/salesreport",
    roles: ["admin"],
  },

  {
    name: "Finance Reports",
    path: "/financereports",
    roles: ["admin"],
  },

  {
    name: "HR Reports",
    path: "/hrreport",
    roles: ["admin", "hr"],
  },

  // =========================
  // SYSTEM
  // ADMIN ONLY
  // =========================
  {
    name: "Users",
    path: "/users",
    roles: ["admin"],
  },

  {
    name: "Settings",
    path: "/settings",
    roles: ["admin"],
  },

  // =========================
  // PROFILE
  // BOTH
  // =========================
  {
    name: "Profile",
    path: "/profile",
    roles: ["admin", "hr"],
  },

  // =========================
  // EXTRA FEATURES
  // ADMIN ONLY
  // =========================
  {
    name: "Tractor Recommendation",
    path: "/recomandation",
    roles: ["admin"],
  },

  {
    name: "Notification",
    path: "/notification",
    roles: ["admin", "hr"],
  },
];


function Sidebar() {

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const [openmenu,setOpenmenu]=useState(null);
  return (
    // aside mean html atg that write down as in the side
    <aside className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-60 overflow-y-auto bg-[#0C192A] text-white">

      

      <nav className="p-4">

        <p className="mb-3 px-3 text-xs uppercase tracking-wider text-slate-500">
          Main Menu
        </p>

        <div className="space-y-1">


          {menuItems.map((item) => {
            // check for role includes
            // if current users role= (role) is not allowed ! item.role include not init then return nul;
            if (!item.roles.includes(role)) return null;
            //const Icon = item.icon;// store icon value in icon var;

            return (
              <NavLink
                key={item.path}// unique 
                to={item.path}// path and url will take u to another page 
                className={({ isActive }) =>// if mouseover 
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "text-slate-300 hover:bg-slate-800"
                  }`
                }
              >
               
                {item.name}
              </NavLink>
            );
          })}

        </div>

        <div className="mt-8 border-t border-slate-800 pt-4">

          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-red-400 hover:bg-slate-800">
            <LogOut size={19} />
            Logout
          </button>

        </div>

      </nav>
    </aside>
  );
}

export default Sidebar; 