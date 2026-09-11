import {
  Tractor,
  Users,
  ShoppingCart,
  CreditCard,
  TrendingUp,
} from "lucide-react";

import Card from "../components/card";
import Table from "../components/table";

function Dashboard() {
  const recentSales = [
    {
      invoice: "#INV-001",
      customer: "Ali Ahmed",
      tractor: "MF 385",
      amount: "Rs. 5,200,000",
      status: "Completed",
    },
    {
      invoice: "#INV-002",
      customer: "Muhammad Asif",
      tractor: "MF 240",
      amount: "Rs. 3,800,000",
      status: "Pending",
    },
    {
      invoice: "#INV-003",
      customer: "Ahmed Khan",
      tractor: "NH 480",
      amount: "Rs. 4,500,000",
      status: "Completed",
    },
  ];

  const columns = [
    { key: "invoice", label: "Invoice" },
    { key: "customer", label: "Customer" },
    { key: "tractor", label: "Tractor" },
    { key: "amount", label: "Amount" },
    { key: "status", label: "Status" },
  ];

  return (
    <div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Welcome back, Admin
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <Card
          title="Total Tractors"
          value="48"
          description="12 available"
          icon={<Tractor size={24} />}
        />

        <Card
          title="Total Customers"
          value="326"
          description="+18 this month"
          icon={<Users size={24} />}
        />

        <Card
          title="Monthly Sales"
          value="24"
          description="+12% from last month"
          icon={<ShoppingCart size={24} />}
        />

        <Card
          title="Monthly Revenue"
          value="Rs. 28.5M"
          description="+8.4% from last month"
          icon={<CreditCard size={24} />}
        />

      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-3">

        <div className="rounded-xl border bg-white p-6 xl:col-span-2">

          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-bold">Sales Overview</h2>
              <p className="text-sm text-slate-500">
                Monthly sales performance
              </p>
            </div>

            <TrendingUp className="text-green-600" />
          </div>

          <div className="flex h-64 items-end justify-between gap-3">

            {[45, 70, 55, 80, 65, 90, 75, 95, 60, 85, 72, 100].map(
              (height, index) => (
                <div
                  key={index}
                  className="w-full rounded-t-lg bg-green-500"
                  style={{ height: `${height}%` }}
                />
              )
            )}

          </div>

          <div className="mt-3 flex justify-between text-xs text-slate-400">
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

        <div className="rounded-xl border bg-white p-6">

          <h2 className="font-bold">Quick Summary</h2>

          <div className="mt-5 space-y-5">

            <div className="flex justify-between">
              <span className="text-sm text-slate-500">
                Pending Payments
              </span>
              <b>Rs. 12.4M</b>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-slate-500">
                Available Tractors
              </span>
              <b>12</b>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-slate-500">
                Employees
              </span>
              <b>24</b>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-slate-500">
                Today's Attendance
              </span>
              <b>21 / 24</b>
            </div>

          </div>

        </div>

      </div>

      <div className="mt-8">

        <div className="mb-4">
          <h2 className="text-lg font-bold">Recent Sales</h2>
          <p className="text-sm text-slate-500">
            Latest showroom transactions
          </p>
        </div>

        <Table columns={columns} data={recentSales} />

      </div>

    </div>
  );
}

export default Dashboard;