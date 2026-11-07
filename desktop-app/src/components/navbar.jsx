
import {
  Bell,
  Search,
  UserCircle,
  X,
} from "lucide-react";

import { GiFarmTractor } from "react-icons/gi";

import { NavLink, useNavigate } from "react-router-dom";

import { useState } from "react";


function Navbar() {

  const navigate = useNavigate();


  const [user] = useState(() => {

    const savedUser = localStorage.getItem("user");

    return savedUser ? JSON.parse(savedUser) : null;

  });


  // Search ki value
  const [search, setSearch] = useState("");


  // Search results show/hide
  const [showResults, setShowResults] = useState(false);


  // Role ko display name mein convert karne ke liye
  const getRoleName = (role) => {

    if (role === "admin") {
      return "Administrator";
    }

    if (role === "hr") {
      return "HR Manager";
    }

    return role || "User";

  };


  // Application ke pages
  const pages = [

    {
      name: "Dashboard",
      path: "/dashboard",
      keywords: "dashboard home overview",
    },

    {
      name: "Tractor Management",
      path: "/tractor",
      keywords: "tractor tractors inventory showroom",
    },

    {
      name: "POS",
      path: "/pos",
      keywords: "pos sale selling tractor customer",
    },

    {
      name: "Customers",
      path: "/customers",
      keywords: "customer customers client",
    },

    {
      name: "Employees",
      path: "/employees",
      keywords: "employee employees staff hr",
    },

    {
      name: "Attendance",
      path: "/attendance",
      keywords: "attendance employee present absent",
    },

    {
      name: "Leave Management",
      path: "/leave",
      keywords: "leave employee vacation",
    },

    {
      name: "Salary",
      path: "/salary",
      keywords: "salary payroll employee",
    },

    {
      name: "Payments",
      path: "/payments",
      keywords: "payment payments money amount",
    },

    {
      name: "Invoices",
      path: "/invoices",
      keywords: "invoice invoices billing",
    },

    {
      name: "Reports",
      path: "/reports",
      keywords: "report reports analytics",
    },

    {
      name: "User Management",
      path: "/users",
      keywords: "users user accounts admin",
    },

    {
      name: "Profile",
      path: "/profile",
      keywords: "profile account personal",
    },

    {
      name: "Settings",
      path: "/settings",
      keywords: "settings configuration system",
    },

    {
      name: "Tractor Recommendation",
      path: "/tractor-recommendation",
      keywords: "tractor recommendation agriculture farming",
    },

    {
      name: "Farming Operations",
      path: "/farming-operations",
      keywords: "farming agriculture operation ploughing seeding",
    },

  ];


  // Search ko filter karna
  const filteredPages = pages.filter((page) => {

    const value = search.toLowerCase().trim();

    if (!value) {
      return false;
    }

    return (
      page.name.toLowerCase().includes(value) ||
      page.keywords.toLowerCase().includes(value)
    );

  });


  // Search result par click
  const handleResultClick = (path) => {

    navigate(path);

    setSearch("");

    setShowResults(false);

  };


  return (

    <header
      className="
        fixed
        right-0
        top-0
        z-50
        flex
        h-20
        w-full
        items-center
        justify-between
        border-b
        border-slate-700/60
        bg-gradient-to-r
        from-[#081525]
        via-[#0D1B2E]
        to-[#091625]
        px-6
        shadow-lg
        shadow-slate-950/20
      "
    >


      {/* =====================================================
          LOGO / SHOWROOM NAME
      ====================================================== */}

      <div className="flex items-center gap-3">


        {/* Tractor Icon */}

        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-white/10
            bg-white/10
            shadow-inner
          "
        >

          <GiFarmTractor
            size={30}
            className="text-white"
          />

        </div>


        {/* Showroom Name */}

        <div>

          <h2
            className="
              text-[17px]
              font-bold
              leading-tight
              tracking-wide
              text-white
            "
          >
            Smart Tractor Showroom
          </h2>

          <p
            className="
              mt-0.5
              text-[11px]
              font-medium
              tracking-wide
              text-slate-400
            "
          >
            Management System
          </p>

        </div>

      </div>



      {/* =====================================================
          RIGHT SIDE
      ====================================================== */}

      <div className="flex items-center gap-4">


        {/* =====================================================
            GLOBAL SEARCH
        ====================================================== */}

        <div className="relative">


          {/* Search Icon */}

          <Search
            size={17}
            strokeWidth={2}
            className="
              absolute
              left-3.5
              top-1/2
              -translate-y-1/2
              text-slate-300
            "
          />


          {/* Search Input */}

          <input
            type="text"
            value={search}

            onChange={(e) => {

              setSearch(e.target.value);

              setShowResults(true);

            }}

            onFocus={() => setShowResults(true)}

            placeholder="Search tractors, customers, employees..."

            className="
              h-10
              w-[430px]
              rounded-xl
              border
              border-white/15
              bg-white/10
              py-2
              pl-10
              pr-10
              text-sm
              text-white
              placeholder:text-slate-400
              outline-none
              backdrop-blur-sm
              transition-all
              duration-200

              hover:border-white/25
              hover:bg-white/[0.13]

              focus:border-blue-400/60
              focus:bg-white/[0.13]
              focus:ring-2
              focus:ring-blue-500/20
            "
          />


          {/* Clear Search */}

          {search && (

            <button
              onClick={() => {

                setSearch("");

                setShowResults(false);

              }}

              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                rounded-md
                p-1
                text-slate-400
                transition
                hover:bg-white/10
                hover:text-white
              "
            >

              <X size={16} />

            </button>

          )}



          {/* =================================================
              SEARCH RESULTS
          ================================================== */}

          {showResults && search && (

            <div
              className="
                absolute
                left-0
                top-12
                z-[100]
                w-full
                overflow-hidden
                rounded-xl
                border
                border-slate-200
                bg-white
                shadow-2xl
                shadow-black/20
              "
            >

              {filteredPages.length > 0 ? (

                filteredPages.map((page) => (

                  <button
                    key={page.path}

                    onClick={() =>
                      handleResultClick(page.path)
                    }

                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      border-b
                      border-slate-100
                      px-4
                      py-3
                      text-left
                      text-sm
                      font-medium
                      text-slate-700
                      transition-all
                      duration-150
                      last:border-b-0
                      hover:bg-blue-50
                      hover:text-blue-700
                    "
                  >

                    <div
                      className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-lg
                        bg-slate-100
                      "
                    >

                      <Search
                        size={14}
                        className="text-slate-500"
                      />

                    </div>

                    {page.name}

                  </button>

                ))

              ) : (

                <div className="px-4 py-6 text-center">

                  <Search
                    size={22}
                    className="mx-auto mb-2 text-slate-300"
                  />

                  <p className="text-sm font-medium text-slate-600">
                    No page found
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Try another search
                  </p>

                </div>

              )}

            </div>

          )}

        </div>



        {/* =====================================================
            NOTIFICATION
        ====================================================== */}

        <NavLink
          to="/notification"
          className="
            group
            relative
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-white/10
            bg-white/5
            text-slate-300
            transition-all
            duration-200
            hover:border-white/20
            hover:bg-white/10
            hover:text-white
          "
        >

          <Bell
            size={20}
            strokeWidth={1.9}
            className="
              transition-transform
              duration-200
              group-hover:scale-110
            "
          />


          {/* Notification Badge */}

          <span
            className="
              absolute
              right-1
              top-1
              h-2
              w-2
              rounded-full
              bg-red-500
              ring-2
              ring-[#0D1B2E]
            "
          />

        </NavLink>



        {/* =====================================================
            LOGGED IN USER
        ====================================================== */}

        <NavLink
          to="/profile"
          className="
            group
            flex
            items-center
            gap-2.5
            rounded-xl
            border
            border-transparent
            px-2
            py-1.5
            transition-all
            duration-200
            hover:border-white/10
            hover:bg-white/5
          "
        >


          {/* User Icon */}

          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border-2
              border-white/20
              bg-white/10
            "
          >

            <UserCircle
              size={25}
              strokeWidth={1.7}
              className="text-white"
            />

          </div>


          {/* User Information */}

          <div className="hidden sm:block">

            <p
              className="
                text-sm
                font-semibold
                leading-tight
                text-white
              "
            >
              {user?.name || "User"}
            </p>

            <p
              className="
                mt-0.5
                text-[10px]
                font-medium
                text-slate-400
              "
            >
              {getRoleName(user?.role)}
            </p>

          </div>

        </NavLink>


      </div>

    </header>

  );

}


export default Navbar;

