import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Tractor,
  Users,
  ShoppingCart,
  CreditCard,
  UserRound,
  ClipboardCheck,
  LogOut,
} from "lucide-react";// react icon 

const menuItems = [// array of objects write ur icons data 
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Tractors",
    path: "/tractors",
    icon: Tractor,
  },
  {
    name: "Customers",
    path: "/customers",
    icon: Users,
  },
  {
    name: "Sales / POS",
    path: "/sales",
    icon: ShoppingCart,
  },
  {
    name: "Payments",
    path: "/payments",
    icon: CreditCard,
  },
  {
    name: "Employees",
    path: "/employees",
    icon: UserRound,
  },
  {
    name: "Attendance",
    path: "/attendance",
    icon: ClipboardCheck,
  },
];

function Sidebar() {
  return (
    // aside mean html atg that write down as in the side
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-950 text-white">

      <div className="flex h-20 items-center gap-3 border-b border-slate-800 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600">
          <Tractor size={23} />
        </div>

        <div>
          <h1 className="font-bold">Smart Tractor</h1>
          <p className="text-xs text-slate-400">Showroom System</p>
        </div>
      </div>

      <nav className="p-4">

        <p className="mb-3 px-3 text-xs uppercase tracking-wider text-slate-500">
          Main Menu
        </p>

        <div className="space-y-1">


          {menuItems.map((item) => {
            const Icon = item.icon;// store icon value in icon var;

            return (
              <NavLink
                key={item.path}// unique 
                to={item.path}// path and url will take u to another page 
                className={({ isActive }) =>// if mouseover 
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                    isActive
                      ? "bg-green-600 text-white"
                      : "text-slate-300 hover:bg-slate-800"
                  }`
                }
              >
                <Icon size={19} />
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