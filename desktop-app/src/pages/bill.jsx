import axios from "axios";
import { useEffect, useState } from "react";

function Billing() {

  const [sales, setSales] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // =========================
  // GET SALES FROM BACKEND
  // =========================

  const getSales = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await axios.get(
        "http://localhost:5000/api/sales"
      );

      setSales(response.data);

    } catch (error) {

      console.log("Error fetching sales:", error);

      setError("Failed to fetch billing data");

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    getSales();
  }, []);


  return (

    <div className="w-full space-y-6">


      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <div>

        <h1 className="text-2xl font-bold text-slate-800">
          Billing
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View and manage customer bills
        </p>

      </div>


      {/* ========================= */}
      {/* ERROR */}
      {/* ========================= */}

      {error && (

        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>

      )}


      {/* ========================= */}
      {/* LOADING */}
      {/* ========================= */}

      {loading ? (

        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
          Loading billing records...
        </div>

      ) : sales.length === 0 ? (

        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
          No billing records found.
        </div>

      ) : (

        /* ========================= */
        /* BILLING LIST */
        /* ========================= */

        <div className="space-y-5">

          {sales.map((sale) => (

            <div
              key={sale.id}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
            >


              {/* BILL HEADER */}

              <div className="flex flex-col justify-between gap-4 border-b border-slate-200 p-6 sm:flex-row">

                <div>

                  <p className="text-xs text-slate-500">
                    Invoice Number
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-blue-600">
                    {sale.invoice_number}
                  </h2>

                </div>


                <div className="sm:text-right">

                  <p className="text-xs text-slate-500">
                    Sale Date
                  </p>

                  <p className="mt-1 font-medium text-slate-700">
                    {sale.sale_date}
                  </p>

                </div>

              </div>


              {/* CUSTOMER */}

              <div className="border-b border-slate-200 p-6">

                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-blue-600">
                  Customer Information
                </h3>


                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

                  <div>

                    <p className="text-xs text-slate-500">
                      Customer
                    </p>

                    <p className="mt-1 font-medium text-slate-800">
                      {sale.customer_id1}
                    </p>

                  </div>


                  <div>

                    <p className="text-xs text-slate-500">
                      Phone
                    </p>

                    <p className="mt-1 font-medium text-slate-800">
                      {sale.customer_phone}
                    </p>

                  </div>


                  <div>

                    <p className="text-xs text-slate-500">
                      Address
                    </p>

                    <p className="mt-1 font-medium text-slate-800">
                      {sale.customer_address}
                    </p>

                  </div>

                </div>

              </div>


              {/* SALE INFORMATION */}

              <div className="border-b border-slate-200 p-6">

                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-blue-600">
                  Sale Information
                </h3>


                <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">

                  <div>

                    <p className="text-xs text-slate-500">
                      Tractor
                    </p>

                    <p className="mt-1 font-medium text-slate-800">
                      {sale.tractor_name}
                    </p>

                  </div>


                  <div>

                    <p className="text-xs text-slate-500">
                      Quantity
                    </p>

                    <p className="mt-1 font-medium text-slate-800">
                      {sale.quantity}
                    </p>

                  </div>


                  <div>

                    <p className="text-xs text-slate-500">
                      Price
                    </p>

                    <p className="mt-1 font-medium text-slate-800">
                      Rs. {Number(sale.price || 0).toLocaleString()}
                    </p>

                  </div>


                  <div>

                    <p className="text-xs text-slate-500">
                      Total
                    </p>

                    <p className="mt-1 font-bold text-blue-600">
                      Rs. {Number(sale.total_amount || 0).toLocaleString()}
                    </p>

                  </div>

                </div>

              </div>


              {/* PAYMENT */}

              <div className="border-b border-slate-200 bg-slate-50 p-6">

                <div className="flex flex-col justify-between gap-4 sm:flex-row">

                  <div>

                    <p className="text-xs text-slate-500">
                      Payment Method
                    </p>

                    <p className="mt-1 font-medium capitalize text-slate-800">
                      {sale.payment_method}
                    </p>

                  </div>


                  <div>

                    <p className="text-xs text-slate-500">
                      Payment Status
                    </p>

                    <span
                      className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                        sale.payment_status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {sale.payment_status}
                    </span>

                  </div>


                  <div>

                    <p className="text-xs text-slate-500">
                      Grand Total
                    </p>

                    <p className="mt-1 text-lg font-bold text-slate-800">
                      Rs. {Number(sale.total_amount || 0).toLocaleString()}
                    </p>

                  </div>

                </div>

              </div>


              {/* ACTIONS */}

              <div className="flex justify-end gap-3 bg-white p-5">

                <button
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  View
                </button>

                <button
                  onClick={() => window.print()}
                  className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
                >
                  Print
                </button>

              </div>


            </div>

          ))}

        </div>

      )}

    </div>

  );
}

export default Billing;