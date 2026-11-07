import { useEffect, useState } from "react";
import axios from "axios";

const FinanceReport = () => {

    const [summary, setSummary] = useState({
        total_sales: 0,
        total_revenue: 0,
        total_collected: 0,
        total_pending: 0,
        total_discount: 0,
    });

    const [monthlyFinance, setMonthlyFinance] = useState([]);

    const [paymentMethods, setPaymentMethods] = useState([]);

    const [outstandingPayments, setOutstandingPayments] = useState([]);

    const [recentTransactions, setRecentTransactions] = useState([]);

    const [loading, setLoading] = useState(true);


    // Fetch Finance Report
    const fetchFinanceReport = async () => {

        try {

            const response = await axios.get(
                "http://localhost:5000/api/financereports"
            );

            setSummary(response.data.summary);

            setMonthlyFinance(response.data.monthlyFinance);

            setPaymentMethods(response.data.paymentMethods);

            setOutstandingPayments(
                response.data.outstandingPayments
            );

            setRecentTransactions(
                response.data.recentTransactions
            );

        } catch (error) {

            console.log("Finance report error:", error);

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        fetchFinanceReport();

    }, []);


    // Money formatter
    const formatMoney = (amount) => {

        return `Rs. ${Number(amount || 0).toLocaleString()}`;

    };


    if (loading) {

        return (

            <div className="w-full">

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                    <p className="text-slate-500">
                        Loading finance report...
                    </p>

                </div>

            </div>
        );

    }


    return (

        <div className="w-full space-y-6">


            {/* Header */}

            <div>

                <h1 className="text-2xl font-bold text-slate-800">
                    Finance Report
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Overview of showroom financial transactions
                </p>

            </div>


            {/* Summary Cards */}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">


                {/* Total Revenue */}

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                    <p className="text-sm text-slate-500">
                        Total Revenue
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-slate-800">
                        {formatMoney(summary.total_revenue)}
                    </h2>

                </div>


                {/* Collected */}

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                    <p className="text-sm text-slate-500">
                        Total Collected
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-green-600">
                        {formatMoney(summary.total_collected)}
                    </h2>

                </div>


                {/* Pending */}

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                    <p className="text-sm text-slate-500">
                        Pending Amount
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-orange-600">
                        {formatMoney(summary.total_pending)}
                    </h2>

                </div>


                {/* Discount */}

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                    <p className="text-sm text-slate-500">
                        Total Discount
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-red-600">
                        {formatMoney(summary.total_discount)}
                    </h2>

                </div>


                {/* Sales */}

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                    <p className="text-sm text-slate-500">
                        Total Sales
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-blue-600">
                        {summary.total_sales}
                    </h2>

                </div>

            </div>


            {/* Monthly Finance */}

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-5">

                    <h2 className="text-lg font-semibold text-slate-800">
                        Monthly Finance
                    </h2>

                    <p className="text-sm text-slate-500">
                        Monthly revenue and collection summary
                    </p>

                </div>


                <div className="overflow-x-auto">

                    <table className="w-full text-left">

                        <thead>

                            <tr className="border-b border-slate-200 bg-slate-50">

                                <th className="px-4 py-3 text-sm font-medium text-slate-500">
                                    Month
                                </th>

                                <th className="px-4 py-3 text-sm font-medium text-slate-500">
                                    Sales
                                </th>

                                <th className="px-4 py-3 text-sm font-medium text-slate-500">
                                    Revenue
                                </th>

                                <th className="px-4 py-3 text-sm font-medium text-slate-500">
                                    Collected
                                </th>

                                <th className="px-4 py-3 text-sm font-medium text-slate-500">
                                    Pending
                                </th>

                                <th className="px-4 py-3 text-sm font-medium text-slate-500">
                                    Discount
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {monthlyFinance.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="px-4 py-8 text-center text-slate-500"
                                    >
                                        No monthly finance data
                                    </td>

                                </tr>

                            ) : (

                                monthlyFinance.map((item) => (

                                    <tr
                                        key={item.month}
                                        className="border-b border-slate-100 hover:bg-slate-50"
                                    >

                                        <td className="px-4 py-3 font-medium text-slate-700">
                                            {item.month}
                                        </td>

                                        <td className="px-4 py-3 text-slate-600">
                                            {item.total_sales}
                                        </td>

                                        <td className="px-4 py-3 font-medium text-slate-700">
                                            {formatMoney(item.revenue)}
                                        </td>

                                        <td className="px-4 py-3 font-medium text-green-600">
                                            {formatMoney(item.collected)}
                                        </td>

                                        <td className="px-4 py-3 font-medium text-orange-600">
                                            {formatMoney(item.pending)}
                                        </td>

                                        <td className="px-4 py-3 font-medium text-red-600">
                                            {formatMoney(item.discount)}
                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>


            {/* Payment Methods */}

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-5">

                    <h2 className="text-lg font-semibold text-slate-800">
                        Payment Methods
                    </h2>

                    <p className="text-sm text-slate-500">
                        Financial transactions grouped by payment method
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
                                className="rounded-xl border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-200 hover:bg-white"
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

                                <p className="mt-1 text-xs text-slate-500">
                                    Collected:{" "}
                                    {formatMoney(item.collected)}
                                </p>

                                <p className="mt-1 text-xs font-medium text-orange-500">
                                    Pending:{" "}
                                    {formatMoney(item.pending)}
                                </p>

                            </div>

                        ))}

                    </div>

                )}

            </div>


            {/* Outstanding Payments */}

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-5">

                    <h2 className="text-lg font-semibold text-slate-800">
                        Outstanding Payments
                    </h2>

                    <p className="text-sm text-slate-500">
                        Customers with remaining payment
                    </p>

                </div>


                <div className="overflow-x-auto">

                    <table className="w-full text-left">

                        <thead>

                            <tr className="border-b border-slate-200 bg-slate-50">

                                <th className="px-4 py-3 text-sm font-medium text-slate-500">
                                    Invoice
                                </th>

                                <th className="px-4 py-3 text-sm font-medium text-slate-500">
                                    Customer
                                </th>

                                <th className="px-4 py-3 text-sm font-medium text-slate-500">
                                    Phone
                                </th>

                                <th className="px-4 py-3 text-sm font-medium text-slate-500">
                                    Total
                                </th>

                                <th className="px-4 py-3 text-sm font-medium text-slate-500">
                                    Paid
                                </th>

                                <th className="px-4 py-3 text-sm font-medium text-slate-500">
                                    Remaining
                                </th>

                                <th className="px-4 py-3 text-sm font-medium text-slate-500">
                                    Method
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {outstandingPayments.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="px-4 py-8 text-center font-medium text-green-600"
                                    >
                                        No outstanding payments
                                    </td>

                                </tr>

                            ) : (

                                outstandingPayments.map((sale) => (

                                    <tr
                                        key={sale.id}
                                        className="border-b border-slate-100 hover:bg-slate-50"
                                    >

                                        <td className="px-4 py-3 font-medium text-slate-700">
                                            {sale.invoice_number}
                                        </td>

                                        <td className="px-4 py-3 text-slate-700">
                                            {sale.customer_name || "Walk-in Customer"}
                                        </td>

                                        <td className="px-4 py-3 text-slate-600">
                                            {sale.phone || "-"}
                                        </td>

                                        <td className="px-4 py-3 text-slate-700">
                                            {formatMoney(sale.total_amount)}
                                        </td>

                                        <td className="px-4 py-3 font-medium text-green-600">
                                            {formatMoney(sale.paid_amount)}
                                        </td>

                                        <td className="px-4 py-3 font-semibold text-orange-600">
                                            {formatMoney(sale.remaining_amount)}
                                        </td>

                                        <td className="px-4 py-3 capitalize text-slate-600">
                                            {sale.payment_method}
                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>


            {/* Recent Transactions */}

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-5">

                    <h2 className="text-lg font-semibold text-slate-800">
                        Recent Financial Transactions
                    </h2>

                    <p className="text-sm text-slate-500">
                        Latest financial activity in the showroom
                    </p>

                </div>


                <div className="overflow-x-auto">

                    <table className="w-full text-left">

                        <thead>

                            <tr className="border-b border-slate-200 bg-slate-50">

                                <th className="px-4 py-3 text-sm font-medium text-slate-500">
                                    Invoice
                                </th>

                                <th className="px-4 py-3 text-sm font-medium text-slate-500">
                                    Customer
                                </th>

                                <th className="px-4 py-3 text-sm font-medium text-slate-500">
                                    Date
                                </th>

                                <th className="px-4 py-3 text-sm font-medium text-slate-500">
                                    Total
                                </th>

                                <th className="px-4 py-3 text-sm font-medium text-slate-500">
                                    Paid
                                </th>

                                <th className="px-4 py-3 text-sm font-medium text-slate-500">
                                    Pending
                                </th>

                                <th className="px-4 py-3 text-sm font-medium text-slate-500">
                                    Discount
                                </th>

                                <th className="px-4 py-3 text-sm font-medium text-slate-500">
                                    Method
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {recentTransactions.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="8"
                                        className="px-4 py-8 text-center text-slate-500"
                                    >
                                        No transactions available
                                    </td>

                                </tr>

                            ) : (

                                recentTransactions.map((sale) => (

                                    <tr
                                        key={sale.id}
                                        className="border-b border-slate-100 hover:bg-slate-50"
                                    >

                                        <td className="px-4 py-3 font-medium text-slate-700">
                                            {sale.invoice_number}
                                        </td>

                                        <td className="px-4 py-3 text-slate-700">
                                            {sale.customer_name || "Walk-in Customer"}
                                        </td>

                                        <td className="px-4 py-3 text-slate-600">
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

                                        <td className="px-4 py-3 font-medium text-red-600">
                                            {formatMoney(sale.discount)}
                                        </td>

                                        <td className="px-4 py-3 capitalize text-slate-600">
                                            {sale.payment_method}
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
};

export default FinanceReport;