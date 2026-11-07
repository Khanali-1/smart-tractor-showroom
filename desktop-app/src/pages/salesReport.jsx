import { useEffect, useState } from "react";
import axios from "axios";

import {
    ShoppingCart,
    DollarSign,
    CreditCard,
    Clock,
    RefreshCw
} from "lucide-react";

function SalesReport() {

    const [summary, setSummary] = useState({
        total_sales: 0,
        total_revenue: 0,
        total_paid: 0,
        total_pending: 0
    });

    const [monthlySales, setMonthlySales] = useState([]);
    const [recentSales, setRecentSales] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ==============================
    // GET SALES REPORT
    // ==============================

    const getSalesReport = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await axios.get(
                "http://localhost:5000/api/salesreports"
            );

            setSummary(response.data.summary);

            setMonthlySales(response.data.monthlySales);

            setRecentSales(response.data.recentSales);

            setPaymentMethods(response.data.paymentMethods);

        } catch (error) {

            console.log("Sales report error:", error);

            setError(
                error.response?.data?.message ||
                "Failed to load sales report"
            );

        } finally {

            setLoading(false);

        }
    };


    // ==============================
    // LOAD REPORT
    // ==============================

    useEffect(() => {

        getSalesReport();

    }, []);


    // ==============================
    // FORMAT MONEY
    // ==============================

    const formatMoney = (amount) => {

        return new Intl.NumberFormat("en-PK", {
            style: "currency",
            currency: "PKR",
            maximumFractionDigits: 0
        }).format(Number(amount || 0));

    };


    // ==============================
    // FORMAT MONTH
    // ==============================

    const formatMonth = (month) => {

        if (!month) return "";

        const date = new Date(`${month}-01`);

        return date.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric"
        });

    };


    // ==============================
    // LOADING
    // ==============================

    if (loading) {

        return (

            <div className="w-full">

                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                    <RefreshCw
                        size={20}
                        className="animate-spin text-blue-600"
                    />

                    <p className="text-slate-600">
                        Loading sales report...
                    </p>

                </div>

            </div>

        );

    }


    // ==============================
    // UI
    // ==============================

    return (

        <div className="w-full space-y-6">


            {/* ==============================
                HEADER
            ============================== */}

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-2xl font-bold text-slate-800">
                        Sales Report
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Analyze showroom sales and revenue
                    </p>

                </div>


                <button
                    onClick={getSalesReport}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
                >

                    <RefreshCw size={17} />

                    Refresh

                </button>

            </div>


            {/* ==============================
                ERROR
            ============================== */}

            {error && (

                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">

                    {error}

                </div>

            )}


            {/* ==============================
                SUMMARY CARDS
            ============================== */}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">


                {/* TOTAL SALES */}

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-slate-500">
                                Total Sales
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-slate-800">
                                {summary.total_sales}
                            </h2>

                        </div>

                        <div className="rounded-lg bg-blue-100 p-3 text-blue-600">

                            <ShoppingCart size={24} />

                        </div>

                    </div>

                </div>


                {/* TOTAL REVENUE */}

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-slate-500">
                                Total Revenue
                            </p>

                            <h2 className="mt-2 text-xl font-bold text-slate-800">
                                {formatMoney(summary.total_revenue)}
                            </h2>

                        </div>

                        <div className="rounded-lg bg-green-100 p-3 text-green-600">

                            <DollarSign size={24} />

                        </div>

                    </div>

                </div>


                {/* PAID AMOUNT */}

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-slate-500">
                                Paid Amount
                            </p>

                            <h2 className="mt-2 text-xl font-bold text-slate-800">
                                {formatMoney(summary.total_paid)}
                            </h2>

                        </div>

                        <div className="rounded-lg bg-emerald-100 p-3 text-emerald-600">

                            <CreditCard size={24} />

                        </div>

                    </div>

                </div>


                {/* PENDING AMOUNT */}

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-slate-500">
                                Pending Amount
                            </p>

                            <h2 className="mt-2 text-xl font-bold text-slate-800">
                                {formatMoney(summary.total_pending)}
                            </h2>

                        </div>

                        <div className="rounded-lg bg-orange-100 p-3 text-orange-600">

                            <Clock size={24} />

                        </div>

                    </div>

                </div>

            </div>


            {/* ==============================
                MONTHLY SALES
            ============================== */}

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-5">

                    <h2 className="text-lg font-semibold text-slate-800">
                        Monthly Sales
                    </h2>

                    <p className="text-sm text-slate-500">
                        Sales performance by month
                    </p>

                </div>


                {monthlySales.length === 0 ? (

                    <div className="py-10 text-center text-slate-500">

                        No monthly sales data available

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>

                                <tr className="border-b border-slate-200 bg-slate-50 text-left text-sm text-slate-500">

                                    <th className="px-4 py-3">
                                        Month
                                    </th>

                                    <th className="px-4 py-3">
                                        Orders
                                    </th>

                                    <th className="px-4 py-3">
                                        Revenue
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {monthlySales.map((item) => (

                                    <tr
                                        key={item.month}
                                        className="border-b border-slate-100 last:border-none hover:bg-slate-50"
                                    >

                                        <td className="px-4 py-3 font-medium text-slate-700">

                                            {formatMonth(item.month)}

                                        </td>

                                        <td className="px-4 py-3 text-slate-600">

                                            {item.total_orders}

                                        </td>

                                        <td className="px-4 py-3 font-medium text-green-600">

                                            {formatMoney(item.revenue)}

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>


            {/* ==============================
                PAYMENT METHODS
            ============================== */}

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-5">

                    <h2 className="text-lg font-semibold text-slate-800">
                        Payment Methods
                    </h2>

                    <p className="text-sm text-slate-500">
                        Sales grouped by payment method
                    </p>

                </div>


                {paymentMethods.length === 0 ? (

                    <p className="py-8 text-center text-slate-500">

                        No payment data available

                    </p>

                ) : (

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                        {paymentMethods.map((item) => (

                            <div
                                key={item.payment_method}
                                className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-white"
                            >

                                <p className="text-sm capitalize text-slate-500">

                                    {item.payment_method}

                                </p>


                                <h3 className="mt-2 text-xl font-bold text-slate-800">

                                    {item.total_orders}

                                </h3>


                                <p className="text-xs text-slate-400">

                                    Orders

                                </p>


                                <p className="mt-2 text-sm font-medium text-green-600">

                                    {formatMoney(item.total_amount)}

                                </p>

                            </div>

                        ))}

                    </div>

                )}

            </div>


            {/* ==============================
                RECENT SALES
            ============================== */}

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-5">

                    <h2 className="text-lg font-semibold text-slate-800">
                        Recent Sales
                    </h2>

                    <p className="text-sm text-slate-500">
                        Latest showroom sales
                    </p>

                </div>


                {recentSales.length === 0 ? (

                    <div className="py-10 text-center text-slate-500">

                        No sales found

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>

                                <tr className="border-b border-slate-200 bg-slate-50 text-left text-sm text-slate-500">

                                    <th className="px-4 py-3">
                                        Invoice
                                    </th>

                                    <th className="px-4 py-3">
                                        Customer
                                    </th>

                                    <th className="px-4 py-3">
                                        Date
                                    </th>

                                    <th className="px-4 py-3">
                                        Total
                                    </th>

                                    <th className="px-4 py-3">
                                        Paid
                                    </th>

                                    <th className="px-4 py-3">
                                        Pending
                                    </th>

                                    <th className="px-4 py-3">
                                        Status
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {recentSales.map((sale) => (

                                    <tr
                                        key={sale.id}
                                        className="border-b border-slate-100 last:border-none hover:bg-slate-50"
                                    >

                                        <td className="px-4 py-3 font-medium text-slate-700">

                                            {sale.invoice_number}

                                        </td>


                                        <td className="px-4 py-3">

                                            <p className="font-medium text-slate-700">

                                                {sale.customer_name || "Walk-in Customer"}

                                            </p>

                                            <p className="text-xs text-slate-400">

                                                {sale.phone || "-"}

                                            </p>

                                        </td>


                                        <td className="px-4 py-3 text-sm text-slate-600">

                                            {new Date(
                                                sale.sale_date
                                            ).toLocaleDateString()}

                                        </td>


                                        <td className="px-4 py-3 font-medium text-slate-700">

                                            {formatMoney(sale.total_amount)}

                                        </td>


                                        <td className="px-4 py-3 font-medium text-green-600">

                                            {formatMoney(sale.paid_amount)}

                                        </td>


                                        <td className="px-4 py-3 font-medium text-orange-600">

                                            {formatMoney(sale.remaining_amount)}

                                        </td>


                                        <td className="px-4 py-3">

                                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">

                                                {sale.payment_status}

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

export default SalesReport;