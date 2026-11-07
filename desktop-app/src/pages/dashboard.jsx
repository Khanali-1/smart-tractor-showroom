import { useEffect, useState } from "react";
import axios from "axios";

import {
  CalendarDays,
  Clock,
  Tractor,
  Users,
  ShoppingCart,
  IndianRupee,
  CreditCard,
  Package,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

// Background image
import tractor from "../assets/tractor.jpg";


// =====================================================
// DASHBOARD
// =====================================================

function Dashboard() {

  // ---------------------------------------------------
  // STATES
  // ---------------------------------------------------

  const [tractors, setTractors] = useState([]);

  const [currentTime, setCurrentTime] = useState(new Date());

  const [loading, setLoading] = useState(true);


  // ---------------------------------------------------
  // GET LOGGED-IN USER
  // ---------------------------------------------------

  const storedUser = localStorage.getItem("user");

  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.log("Invalid user data in localStorage");
  }


  // ---------------------------------------------------
  // LIVE CLOCK
  // ---------------------------------------------------

  useEffect(() => {

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);

  }, []);


  // ---------------------------------------------------
  // FETCH TRACTORS
  // ---------------------------------------------------

  useEffect(() => {

    const getTractors = async () => {

      try {

        const response = await axios.get(
          "http://localhost:5000/api/tractors"
        );

        setTractors(response.data);

      } catch (error) {

        console.log("Error fetching tractors:", error);

      } finally {

        setLoading(false);

      }

    };

    getTractors();

  }, []);


  // ---------------------------------------------------
  // DATE
  // ---------------------------------------------------

  const currentDate = currentTime.toLocaleDateString("en-PK", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });


  // ---------------------------------------------------
  // TIME
  // ---------------------------------------------------

  const formattedTime = currentTime.toLocaleTimeString("en-PK", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });


  // ---------------------------------------------------
  // USER NAME
  // ---------------------------------------------------

  const userName =
    user?.name ||
    user?.username ||
    "Admin";


  // =====================================================
  // DASHBOARD DEMO DATA
  // =====================================================

  // ---------------------------------------------------
  // INVENTORY
  // ---------------------------------------------------

  const inventoryData = [
    {
      name: "In Stock",
      value: 32,
    },
    {
      name: "Low Stock",
      value: 8,
    },
    {
      name: "Sold",
      value: 18,
    },
  ];


  // ---------------------------------------------------
  // PAYMENT
  // ---------------------------------------------------

  const paymentData = [
    {
      name: "Paid",
      value: 65,
    },
    {
      name: "Pending",
      value: 20,
    },
    {
      name: "Installments",
      value: 15,
    },
  ];


  // ---------------------------------------------------
  // ATTENDANCE
  // ---------------------------------------------------

  const attendanceData = [
    {
      day: "Mon",
      Present: 21,
      Late: 2,
      Absent: 1,
    },
    {
      day: "Tue",
      Present: 20,
      Late: 3,
      Absent: 1,
    },
    {
      day: "Wed",
      Present: 23,
      Late: 1,
      Absent: 0,
    },
    {
      day: "Thu",
      Present: 19,
      Late: 3,
      Absent: 2,
    },
    {
      day: "Fri",
      Present: 22,
      Late: 2,
      Absent: 0,
    },
    {
      day: "Sat",
      Present: 18,
      Late: 3,
      Absent: 3,
    },
  ];


  // ---------------------------------------------------
  // TRACTOR BRANDS
  // ---------------------------------------------------

  const brandData = [
    {
      brand: "Massey Ferguson",
      sales: 38,
    },
    {
      brand: "New Holland",
      sales: 31,
    },
    {
      brand: "Al-Ghazi",
      sales: 24,
    },
    {
      brand: "Millat",
      sales: 18,
    },
    {
      brand: "Fiat",
      sales: 12,
    },
  ];


  // ---------------------------------------------------
  // REVENUE & SALES
  // ---------------------------------------------------

  const revenueData = [
    {
      month: "Jan",
      revenue: 12,
      sales: 8,
    },
    {
      month: "Feb",
      revenue: 18,
      sales: 12,
    },
    {
      month: "Mar",
      revenue: 15,
      sales: 10,
    },
    {
      month: "Apr",
      revenue: 24,
      sales: 17,
    },
    {
      month: "May",
      revenue: 20,
      sales: 14,
    },
    {
      month: "Jun",
      revenue: 29,
      sales: 21,
    },
  ];


  // ---------------------------------------------------
  // SALES OVERVIEW
  // ---------------------------------------------------

  const salesOverview = [
    45,
    70,
    55,
    80,
    65,
    90,
    75,
    95,
    60,
    85,
    72,
    100,
  ];


  // ---------------------------------------------------
  // RECENT TRACTOR COLUMNS
  // ---------------------------------------------------

  const tractorColumns = [
    {
      key: "tractor_code",
      label: "Code",
    },
    {
      key: "brand",
      label: "Brand",
    },
    {
      key: "model",
      label: "Model",
    },
    {
      key: "stock_quantity",
      label: "Stock",
    },
  ];


  // =====================================================
  // COLORS
  // =====================================================

  const inventoryColors = [
    "#2563eb",
    "#f59e0b",
    "#ef4444",
  ];

  const paymentColors = [
    "#8b5cf6",
    "#f97316",
    "#06b6d4",
  ];


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="w-full space-y-6">


      {/* =================================================
          WELCOME / HERO SECTION
      ================================================= */}

      <div
        className="relative mb-6 overflow-hidden rounded-2xl bg-cover bg-center shadow-sm"
        style={{
          backgroundImage: `url(${tractor})`,
        }}
      >

        {/* DARK OVERLAY */}

        <div className="absolute inset-0 bg-slate-950/65"></div>


        {/* HERO CONTENT */}

        <div className="relative z-10 flex min-h-[180px] flex-col justify-between p-6 text-white md:p-8">

          <div>

            <p className="mb-2 text-sm font-medium text-white/75">
              Smart Tractor Showroom
            </p>


            <h1 className="text-2xl font-bold md:text-3xl">

              Welcome back, {userName} 👋

            </h1>


            <p className="mt-2 max-w-xl text-sm leading-6 text-white/80">

              It's nice to see you here. Here's what's happening
              across your showroom today.

            </p>

          </div>


          {/* DATE + TIME */}

          <div className="mt-6 flex flex-wrap gap-3">


            {/* DATE */}

            <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 backdrop-blur-sm">

              <CalendarDays size={16} />

              <span className="text-xs font-medium">
                {currentDate}
              </span>

            </div>


            {/* TIME */}

            <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 backdrop-blur-sm">

              <Clock size={16} />

              <span className="text-xs font-medium">
                {formattedTime}
              </span>

            </div>

          </div>

        </div>

      </div>



      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">


        {/* TOTAL TRACTORS */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Total Tractors
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                48
              </h2>

              <p className="mt-1 text-xs text-green-600">
                12 available
              </p>

            </div>


            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">

              <Tractor size={24} />

            </div>

          </div>

        </div>



        {/* CUSTOMERS */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Total Customers
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                326
              </h2>

              <p className="mt-1 text-xs text-green-600">
                +18 this month
              </p>

            </div>


            <div className="rounded-xl bg-purple-100 p-3 text-purple-600">

              <Users size={24} />

            </div>

          </div>

        </div>



        {/* MONTHLY SALES */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Monthly Sales
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                24
              </h2>

              <p className="mt-1 text-xs text-green-600">
                +12% this month
              </p>

            </div>


            <div className="rounded-xl bg-orange-100 p-3 text-orange-600">

              <ShoppingCart size={24} />

            </div>

          </div>

        </div>



        {/* REVENUE */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Monthly Revenue
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                Rs. 28.5M
              </h2>

              <p className="mt-1 text-xs text-green-600">
                +8.4% this month
              </p>

            </div>


            <div className="rounded-xl bg-cyan-100 p-3 text-cyan-600">

              <IndianRupee size={24} />

            </div>

          </div>

        </div>

      </div>



      {/* =================================================
          SALES OVERVIEW + QUICK SUMMARY
      ================================================= */}

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">


        {/* SALES OVERVIEW */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">

          <div className="mb-4">

            <h2 className="text-base font-bold text-slate-800">
              Sales Overview
            </h2>

            <p className="text-xs text-slate-500">
              Monthly sales performance
            </p>

          </div>


          <div className="flex h-48 items-end justify-between gap-2">

            {salesOverview.map((height, index) => (

              <div
                key={index}
                className="flex h-full flex-1 items-end"
              >

                <div
                  className="w-full rounded-t-md bg-blue-500 transition-all duration-300 hover:bg-blue-600"
                  style={{
                    height: `${height}%`,
                  }}
                ></div>

              </div>

            ))}

          </div>


          {/* MONTH LABELS */}

          <div className="mt-2 flex justify-between text-[10px] text-slate-400">

            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>

          </div>

        </div>



        {/* QUICK SUMMARY */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <h2 className="text-base font-bold text-slate-800">
            Quick Summary
          </h2>

          <p className="mb-4 text-xs text-slate-500">
            Today's showroom overview
          </p>


          <div className="space-y-3">


            {/* PENDING PAYMENTS */}

            <div className="flex items-center justify-between rounded-lg bg-orange-50 p-3">

              <div className="flex items-center gap-3">

                <div className="rounded-lg bg-orange-100 p-2 text-orange-600">

                  <CreditCard size={17} />

                </div>

                <span className="text-sm font-medium text-slate-700">
                  Pending Payments
                </span>

              </div>

              <span className="text-sm font-bold text-orange-600">
                Rs. 12.4M
              </span>

            </div>



            {/* AVAILABLE TRACTORS */}

            <div className="flex items-center justify-between rounded-lg bg-blue-50 p-3">

              <div className="flex items-center gap-3">

                <div className="rounded-lg bg-blue-100 p-2 text-blue-600">

                  <Tractor size={17} />

                </div>

                <span className="text-sm font-medium text-slate-700">
                  Available Tractors
                </span>

              </div>

              <span className="text-sm font-bold text-blue-600">
                12
              </span>

            </div>



            {/* EMPLOYEES */}

            <div className="flex items-center justify-between rounded-lg bg-purple-50 p-3">

              <div className="flex items-center gap-3">

                <div className="rounded-lg bg-purple-100 p-2 text-purple-600">

                  <Users size={17} />

                </div>

                <span className="text-sm font-medium text-slate-700">
                  Employees
                </span>

              </div>

              <span className="text-sm font-bold text-purple-600">
                24
              </span>

            </div>



            {/* ATTENDANCE */}

            <div className="flex items-center justify-between rounded-lg bg-green-50 p-3">

              <div className="flex items-center gap-3">

                <div className="rounded-lg bg-green-100 p-2 text-green-600">

                  <Users size={17} />

                </div>

                <span className="text-sm font-medium text-slate-700">
                  Today's Attendance
                </span>

              </div>

              <span className="text-sm font-bold text-green-600">
                21 / 24
              </span>

            </div>

          </div>

        </div>

      </div>



      {/* =================================================
          SMALL CHARTS
      ================================================= */}

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">


        {/* INVENTORY STATUS */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <h2 className="text-base font-bold text-slate-800">
            Tractor Inventory
          </h2>

          <p className="text-xs text-slate-500">
            Current inventory status
          </p>


          <div className="mt-2 h-48">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={inventoryData}
                  cx="50%"
                  cy="45%"
                  innerRadius={45}
                  outerRadius={68}
                  paddingAngle={4}
                  dataKey="value"
                >

                  {inventoryData.map((entry, index) => (

                    <Cell
                      key={`inventory-${index}`}
                      fill={inventoryColors[index]}
                    />

                  ))}

                </Pie>


                <Tooltip />


                <Legend
                  verticalAlign="bottom"
                  height={30}
                  iconSize={8}
                  wrapperStyle={{
                    fontSize: "11px",
                  }}
                />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>



        {/* PAYMENT OVERVIEW */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <h2 className="text-base font-bold text-slate-800">
            Payment Overview
          </h2>

          <p className="text-xs text-slate-500">
            Customer payment status
          </p>


          <div className="mt-2 h-48">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={paymentData}
                  cx="50%"
                  cy="45%"
                  innerRadius={45}
                  outerRadius={68}
                  paddingAngle={4}
                  dataKey="value"
                >

                  {paymentData.map((entry, index) => (

                    <Cell
                      key={`payment-${index}`}
                      fill={paymentColors[index]}
                    />

                  ))}

                </Pie>


                <Tooltip />


                <Legend
                  verticalAlign="bottom"
                  height={30}
                  iconSize={8}
                  wrapperStyle={{
                    fontSize: "11px",
                  }}
                />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>



        {/* ATTENDANCE */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <h2 className="text-base font-bold text-slate-800">
            Employee Attendance
          </h2>

          <p className="text-xs text-slate-500">
            Weekly attendance report
          </p>


          <div className="mt-2 h-48">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={attendanceData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="day"
                  tick={{
                    fontSize: 10,
                  }}
                />

                <YAxis
                  tick={{
                    fontSize: 10,
                  }}
                />

                <Tooltip />


                <Bar
                  dataKey="Present"
                  fill="#2563eb"
                  radius={[3, 3, 0, 0]}
                  barSize={8}
                />

                <Bar
                  dataKey="Late"
                  fill="#f59e0b"
                  radius={[3, 3, 0, 0]}
                  barSize={8}
                />

                <Bar
                  dataKey="Absent"
                  fill="#ef4444"
                  radius={[3, 3, 0, 0]}
                  barSize={8}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>



      {/* =================================================
          BRAND + REVENUE CHARTS
      ================================================= */}

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">


        {/* TOP TRACTOR BRANDS */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <h2 className="text-base font-bold text-slate-800">
            Top Tractor Brands
          </h2>

          <p className="text-xs text-slate-500">
            Sales by tractor brand
          </p>


          <div className="mt-3 h-56">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart
                data={brandData}
                layout="vertical"
                margin={{
                  top: 5,
                  right: 20,
                  left: 10,
                  bottom: 5,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                />

                <XAxis
                  type="number"
                  tick={{
                    fontSize: 10,
                  }}
                />

                <YAxis
                  type="category"
                  dataKey="brand"
                  width={95}
                  tick={{
                    fontSize: 9,
                  }}
                />

                <Tooltip />


                <Bar
                  dataKey="sales"
                  fill="#8b5cf6"
                  radius={[0, 5, 5, 0]}
                  barSize={16}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>



        {/* REVENUE & SALES TREND */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <h2 className="text-base font-bold text-slate-800">
            Revenue & Sales Trend
          </h2>

          <p className="text-xs text-slate-500">
            Monthly showroom performance
          </p>


          <div className="mt-3 h-56">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={revenueData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="month"
                  tick={{
                    fontSize: 10,
                  }}
                />

                <YAxis
                  tick={{
                    fontSize: 10,
                  }}
                />

                <Tooltip />

                <Legend
                  wrapperStyle={{
                    fontSize: "11px",
                  }}
                />


                <Line
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  dot={{
                    r: 3,
                  }}
                />


                <Line
                  type="monotone"
                  dataKey="sales"
                  name="Sales"
                  stroke="#f97316"
                  strokeWidth={3}
                  dot={{
                    r: 3,
                  }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>



      {/* =================================================
          RECENT TRACTORS
      ================================================= */}

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="mb-4 flex items-center justify-between">

          <div>

            <h2 className="text-base font-bold text-slate-800">
              Recent Tractor Inventory
            </h2>

            <p className="text-xs text-slate-500">
              Latest tractors available in showroom
            </p>

          </div>


          <div className="rounded-lg bg-blue-100 p-2 text-blue-600">

            <Package size={18} />

          </div>

        </div>


        {/* LOADING */}

        {loading ? (

          <div className="py-8 text-center text-sm text-slate-500">

            Loading tractor data...

          </div>

        ) : tractors.length === 0 ? (

          <div className="py-8 text-center text-sm text-slate-500">

            No tractor data available.

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-left text-sm">

              <thead>

                <tr className="border-b border-slate-200 text-xs text-slate-500">

                  {tractorColumns.map((column) => (

                    <th
                      key={column.key}
                      className="px-4 py-3 font-medium"
                    >
                      {column.label}
                    </th>

                  ))}

                </tr>

              </thead>


              <tbody>

                {tractors.slice(0, 5).map((tractor) => (

                  <tr
                    key={tractor.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >

                    <td className="px-4 py-3 font-medium text-slate-700">

                      {tractor.tractor_code}

                    </td>


                    <td className="px-4 py-3 text-slate-600">

                      {tractor.brand}

                    </td>


                    <td className="px-4 py-3 text-slate-600">

                      {tractor.model}

                    </td>


                    <td className="px-4 py-3">

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          tractor.stock_quantity <=
                          tractor.low_stock_limit
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >

                        {tractor.stock_quantity}

                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>

  );

}


export default Dashboard;