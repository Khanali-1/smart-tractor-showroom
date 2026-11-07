
import axios from "axios";
import { useEffect, useState } from "react";

import {
  Camera,
  CheckCircle,
  Clock,
  Users,
  XCircle,
} from "lucide-react";


function Attendance() {

  // =========================
  // STATES
  // =========================

  const [attendance, setAttendance] = useState([]);

  const [employeeCode, setEmployeeCode] = useState("");

  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");


  // =========================
  // GET ATTENDANCE
  // =========================

  const getAttendance = async () => {

    try {

      setLoading(true);

      const response = await axios.get(
        "http://localhost:5000/api/attendance"
      );

      setAttendance(response.data);

    } catch (error) {

      console.log(
        "Error fetching attendance:",
        error
      );

      setError(
        "Failed to fetch attendance"
      );

    } finally {

      setLoading(false);

    }

  };


  // =========================
  // PAGE LOAD
  // =========================

  useEffect(() => {

    getAttendance();

  }, []);


  // =========================
  // MARK ATTENDANCE
  // =========================

  const markAttendance = async () => {

    // Employee code check
    if (!employeeCode.trim()) {

      setError(
        "Please enter employee code"
      );

      return;

    }


    try {

      setError("");

      setMessage("");


      const response = await axios.post(
        "http://localhost:5000/api/attandance",
        {
          employee_code: employeeCode,
        }
      );


      // Success message
      setMessage(
        response.data.message
      );


      // Clear input
      setEmployeeCode("");


      // Refresh table
      getAttendance();


    } catch (error) {

      console.log(
        "Error marking attendance:",
        error
      );


      setError(
        error.response?.data?.message ||
        "Failed to mark attendance"
      );

    }

  };


  // =========================
  // STATISTICS
  // =========================

  const total =
    attendance.length;


  const present =
    attendance.filter(
      (item) =>
        item.status === "present"
    ).length;


  const late =
    attendance.filter(
      (item) =>
        item.status === "late"
    ).length;


  const absent =
    attendance.filter(
      (item) =>
        item.status === "absent"
    ).length;


  // =========================
  // UI
  // =========================

  return (

    <div className="w-full space-y-6">


      {/* =================================================
          HEADER
      ================================================= */}

      <div>

        <h1 className="text-2xl font-bold text-slate-800">

          Employee Attendance

        </h1>


        <p className="mt-1 text-sm text-slate-500">

          Manage employee attendance and check-in records

        </p>

      </div>



      {/* =================================================
          STAT CARDS
      ================================================= */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">


        {/* TOTAL */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">

                Total

              </p>


              <h2 className="mt-1 text-2xl font-bold text-slate-800">

                {total}

              </h2>

            </div>


            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">

              <Users size={24} />

            </div>

          </div>

        </div>



        {/* PRESENT */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">

                Present

              </p>


              <h2 className="mt-1 text-2xl font-bold text-green-600">

                {present}

              </h2>

            </div>


            <div className="rounded-xl bg-green-100 p-3 text-green-600">

              <CheckCircle size={24} />

            </div>

          </div>

        </div>



        {/* LATE */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">

                Late

              </p>


              <h2 className="mt-1 text-2xl font-bold text-orange-500">

                {late}

              </h2>

            </div>


            <div className="rounded-xl bg-orange-100 p-3 text-orange-600">

              <Clock size={24} />

            </div>

          </div>

        </div>



        {/* ABSENT */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">

                Absent

              </p>


              <h2 className="mt-1 text-2xl font-bold text-red-500">

                {absent}

              </h2>

            </div>


            <div className="rounded-xl bg-red-100 p-3 text-red-500">

              <XCircle size={24} />

            </div>

          </div>

        </div>

      </div>



      {/* =================================================
          EMPLOYEE CHECK-IN
      ================================================= */}

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">


        <div className="mb-5">

          <h2 className="text-base font-bold text-slate-800">

            Employee Check-In

          </h2>


          <p className="mt-1 text-xs text-slate-500">

            Enter employee code for attendance

          </p>

        </div>



        {/* INPUT + BUTTON */}

        <div className="flex flex-col gap-3 sm:flex-row">


          <input
            type="text"
            value={employeeCode}
            onChange={(e) =>
              setEmployeeCode(
                e.target.value
              )
            }
            placeholder="Enter Employee Code e.g. EMP-0001"
            className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />


          <button
            onClick={markAttendance}
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
          >

            <Camera size={18} />

            Mark Attendance

          </button>

        </div>



        {/* SUCCESS */}

        {message && (

          <div className="mt-4 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">

            <CheckCircle size={20} />

            {message}

          </div>

        )}



        {/* ERROR */}

        {error && (

          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">

            {error}

          </div>

        )}

      </div>



      {/* =================================================
          ATTENDANCE TABLE
      ================================================= */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">


        {/* TABLE HEADER */}

        <div className="border-b border-slate-200 p-5">

          <h2 className="text-base font-bold text-slate-800">

            Attendance Records

          </h2>


          <p className="mt-1 text-xs text-slate-500">

            Employee check-in and attendance history

          </p>

        </div>



        {/* TABLE */}

        <div className="overflow-x-auto">

          <table className="w-full text-left text-sm">


            {/* TABLE HEAD */}

            <thead className="bg-slate-50">

              <tr>

                <th className="px-5 py-3 text-xs font-medium text-slate-500">

                  Employee Code

                </th>


                <th className="px-5 py-3 text-xs font-medium text-slate-500">

                  Employee

                </th>


                <th className="px-5 py-3 text-xs font-medium text-slate-500">

                  Department

                </th>


                <th className="px-5 py-3 text-xs font-medium text-slate-500">

                  Date

                </th>


                <th className="px-5 py-3 text-xs font-medium text-slate-500">

                  Check In

                </th>


                <th className="px-5 py-3 text-xs font-medium text-slate-500">

                  Check Out

                </th>


                <th className="px-5 py-3 text-xs font-medium text-slate-500">

                  Status

                </th>

              </tr>

            </thead>



            {/* TABLE BODY */}

            <tbody>


              {/* LOADING */}

              {loading ? (

                <tr>

                  <td
                    colSpan="7"
                    className="px-5 py-10 text-center text-sm text-slate-500"
                  >

                    Loading attendance...

                  </td>

                </tr>

              ) : attendance.length === 0 ? (

                /* EMPTY */

                <tr>

                  <td
                    colSpan="7"
                    className="px-5 py-10 text-center text-sm text-slate-500"
                  >

                    No attendance records found.

                  </td>

                </tr>

              ) : (

                /* DATA */

                attendance.map(
                  (item) => (

                    <tr
                      key={item.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                    >


                      {/* EMPLOYEE CODE */}

                      <td className="px-5 py-4 font-medium text-slate-700">

                        {item.employee_code}

                      </td>



                      {/* EMPLOYEE */}

                      <td className="px-5 py-4 text-slate-700">

                        {item.name}

                      </td>



                      {/* DEPARTMENT */}

                      <td className="px-5 py-4 text-slate-600">

                        {item.department}

                      </td>



                      {/* DATE */}

                      <td className="px-5 py-4 text-slate-600">

                        {item.attendance_date}

                      </td>



                      {/* CHECK IN */}

                      <td className="px-5 py-4 text-slate-600">

                        {item.check_in || "-"}

                      </td>



                      {/* CHECK OUT */}

                      <td className="px-5 py-4 text-slate-600">

                        {item.check_out || "-"}

                      </td>



                      {/* STATUS */}

                      <td className="px-5 py-4">

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            item.status === "present"
                              ? "bg-green-100 text-green-700"
                              : item.status === "late"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >

                          {item.status}

                        </span>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}


export default Attendance;
