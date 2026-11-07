import axios from "axios";
import { useEffect, useState } from "react";
import {
  Users,
  UserCheck,
  UserX,
  Search,
  Plus,
  Eye,
  X,
} from "lucide-react";

function Employees() {

  // Employees ka data
  const [employees, setEmployees] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error message
  const [error, setError] = useState("");

  // Search input
  const [search, setSearch] = useState("");

  // Add Employee form show/hide
  const [showForm, setShowForm] = useState(false);

  // Selected employee for View
  const [selectedEmployee, setSelectedEmployee] = useState(null);


  // =========================
  // GET EMPLOYEES
  // =========================

  const getEmployees = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await axios.get(
        "http://localhost:5000/api/employees"
      );

      setEmployees(response.data);

    } catch (error) {

      console.log("Error fetching employees:", error);

      setError("Failed to fetch employees");

    } finally {

      setLoading(false);

    }
  };


  // Page load hote hi employees get karo
  useEffect(() => {
    getEmployees();
  }, []);


  // =========================
  // SUMMARY CARDS
  // =========================

  const totalEmployees = employees.length;

  const activeEmployees = employees.filter(
    (employee) => Number(employee.status) === 1
  ).length;

  const inactiveEmployees = employees.filter(
    (employee) => Number(employee.status) === 0
  ).length;


  // =========================
  // SEARCH
  // =========================

  const filteredEmployees = employees.filter((employee) => {

    const searchText = search.toLowerCase();

    return (
      employee.employee_code
        ?.toLowerCase()
        .includes(searchText) ||

      employee.name
        ?.toLowerCase()
        .includes(searchText) ||

      employee.department
        ?.toLowerCase()
        .includes(searchText) ||

      employee.designation
        ?.toLowerCase()
        .includes(searchText) ||

      employee.phone
        ?.toLowerCase()
        .includes(searchText)
    );
  });


  return (

    <div className="w-full space-y-6">

      {/* =========================
          HEADER
      ========================= */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-bold text-slate-800">
            Employee Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage showroom employees and their information
          </p>

        </div>


        {/* ADD EMPLOYEE BUTTON */}

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Employee
        </button>

      </div>


      {/* =========================
          SUMMARY CARDS
      ========================= */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">


        {/* TOTAL */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Total Employees
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                {totalEmployees}
              </h2>

            </div>

            <div className="rounded-lg bg-blue-100 p-3">
              <Users className="text-blue-600" size={24} />
            </div>

          </div>

        </div>


        {/* ACTIVE */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Active Employees
              </p>

              <h2 className="mt-2 text-3xl font-bold text-green-600">
                {activeEmployees}
              </h2>

            </div>

            <div className="rounded-lg bg-green-100 p-3">
              <UserCheck className="text-green-600" size={24} />
            </div>

          </div>

        </div>


        {/* INACTIVE */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Inactive Employees
              </p>

              <h2 className="mt-2 text-3xl font-bold text-red-600">
                {inactiveEmployees}
              </h2>

            </div>

            <div className="rounded-lg bg-red-100 p-3">
              <UserX className="text-red-600" size={24} />
            </div>

          </div>

        </div>

      </div>


      {/* =========================
          SEARCH
      ========================= */}

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

        <div className="relative">

          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search by code, name, department, designation..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

        </div>

      </div>


      {/* =========================
          ERROR
      ========================= */}

      {error && (

        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>

      )}


      {/* =========================
          EMPLOYEE TABLE
      ========================= */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-5 py-4">

          <h2 className="font-semibold text-slate-800">
            Employees
          </h2>

          <p className="text-sm text-slate-500">
            {filteredEmployees.length} employee(s) found
          </p>

        </div>


        {loading ? (

          <div className="p-10 text-center text-slate-500">
            Loading employees...
          </div>

        ) : filteredEmployees.length === 0 ? (

          <div className="p-10 text-center text-slate-500">
            No employees found
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-left text-sm">

              <thead className="bg-slate-50 text-xs uppercase text-slate-500">

                <tr>

                  <th className="px-5 py-4">
                    Employee Code
                  </th>

                  <th className="px-5 py-4">
                    Name
                  </th>

                  <th className="px-5 py-4">
                    Department
                  </th>

                  <th className="px-5 py-4">
                    Designation
                  </th>

                  <th className="px-5 py-4">
                    Phone
                  </th>

                  <th className="px-5 py-4">
                    Salary
                  </th>

                  <th className="px-5 py-4">
                    Status
                  </th>

                  <th className="px-5 py-4">
                    Action
                  </th>

                </tr>

              </thead>


              <tbody className="divide-y divide-slate-100">

                {filteredEmployees.map((employee) => (

                  <tr
                    key={employee.id}
                    className="transition hover:bg-slate-50"
                  >

                    <td className="px-5 py-4 font-medium text-slate-700">
                      {employee.employee_code}
                    </td>


                    <td className="px-5 py-4">

                      <div>

                        <p className="font-medium text-slate-800">
                          {employee.name}
                        </p>

                        <p className="text-xs text-slate-400">
                          {employee.email}
                        </p>

                      </div>

                    </td>


                    <td className="px-5 py-4 text-slate-600">
                      {employee.department}
                    </td>


                    <td className="px-5 py-4 text-slate-600">
                      {employee.designation}
                    </td>


                    <td className="px-5 py-4 text-slate-600">
                      {employee.phone}
                    </td>


                    <td className="px-5 py-4 font-medium text-slate-700">
                      Rs. {Number(employee.basic_salary).toLocaleString()}
                    </td>


                    <td className="px-5 py-4">

                      {Number(employee.status) === 1 ? (

                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                          Active
                        </span>

                      ) : (

                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                          Inactive
                        </span>

                      )}

                    </td>


                    <td className="px-5 py-4">

                      <button
                        onClick={() => setSelectedEmployee(employee)}
                        className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Eye size={15} />
                        View
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* =========================
          ADD EMPLOYEE FORM
      ========================= */}

      {showForm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">

          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-2xl">


            {/* FORM HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 p-5">

              <div>

                <h2 className="text-xl font-bold text-slate-800">
                  Add New Employee
                </h2>

                <p className="text-sm text-slate-500">
                  Enter employee information
                </p>

              </div>


              <button
                onClick={() => setShowForm(false)}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>

            </div>


            {/* FORM */}

            <form className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2">


              {/* Employee Code */}

              <div>

                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Employee Code
                </label>

                <input
                  type="text"
                  placeholder="EMP-0011"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>


              {/* Name */}

              <div>

                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Name
                </label>

                <input
                  type="text"
                  placeholder="Employee name"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>


              {/* Father Name */}

              <div>

                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Father Name
                </label>

                <input
                  type="text"
                  placeholder="Father name"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>


              {/* CNIC */}

              <div>

                <label className="mb-1 block text-sm font-medium text-slate-700">
                  CNIC
                </label>

                <input
                  type="text"
                  placeholder="XXXXX-XXXXXXX-X"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>


              {/* Phone */}

              <div>

                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Phone
                </label>

                <input
                  type="text"
                  placeholder="0300-1234567"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>


              {/* Email */}

              <div>

                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="employee@example.com"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>


              {/* Department */}

              <div>

                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Department
                </label>

                <select
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >

                  <option value="">
                    Select Department
                  </option>

                  <option value="Sales">
                    Sales
                  </option>

                  <option value="Inventory">
                    Inventory
                  </option>

                  <option value="HR">
                    HR
                  </option>

                  <option value="Accounts">
                    Accounts
                  </option>

                  <option value="Service">
                    Service
                  </option>

                  <option value="Administration">
                    Administration
                  </option>

                </select>

              </div>


              {/* Designation */}

              <div>

                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Designation
                </label>

                <input
                  type="text"
                  placeholder="Sales Officer"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>


              {/* Joining Date */}

              <div>

                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Joining Date
                </label>

                <input
                  type="date"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>


              {/* Basic Salary */}

              <div>

                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Basic Salary
                </label>

                <input
                  type="number"
                  placeholder="50000"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>


              {/* Address */}

              <div className="md:col-span-2">

                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Address
                </label>

                <textarea
                  rows="3"
                  placeholder="Employee address"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>


              {/* Buttons */}

              <div className="flex justify-end gap-3 border-t border-slate-200 pt-5 md:col-span-2">

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
                >
                  Save Employee
                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* =========================
          VIEW EMPLOYEE MODAL
      ========================= */}

      {selectedEmployee && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">

          <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl">


            <div className="flex items-center justify-between border-b border-slate-200 p-5">

              <div>

                <h2 className="text-xl font-bold text-slate-800">
                  Employee Details
                </h2>

                <p className="text-sm text-blue-600">
                  {selectedEmployee.employee_code}
                </p>

              </div>


              <button
                onClick={() => setSelectedEmployee(null)}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>

            </div>


            <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2">

              <div>
                <p className="text-xs text-slate-400">Name</p>
                <p className="font-medium text-slate-800">
                  {selectedEmployee.name}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">Father Name</p>
                <p className="font-medium text-slate-800">
                  {selectedEmployee.father_name || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">CNIC</p>
                <p className="font-medium text-slate-800">
                  {selectedEmployee.cnic || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">Phone</p>
                <p className="font-medium text-slate-800">
                  {selectedEmployee.phone || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">Email</p>
                <p className="font-medium text-slate-800">
                  {selectedEmployee.email || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">Department</p>
                <p className="font-medium text-slate-800">
                  {selectedEmployee.department}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">Designation</p>
                <p className="font-medium text-slate-800">
                  {selectedEmployee.designation}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">Basic Salary</p>
                <p className="font-medium text-slate-800">
                  Rs. {Number(selectedEmployee.basic_salary).toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">Joining Date</p>
                <p className="font-medium text-slate-800">
                  {selectedEmployee.joining_date}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">Status</p>

                <p
                  className={
                    Number(selectedEmployee.status) === 1
                      ? "font-medium text-green-600"
                      : "font-medium text-red-600"
                  }
                >

                  {Number(selectedEmployee.status) === 1
                    ? "Active"
                    : "Inactive"}

                </p>

              </div>

              <div className="md:col-span-2">

                <p className="text-xs text-slate-400">
                  Address
                </p>

                <p className="font-medium text-slate-800">
                  {selectedEmployee.address || "-"}
                </p>

              </div>

            </div>


            <div className="border-t border-slate-200 bg-slate-50 p-5 text-right">

              <button
                onClick={() => setSelectedEmployee(null)}
                className="rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-900"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Employees;