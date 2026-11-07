import { useEffect, useState } from "react";
import axios from "axios";

function HRReport() {
    const [employeeSummary, setEmployeeSummary] = useState({
        total_employees: 0,
        active_employees: 0,
        inactive_employees: 0,
    });

    const [departments, setDepartments] = useState([]);

    const [todayAttendance, setTodayAttendance] = useState({
        total_records: 0,
        present: 0,
        absent: 0,
        late: 0,
    });

    const [leaveSummary, setLeaveSummary] = useState({
        total_leaves: 0,
        pending_leaves: 0,
        approved_leaves: 0,
        rejected_leaves: 0,
    });

    const [performance, setPerformance] = useState([]);

    const [recentEmployees, setRecentEmployees] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchHRReport = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/hrreports"
            );

            setEmployeeSummary(response.data.employeeSummary);
            setDepartments(response.data.departments);
            setTodayAttendance(response.data.todayAttendance);
            setLeaveSummary(response.data.leaveSummary);
            setPerformance(response.data.performance);
            setRecentEmployees(response.data.recentEmployees);
        } catch (error) {
            console.log("HR report error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHRReport();
    }, []);

    if (loading) {
        return (
            <div className="w-full">
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-slate-500">
                        Loading HR report...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full space-y-6">

            {/* ================= HEADER ================= */}
            <div>
                <h1 className="text-2xl font-bold text-slate-800">
                    HR Report
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Employee, attendance, leave and performance overview
                </p>
            </div>

            {/* ================= EMPLOYEE SUMMARY ================= */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                {/* Total Employees */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                        Total Employees
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-slate-800">
                        {employeeSummary.total_employees}
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                        All registered employees
                    </p>
                </div>

                {/* Active Employees */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                        Active Employees
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-green-600">
                        {employeeSummary.active_employees}
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                        Currently active
                    </p>
                </div>

                {/* Inactive Employees */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                        Inactive Employees
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-red-600">
                        {employeeSummary.inactive_employees}
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                        Currently inactive
                    </p>
                </div>

            </div>

            {/* ================= ATTENDANCE + LEAVE ================= */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                {/* Today's Attendance */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                    <div className="mb-5">
                        <h2 className="text-lg font-semibold text-slate-800">
                            Today's Attendance
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Attendance records for today
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        {/* Records */}
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <p className="text-sm font-medium text-slate-500">
                                Records
                            </p>

                            <h3 className="mt-1 text-2xl font-bold text-slate-800">
                                {todayAttendance.total_records || 0}
                            </h3>
                        </div>

                        {/* Present */}
                        <div className="rounded-xl border border-green-100 bg-green-50 p-4">
                            <p className="text-sm font-medium text-green-600">
                                Present
                            </p>

                            <h3 className="mt-1 text-2xl font-bold text-green-600">
                                {todayAttendance.present || 0}
                            </h3>
                        </div>

                        {/* Absent */}
                        <div className="rounded-xl border border-red-100 bg-red-50 p-4">
                            <p className="text-sm font-medium text-red-600">
                                Absent
                            </p>

                            <h3 className="mt-1 text-2xl font-bold text-red-600">
                                {todayAttendance.absent || 0}
                            </h3>
                        </div>

                        {/* Late */}
                        <div className="rounded-xl border border-orange-100 bg-orange-50 p-4">
                            <p className="text-sm font-medium text-orange-600">
                                Late
                            </p>

                            <h3 className="mt-1 text-2xl font-bold text-orange-600">
                                {todayAttendance.late || 0}
                            </h3>
                        </div>

                    </div>
                </div>

                {/* Leave Summary */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                    <div className="mb-5">
                        <h2 className="text-lg font-semibold text-slate-800">
                            Leave Summary
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Employee leave overview
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        {/* Total Leaves */}
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <p className="text-sm font-medium text-slate-500">
                                Total Leaves
                            </p>

                            <h3 className="mt-1 text-2xl font-bold text-slate-800">
                                {leaveSummary.total_leaves || 0}
                            </h3>
                        </div>

                        {/* Pending */}
                        <div className="rounded-xl border border-orange-100 bg-orange-50 p-4">
                            <p className="text-sm font-medium text-orange-600">
                                Pending
                            </p>

                            <h3 className="mt-1 text-2xl font-bold text-orange-600">
                                {leaveSummary.pending_leaves || 0}
                            </h3>
                        </div>

                        {/* Approved */}
                        <div className="rounded-xl border border-green-100 bg-green-50 p-4">
                            <p className="text-sm font-medium text-green-600">
                                Approved
                            </p>

                            <h3 className="mt-1 text-2xl font-bold text-green-600">
                                {leaveSummary.approved_leaves || 0}
                            </h3>
                        </div>

                        {/* Rejected */}
                        <div className="rounded-xl border border-red-100 bg-red-50 p-4">
                            <p className="text-sm font-medium text-red-600">
                                Rejected
                            </p>

                            <h3 className="mt-1 text-2xl font-bold text-red-600">
                                {leaveSummary.rejected_leaves || 0}
                            </h3>
                        </div>

                    </div>
                </div>

            </div>

            {/* ================= DEPARTMENT SUMMARY ================= */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-5">
                    <h2 className="text-lg font-semibold text-slate-800">
                        Department Summary
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Employees by department
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

                    {departments.length === 0 ? (
                        <p className="text-sm text-slate-500">
                            No department data available
                        </p>
                    ) : (
                        departments.map((department) => (
                            <div
                                key={department.department}
                                className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-white"
                            >
                                <p className="text-sm font-medium text-slate-500">
                                    {department.department || "Not Assigned"}
                                </p>

                                <h3 className="mt-2 text-2xl font-bold text-slate-800">
                                    {department.total_employees}
                                </h3>

                                <p className="mt-1 text-xs text-slate-400">
                                    Employees
                                </p>
                            </div>
                        ))
                    )}

                </div>
            </div>

            {/* ================= EMPLOYEE PERFORMANCE ================= */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-5">
                    <h2 className="text-lg font-semibold text-slate-800">
                        Employee Performance
                    </h2>

                    <p className="text-sm text-slate-500">
                        Recent employee performance records
                    </p>
                </div>

                <div className="overflow-x-auto">

                    <table className="w-full text-left">

                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50">

                                <th className="px-4 py-3 text-sm font-medium text-slate-500">
                                    Employee
                                </th>

                                <th className="px-4 py-3 text-sm font-medium text-slate-500">
                                    Department
                                </th>

                                <th className="px-4 py-3 text-sm font-medium text-slate-500">
                                    Month
                                </th>

                                <th className="px-4 py-3 text-sm font-medium text-slate-500">
                                    Target
                                </th>

                                <th className="px-4 py-3 text-sm font-medium text-slate-500">
                                    Achieved
                                </th>

                                <th className="px-4 py-3 text-sm font-medium text-slate-500">
                                    Attendance
                                </th>

                                <th className="px-4 py-3 text-sm font-medium text-slate-500">
                                    Score
                                </th>

                                <th className="px-4 py-3 text-sm font-medium text-slate-500">
                                    Bonus
                                </th>

                            </tr>
                        </thead>

                        <tbody>

                            {performance.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="px-4 py-8 text-center text-sm text-slate-500"
                                    >
                                        No performance records available
                                    </td>
                                </tr>
                            ) : (
                                performance.map((employee) => (
                                    <tr
                                        key={employee.id}
                                        className="border-b border-slate-100 transition hover:bg-slate-50"
                                    >

                                        <td className="px-4 py-3">
                                            <p className="font-medium text-slate-800">
                                                {employee.name}
                                            </p>

                                            <p className="text-xs text-slate-400">
                                                {employee.employee_code}
                                            </p>
                                        </td>

                                        <td className="px-4 py-3 text-sm text-slate-600">
                                            {employee.department || "-"}
                                        </td>

                                        <td className="px-4 py-3 text-sm text-slate-600">
                                            {employee.month}
                                        </td>

                                        <td className="px-4 py-3 text-sm text-slate-600">
                                            {employee.sales_target}
                                        </td>

                                        <td className="px-4 py-3 text-sm text-slate-600">
                                            {employee.sales_achieved}
                                        </td>

                                        <td className="px-4 py-3 text-sm text-slate-600">
                                            {employee.attendance_percentage}%
                                        </td>

                                        <td className="px-4 py-3">
                                            <span
                                                className={`font-semibold ${
                                                    Number(employee.performance_score) >= 90
                                                        ? "text-green-600"
                                                        : Number(employee.performance_score) >= 70
                                                        ? "text-orange-600"
                                                        : "text-red-600"
                                                }`}
                                            >
                                                {employee.performance_score}
                                            </span>
                                        </td>

                                        <td className="px-4 py-3 font-medium text-green-600">
                                            Rs.{" "}
                                            {Number(
                                                employee.bonus_amount || 0
                                            ).toLocaleString()}
                                        </td>

                                    </tr>
                                ))
                            )}

                        </tbody>

                    </table>
                </div>
            </div>

            {/* ================= RECENT EMPLOYEES ================= */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-5">
                    <h2 className="text-lg font-semibold text-slate-800">
                        Recent Employees
                    </h2>

                    <p className="text-sm text-slate-500">
                        Recently added employees
                    </p>
                </div>

                <div className="overflow-x-auto">

                    <table className="w-full text-left">

                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50">

                                <th className="px-4 py-3 text-sm font-medium text-slate-500">
                                    Employee Code
                                </th>

                                <th className="px-4 py-3 text-sm font-medium text-slate-500">
                                    Name
                                </th>

                                <th className="px-4 py-3 text-sm font-medium text-slate-500">
                                    Department
                                </th>

                                <th className="px-4 py-3 text-sm font-medium text-slate-500">
                                    Designation
                                </th>

                                <th className="px-4 py-3 text-sm font-medium text-slate-500">
                                    Joining Date
                                </th>

                                <th className="px-4 py-3 text-sm font-medium text-slate-500">
                                    Status
                                </th>

                            </tr>
                        </thead>

                        <tbody>

                            {recentEmployees.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="px-4 py-8 text-center text-sm text-slate-500"
                                    >
                                        No employee records available
                                    </td>
                                </tr>
                            ) : (
                                recentEmployees.map((employee) => (
                                    <tr
                                        key={employee.id}
                                        className="border-b border-slate-100 transition hover:bg-slate-50"
                                    >

                                        <td className="px-4 py-3 font-medium text-slate-700">
                                            {employee.employee_code}
                                        </td>

                                        <td className="px-4 py-3 text-slate-700">
                                            {employee.name}
                                        </td>

                                        <td className="px-4 py-3 text-slate-600">
                                            {employee.department || "-"}
                                        </td>

                                        <td className="px-4 py-3 text-slate-600">
                                            {employee.designation || "-"}
                                        </td>

                                        <td className="px-4 py-3 text-slate-600">
                                            {employee.joining_date
                                                ? new Date(
                                                      employee.joining_date
                                                  ).toLocaleDateString()
                                                : "-"}
                                        </td>

                                        <td className="px-4 py-3">

                                            <span
                                                className={
                                                    employee.status === "Active"
                                                        ? "rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700"
                                                        : "rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700"
                                                }
                                            >
                                                {employee.status}
                                            </span>

                                        </td>

                                    </tr>
                                ))
                            )}

                        </tbody>

                    </table>
                </div>
            </div>

        </div>
    );
}

export default HRReport;