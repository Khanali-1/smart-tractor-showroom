import { useEffect, useState } from "react";
import axios from "axios";

const Leave = () => {

  const [leaves, setLeaves] = useState([]);

  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    employee_id: "",
    leave_type: "Casual",
    start_date: "",
    end_date: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);


  // GET LEAVES
  const getLeaves = async () => {
    try {

      const response = await axios.get(
        "http://localhost:5000/api/leaves"
      );

      setLeaves(response.data);

    } catch (error) {

      console.log("Error getting leaves:", error);

    }
  };


  // GET EMPLOYEES
  const getEmployees = async () => {
    try {

      const response = await axios.get(
        "http://localhost:5000/api/employees"
      );

      setEmployees(response.data);

    } catch (error) {

      console.log("Error getting employees:", error);

    }
  };


  useEffect(() => {

    getLeaves();
    getEmployees();

  }, []);


  // INPUT CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  // SUBMIT LEAVE
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/leaves",
        formData
      );

      alert("Leave request submitted successfully");

      setFormData({
        employee_id: "",
        leave_type: "Casual",
        start_date: "",
        end_date: "",
        reason: "",
      });

      getLeaves();

    } catch (error) {

      console.log("Error submitting leave:", error);

      alert("Failed to submit leave");

    } finally {

      setLoading(false);

    }
  };


  // UPDATE STATUS
  const updateStatus = async (id, status) => {

    try {

      await axios.put(
        `http://localhost:5000/api/leaves/${id}/status`,
        {
          status,
        }
      );

      getLeaves();

    } catch (error) {

      console.log("Error updating status:", error);

    }
  };


  return (
    <div className="w-full space-y-6">

      {/* =========================
          HEADER
      ========================= */}

      <div>

        <h1 className="text-2xl font-bold text-slate-800">
          Leave Management
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage employee leave requests
        </p>

      </div>


      {/* =========================
          LEAVE FORM
      ========================= */}

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-5 border-b border-slate-200 pb-4">

          <h2 className="text-lg font-semibold text-slate-800">
            Apply for Leave
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Submit a leave request for an employee
          </p>

        </div>


        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >

          {/* EMPLOYEE */}

          <div>

            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Employee
            </label>

            <select
              name="employee_id"
              value={formData.employee_id}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >

              <option value="">
                Select Employee
              </option>

              {employees.map((employee) => (

                <option
                  key={employee.id}
                  value={employee.id}
                >
                  {employee.employee_code} - {employee.name}
                </option>

              ))}

            </select>

          </div>


          {/* LEAVE TYPE */}

          <div>

            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Leave Type
            </label>

            <select
              name="leave_type"
              value={formData.leave_type}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >

              <option value="Casual">
                Casual Leave
              </option>

              <option value="Sick">
                Sick Leave
              </option>

              <option value="Annual">
                Annual Leave
              </option>

              <option value="Emergency">
                Emergency Leave
              </option>

            </select>

          </div>


          {/* START DATE */}

          <div>

            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Start Date
            </label>

            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>


          {/* END DATE */}

          <div>

            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              End Date
            </label>

            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>


          {/* REASON */}

          <div className="md:col-span-2">

            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Reason
            </label>

            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Enter leave reason..."
              rows="3"
              className="w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>


          {/* BUTTON */}

          <div className="md:col-span-2">

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading
                ? "Submitting..."
                : "Submit Leave Request"}

            </button>

          </div>

        </form>

      </div>


      {/* =========================
          LEAVE TABLE
      ========================= */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-5 py-4">

          <h2 className="text-lg font-semibold text-slate-800">
            Leave Requests
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Employee leave requests and approval status
          </p>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full text-left text-sm">

            <thead className="bg-slate-50 text-xs uppercase text-slate-500">

              <tr>

                <th className="px-5 py-4">
                  Employee
                </th>

                <th className="px-5 py-4">
                  Department
                </th>

                <th className="px-5 py-4">
                  Leave Type
                </th>

                <th className="px-5 py-4">
                  Start Date
                </th>

                <th className="px-5 py-4">
                  End Date
                </th>

                <th className="px-5 py-4">
                  Reason
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

              {leaves.map((leave) => (

                <tr
                  key={leave.id}
                  className="transition hover:bg-slate-50"
                >

                  <td className="px-5 py-4">

                    <div className="font-medium text-slate-800">
                      {leave.name}
                    </div>

                    <div className="text-xs text-slate-400">
                      {leave.employee_code}
                    </div>

                  </td>


                  <td className="px-5 py-4 text-slate-600">
                    {leave.department}
                  </td>


                  <td className="px-5 py-4 text-slate-600">
                    {leave.leave_type}
                  </td>


                  <td className="px-5 py-4 text-slate-600">
                    {leave.start_date}
                  </td>


                  <td className="px-5 py-4 text-slate-600">
                    {leave.end_date}
                  </td>


                  <td className="max-w-xs px-5 py-4 text-slate-600">
                    {leave.reason || "-"}
                  </td>


                  <td className="px-5 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        leave.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : leave.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {leave.status}
                    </span>

                  </td>


                  <td className="px-5 py-4">

                    {leave.status === "Pending" && (

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            updateStatus(
                              leave.id,
                              "Approved"
                            )
                          }
                          className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-green-700"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(
                              leave.id,
                              "Rejected"
                            )
                          }
                          className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-700"
                        >
                          Reject
                        </button>

                      </div>

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Leave;