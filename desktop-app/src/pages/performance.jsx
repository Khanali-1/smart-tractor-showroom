import { useEffect, useState } from "react";
import axios from "axios";

const Performance = () => {

    // =========================================
    // STATES
    // =========================================

    const [employees, setEmployees] = useState([]);

    const [performance, setPerformance] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [loading, setLoading] = useState(false);

    const [selectedPerformance, setSelectedPerformance] = useState(null);


    // =========================================
    // FORM DATA
    // =========================================

    const [formData, setFormData] = useState({

        employee_id: "",
        month: "",
        sales_target: 0,
        sales_achieved: 0,
        attendance_percentage: 0,
        performance_score: 0,
        bonus_amount: 0,
        remarks: ""

    });


    // =========================================
    // GET EMPLOYEES
    // =========================================

    const getEmployees = async () => {

        try {

            const response = await axios.get(
                "http://localhost:5000/api/employees"
            );

            setEmployees(response.data);

        } catch (error) {

            console.log(
                "Error getting employees:",
                error
            );

        }

    };


    // =========================================
    // GET PERFORMANCE
    // =========================================

    const getPerformance = async () => {

        try {

            const response = await axios.get(
                "http://localhost:5000/api/performance"
            );

            setPerformance(response.data);

        } catch (error) {

            console.log(
                "Error getting performance:",
                error
            );

        }

    };


    // =========================================
    // LOAD DATA
    // =========================================

    useEffect(() => {

        getEmployees();

        getPerformance();

    }, []);


    // =========================================
    // INPUT CHANGE
    // =========================================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };


    // =========================================
    // RESET FORM
    // =========================================

    const resetForm = () => {

        setFormData({

            employee_id: "",
            month: "",
            sales_target: 0,
            sales_achieved: 0,
            attendance_percentage: 0,
            performance_score: 0,
            bonus_amount: 0,
            remarks: ""

        });

    };


    // =========================================
    // SUBMIT PERFORMANCE
    // =========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await axios.post(
                "http://localhost:5000/api/performance",
                formData
            );

            alert(
                "Performance added successfully"
            );

            resetForm();

            setShowForm(false);

            getPerformance();

        } catch (error) {

            console.log(
                "Error adding performance:",
                error
            );

            console.log(
                "Backend response:",
                error.response?.data
            );

            alert(
                "Failed to add performance"
            );

        } finally {

            setLoading(false);

        }

    };


    // =========================================
    // DELETE PERFORMANCE
    // =========================================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this performance record?"
        );

        if (!confirmDelete) {

            return;

        }

        try {

            await axios.delete(
                `http://localhost:5000/api/performance/${id}`
            );

            alert(
                "Performance deleted successfully"
            );

            getPerformance();

        } catch (error) {

            console.log(
                "Error deleting performance:",
                error
            );

            alert(
                "Failed to delete performance"
            );

        }

    };


    // =========================================
    // STATISTICS
    // =========================================

    const totalRecords =
        performance.length;


    const totalBonus =
        performance.reduce(
            (total, item) => {

                return (
                    total +
                    Number(
                        item.bonus_amount || 0
                    )
                );

            },
            0
        );


    const averageScore =
        performance.length > 0

            ? (
                performance.reduce(
                    (total, item) => {

                        return (
                            total +
                            Number(
                                item.performance_score || 0
                            )
                        );

                    },
                    0
                ) / performance.length
            ).toFixed(1)

            : 0;


    const excellentPerformers =
        performance.filter(
            (item) =>
                Number(
                    item.performance_score
                ) >= 90
        ).length;


    // =========================================
    // SCORE COLOR
    // =========================================

    const getScoreClass = (score) => {

        const value = Number(score);

        if (value >= 90) {

            return "bg-green-100 text-green-700";

        }

        if (value >= 70) {

            return "bg-yellow-100 text-yellow-700";

        }

        return "bg-red-100 text-red-700";

    };


    // =========================================
    // RANK COLOR
    // =========================================

    const getRankClass = (rank) => {

        if (rank === "Star Performer") {

            return "bg-purple-100 text-purple-700";

        }

        if (rank === "Excellent") {

            return "bg-green-100 text-green-700";

        }

        if (rank === "Good Performer") {

            return "bg-blue-100 text-blue-700";

        }

        return "bg-slate-100 text-slate-700";

    };


    // =========================================
    // RETURN
    // =========================================

    return (

        <div className="w-full space-y-6">


            {/* =====================================
                HEADER
            ===================================== */}

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-2xl font-bold text-slate-800">

                        Employee Performance

                    </h1>

                    <p className="mt-1 text-sm text-slate-500">

                        Manage monthly employee performance,
                        rankings and rewards

                    </p>

                </div>


                <button
                    onClick={() =>
                        setShowForm(!showForm)
                    }
                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
                >

                    {showForm
                        ? "Close Form"
                        : "+ Add Performance"}

                </button>

            </div>



            {/* =====================================
                STAT CARDS
            ===================================== */}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">


                {/* TOTAL RECORDS */}

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                    <p className="text-sm text-slate-500">

                        Total Records

                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-slate-800">

                        {totalRecords}

                    </h2>

                </div>



                {/* AVERAGE SCORE */}

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                    <p className="text-sm text-slate-500">

                        Average Score

                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-slate-800">

                        {averageScore}

                    </h2>

                </div>



                {/* TOTAL BONUS */}

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                    <p className="text-sm text-slate-500">

                        Total Bonus

                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-slate-800">

                        Rs.{" "}
                        {totalBonus.toLocaleString()}

                    </h2>

                </div>



                {/* EXCELLENT */}

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                    <p className="text-sm text-slate-500">

                        Excellent Performers

                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-green-600">

                        {excellentPerformers}

                    </h2>

                </div>

            </div>



            {/* =====================================
                ADD PERFORMANCE FORM
            ===================================== */}

            {showForm && (

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">


                    <div className="mb-5 border-b border-slate-200 pb-4">

                        <h2 className="text-lg font-semibold text-slate-800">

                            Add Monthly Performance

                        </h2>

                        <p className="mt-1 text-sm text-slate-500">

                            Enter employee performance details

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


                                {employees.map(
                                    (employee) => (

                                        <option
                                            key={employee.id}
                                            value={employee.id}
                                        >

                                            {employee.employee_code}
                                            {" - "}
                                            {employee.name}

                                        </option>

                                    )
                                )}

                            </select>

                        </div>



                        {/* MONTH */}

                        <div>

                            <label className="mb-1.5 block text-sm font-medium text-slate-700">

                                Month

                            </label>

                            <input
                                type="month"
                                name="month"
                                value={formData.month}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                        </div>



                        {/* SALES TARGET */}

                        <div>

                            <label className="mb-1.5 block text-sm font-medium text-slate-700">

                                Sales Target

                            </label>

                            <input
                                type="number"
                                name="sales_target"
                                value={formData.sales_target}
                                onChange={handleChange}
                                min="0"
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                        </div>



                        {/* SALES ACHIEVED */}

                        <div>

                            <label className="mb-1.5 block text-sm font-medium text-slate-700">

                                Sales Achieved

                            </label>

                            <input
                                type="number"
                                name="sales_achieved"
                                value={formData.sales_achieved}
                                onChange={handleChange}
                                min="0"
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                        </div>



                        {/* ATTENDANCE */}

                        <div>

                            <label className="mb-1.5 block text-sm font-medium text-slate-700">

                                Attendance %

                            </label>

                            <input
                                type="number"
                                name="attendance_percentage"
                                value={
                                    formData.attendance_percentage
                                }
                                onChange={handleChange}
                                min="0"
                                max="100"
                                step="0.01"
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                        </div>



                        {/* PERFORMANCE SCORE */}

                        <div>

                            <label className="mb-1.5 block text-sm font-medium text-slate-700">

                                Performance Score

                            </label>

                            <input
                                type="number"
                                name="performance_score"
                                value={
                                    formData.performance_score
                                }
                                onChange={handleChange}
                                min="0"
                                max="100"
                                step="0.01"
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                        </div>



                        {/* BONUS */}

                        <div>

                            <label className="mb-1.5 block text-sm font-medium text-slate-700">

                                Bonus Amount (Rs.)

                            </label>

                            <input
                                type="number"
                                name="bonus_amount"
                                value={formData.bonus_amount}
                                onChange={handleChange}
                                min="0"
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                        </div>



                        {/* REMARKS */}

                        <div>

                            <label className="mb-1.5 block text-sm font-medium text-slate-700">

                                Remarks

                            </label>

                            <input
                                type="text"
                                name="remarks"
                                value={formData.remarks}
                                onChange={handleChange}
                                placeholder="e.g. Target exceeded"
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                        </div>



                        {/* SUBMIT */}

                        <div className="pt-2 md:col-span-2">

                            <button
                                type="submit"
                                disabled={loading}
                                className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >

                                {loading
                                    ? "Saving..."
                                    : "Save Performance"}

                            </button>

                        </div>

                    </form>

                </div>

            )}



            {/* =====================================
                PERFORMANCE TABLE
            ===================================== */}

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">


                {/* TABLE HEADER */}

                <div className="border-b border-slate-200 px-5 py-4">

                    <h2 className="text-lg font-semibold text-slate-800">

                        Monthly Performance Records

                    </h2>

                    <p className="mt-1 text-sm text-slate-500">

                        Employee performance, ranking,
                        certificates and rewards

                    </p>

                </div>



                {/* TABLE */}

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[1500px] text-left text-sm">


                        {/* THEAD */}

                        <thead className="bg-slate-50 text-xs uppercase text-slate-500">

                            <tr>


                                <th className="px-5 py-4 font-medium">

                                    Employee

                                </th>


                                <th className="px-5 py-4 font-medium">

                                    Department

                                </th>


                                <th className="px-5 py-4 font-medium">

                                    Month

                                </th>


                                <th className="px-5 py-4 font-medium">

                                    Target

                                </th>


                                <th className="px-5 py-4 font-medium">

                                    Achieved

                                </th>


                                <th className="px-5 py-4 font-medium">

                                    Attendance

                                </th>


                                <th className="px-5 py-4 font-medium">

                                    Score

                                </th>


                                <th className="px-5 py-4 font-medium">

                                    Rank

                                </th>


                                <th className="px-5 py-4 font-medium">

                                    Bonus

                                </th>


                                <th className="px-5 py-4 font-medium">

                                    Certificate

                                </th>


                                <th className="px-5 py-4 font-medium">

                                    Reward Type

                                </th>


                                <th className="px-5 py-4 font-medium">

                                    Benefit

                                </th>


                                <th className="px-5 py-4 font-medium">

                                    Remarks

                                </th>


                                <th className="px-5 py-4 font-medium">

                                    Action

                                </th>


                            </tr>

                        </thead>



                        {/* TBODY */}

                        <tbody className="divide-y divide-slate-100">


                            {performance.map(
                                (item) => (

                                    <tr
                                        key={item.id}
                                        className="transition hover:bg-slate-50"
                                    >


                                        {/* EMPLOYEE */}

                                        <td className="px-5 py-4">

                                            <div className="font-medium text-slate-800">

                                                {item.name}

                                            </div>

                                            <div className="text-xs text-slate-400">

                                                {item.employee_code}

                                            </div>

                                        </td>



                                        {/* DEPARTMENT */}

                                        <td className="px-5 py-4 text-slate-600">

                                            {item.department || "-"}

                                        </td>



                                        {/* MONTH */}

                                        <td className="px-5 py-4 text-slate-600">

                                            {item.month}

                                        </td>



                                        {/* TARGET */}

                                        <td className="px-5 py-4 text-slate-600">

                                            {item.sales_target}

                                        </td>



                                        {/* ACHIEVED */}

                                        <td className="px-5 py-4 text-slate-600">

                                            {item.sales_achieved}

                                        </td>



                                        {/* ATTENDANCE */}

                                        <td className="px-5 py-4 text-slate-600">

                                            {item.attendance_percentage}%

                                        </td>



                                        {/* SCORE */}

                                        <td className="px-5 py-4">

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${getScoreClass(
                                                    item.performance_score
                                                )}`}
                                            >

                                                {item.performance_score}

                                            </span>

                                        </td>



                                        {/* RANK */}

                                        <td className="px-5 py-4">

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${getRankClass(
                                                    item.rank_awarded
                                                )}`}
                                            >

                                                {item.rank_awarded ||
                                                    "Developing"}

                                            </span>

                                        </td>



                                        {/* BONUS */}

                                        <td className="px-5 py-4 font-medium text-slate-700">

                                            Rs.{" "}

                                            {Number(
                                                item.bonus_amount || 0
                                            ).toLocaleString()}

                                        </td>



                                        {/* CERTIFICATE */}

                                        <td className="px-5 py-4">

                                            {item.certificate_title ? (

                                                <span className="font-medium text-blue-600">

                                                    🏆{" "}

                                                    {
                                                        item.certificate_title
                                                    }

                                                </span>

                                            ) : (

                                                <span className="text-slate-400">

                                                    -

                                                </span>

                                            )}

                                        </td>



                                        {/* REWARD TYPE */}

                                        <td className="px-5 py-4">

                                            {item.reward_type ? (

                                                <span className="font-medium text-blue-700">

                                                    {item.reward_type}

                                                </span>

                                            ) : (

                                                "-"

                                            )}

                                        </td>



                                        {/* REWARD DESCRIPTION */}

                                        <td className="px-5 py-4">

                                            <div className="max-w-xs text-sm text-slate-600">

                                                {
                                                    item.reward_description ||
                                                    "-"
                                                }

                                            </div>

                                        </td>



                                        {/* REMARKS */}

                                        <td className="px-5 py-4">

                                            <div className="max-w-xs text-sm text-slate-600">

                                                {item.remarks || "-"}

                                            </div>

                                        </td>



                                        {/* ACTION */}

                                        <td className="px-5 py-4">

                                            <div className="flex gap-2">

                                                <button
                                                    onClick={() =>
                                                        setSelectedPerformance(
                                                            item
                                                        )
                                                    }
                                                    className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-700"
                                                >

                                                    View

                                                </button>


                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            item.id
                                                        )
                                                    }
                                                    className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-700"
                                                >

                                                    Delete

                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                )
                            )}



                            {/* EMPTY */}

                            {performance.length === 0 && (

                                <tr>

                                    <td
                                        colSpan="14"
                                        className="py-10 text-center text-slate-500"
                                    >

                                        No performance records found.

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>



            {/* =====================================
                PERFORMANCE DETAILS MODAL
            ===================================== */}

            {selectedPerformance && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">


                    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">


                        {/* MODAL HEADER */}

                        <div className="mb-6 flex items-center justify-between">

                            <div>

                                <h2 className="text-xl font-bold text-slate-800">

                                    Performance Recognition

                                </h2>

                                <p className="text-sm text-slate-500">

                                    Employee performance and rewards

                                </p>

                            </div>


                            <button
                                onClick={() =>
                                    setSelectedPerformance(null)
                                }
                                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                            >

                                ✕

                            </button>

                        </div>



                        {/* EMPLOYEE INFO */}

                        <div className="mb-5 rounded-xl border border-blue-100 bg-blue-50 p-4">

                            <h3 className="text-lg font-semibold text-slate-800">

                                {selectedPerformance.name}

                            </h3>

                            <p className="text-blue-600">

                                {selectedPerformance.employee_code}

                            </p>

                            <p className="mt-1 text-sm text-slate-500">

                                {selectedPerformance.department || "-"}
                                {" • "}
                                {selectedPerformance.designation || "-"}

                            </p>

                            <p className="mt-1 text-sm text-slate-500">

                                Month:{" "}

                                <span className="font-medium text-slate-700">

                                    {selectedPerformance.month}

                                </span>

                            </p>

                        </div>



                        {/* PERFORMANCE STATS */}

                        <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">


                            {/* SCORE */}

                            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

                                <p className="text-sm text-slate-500">

                                    Score

                                </p>

                                <p className="mt-1 text-xl font-bold text-slate-800">

                                    {selectedPerformance.performance_score}

                                </p>

                            </div>



                            {/* ATTENDANCE */}

                            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

                                <p className="text-sm text-slate-500">

                                    Attendance

                                </p>

                                <p className="mt-1 text-xl font-bold text-slate-800">

                                    {
                                        selectedPerformance.attendance_percentage
                                    }%

                                </p>

                            </div>



                            {/* SALES */}

                            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

                                <p className="text-sm text-slate-500">

                                    Sales

                                </p>

                                <p className="mt-1 text-xl font-bold text-slate-800">

                                    {
                                        selectedPerformance.sales_achieved
                                    }

                                </p>

                            </div>



                            {/* BONUS */}

                            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

                                <p className="text-sm text-slate-500">

                                    Bonus

                                </p>

                                <p className="mt-1 text-xl font-bold text-slate-800">

                                    Rs.{" "}

                                    {Number(
                                        selectedPerformance.bonus_amount || 0
                                    ).toLocaleString()}

                                </p>

                            </div>

                        </div>



                        {/* RECOGNITION */}

                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                            <h3 className="mb-5 font-semibold text-lg text-slate-800">

                                🏆 Recognition & Rewards

                            </h3>


                            <div className="space-y-5">


                                {/* RANK */}

                                <div>

                                    <p className="text-sm text-slate-500">

                                        Rank Awarded

                                    </p>

                                    <p className="mt-1 font-semibold text-purple-700">

                                        {
                                            selectedPerformance.rank_awarded ||
                                            "Developing"
                                        }

                                    </p>

                                </div>



                                {/* CERTIFICATE */}

                                <div>

                                    <p className="text-sm text-slate-500">

                                        Certificate

                                    </p>

                                    <p className="mt-1 font-semibold text-green-700">

                                        {
                                            selectedPerformance.certificate_title ||
                                            "No Certificate"
                                        }

                                    </p>

                                </div>



                                {/* REWARD TYPE */}

                                <div>

                                    <p className="text-sm text-slate-500">

                                        Reward Type

                                    </p>

                                    <p className="mt-1 font-semibold text-blue-700">

                                        {
                                            selectedPerformance.reward_type ||
                                            "-"
                                        }

                                    </p>

                                </div>



                                {/* REWARD DESCRIPTION */}

                                <div>

                                    <p className="text-sm text-slate-500">

                                        Reward / Benefit

                                    </p>

                                    <p className="mt-1 text-slate-700">

                                        {
                                            selectedPerformance.reward_description ||
                                            "No reward assigned"
                                        }

                                    </p>

                                </div>



                                {/* REMARKS */}

                                <div>

                                    <p className="text-sm text-slate-500">

                                        Remarks

                                    </p>

                                    <p className="mt-1 text-slate-700">

                                        {
                                            selectedPerformance.remarks ||
                                            "-"
                                        }

                                    </p>

                                </div>

                            </div>

                        </div>



                        {/* MODAL BUTTON */}

                        <div className="mt-6 flex justify-end">

                            <button
                                onClick={() =>
                                    setSelectedPerformance(null)
                                }
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

};


export default Performance;