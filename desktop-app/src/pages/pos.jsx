import axios from "axios";
import { useEffect, useState } from "react";
import {
  Search,
  User,
  Tractor,
  Receipt,
  CreditCard,
  X,
  CheckCircle,
} from "lucide-react";

function POS() {
  // =========================
  // CUSTOMERS & TRACTORS
  // =========================

  const [customers, setCustomers] = useState([]);
  const [tractors, setTractors] = useState([]);

  const [customerSearch, setCustomerSearch] = useState("");
  const [tractorSearch, setTractorSearch] = useState("");

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedTractor, setSelectedTractor] = useState(null);

  // =========================
  // SALE DATA
  // =========================

  const [saleData, setSaleData] = useState({
    sale_price: "",
    discount: "",
    paid_amount: "",
    payment_method: "cash",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =========================
  // GET CUSTOMERS
  // =========================

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/customers"
        );

        setCustomers(response.data);
      } catch (error) {
        console.log("Error fetching customers:", error);
        setError("Failed to load customers");
      }
    };

    fetchCustomers();
  }, []);

  // =========================
  // GET TRACTORS
  // =========================

  useEffect(() => {
    const fetchTractors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/tractors"
        );

        setTractors(response.data);
      } catch (error) {
        console.log("Error fetching tractors:", error);
        setError("Failed to load tractors");
      }
    };

    fetchTractors();
  }, []);

  // =========================
  // CUSTOMER SEARCH
  // =========================

  const filteredCustomers = customers.filter((customer) => {
    const search = customerSearch.toLowerCase();

    return (
      customer.name?.toLowerCase().includes(search) ||
      customer.customer_code?.toLowerCase().includes(search) ||
      customer.phone?.toLowerCase().includes(search) ||
      customer.cnic?.toLowerCase().includes(search)
    );
  });

  // =========================
  // TRACTOR SEARCH
  // =========================

  const filteredTractors = tractors.filter((tractor) => {
    const search = tractorSearch.toLowerCase();

    return (
      tractor.brand?.toLowerCase().includes(search) ||
      tractor.model?.toLowerCase().includes(search) ||
      tractor.tractor_code?.toLowerCase().includes(search)
    );
  });

  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSaleData({
      ...saleData,
      [name]: value,
    });
  };

  // =========================
  // SELECT CUSTOMER
  // =========================

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setCustomerSearch("");
  };

  // =========================
  // SELECT TRACTOR
  // =========================

  const handleSelectTractor = (tractor) => {
    setSelectedTractor(tractor);
    setTractorSearch("");

    // Tractor ki selling price automatically form mein aa jayegi
    setSaleData((previous) => ({
      ...previous,
      sale_price: tractor.selling_price || "",
    }));
  };

  // =========================
  // CALCULATIONS
  // =========================

  const salePrice = Number(saleData.sale_price) || 0;
  const discount = Number(saleData.discount) || 0;
  const paidAmount = Number(saleData.paid_amount) || 0;

  const totalAmount = Math.max(salePrice - discount, 0);

  const remainingAmount = Math.max(totalAmount - paidAmount, 0);

  // =========================
  // CREATE SALE
  // =========================

  const handleCreateSale = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    // Customer check
    if (!selectedCustomer) {
      setError("Please select a customer");
      return;
    }

    // Tractor check
    if (!selectedTractor) {
      setError("Please select a tractor");
      return;
    }

    // Sale price check
    if (salePrice <= 0) {
      setError("Please enter a valid sale price");
      return;
    }

    // Paid amount cannot be greater than total
    if (paidAmount > totalAmount) {
      setError("Paid amount cannot be greater than total amount");
      return;
    }

    try {
      setLoading(true);

      // Simple invoice number
      const invoiceNumber = `INV-${Date.now()}`;

      const salePayload = {
        invoice_number: invoiceNumber,

        customer_id: selectedCustomer.id,

        tractor_id: selectedTractor.id,

        sale_price: salePrice,

        discount: discount,

        total_amount: totalAmount,

        paid_amount: paidAmount,

        remaining_amount: remainingAmount,

        payment_method: saleData.payment_method,

        notes: saleData.notes,
      };

      // POST sale to backend
      const response = await axios.post(
        "http://localhost:5000/api/sales",
        salePayload
      );

      console.log("Sale created:", response.data);

      setMessage("Sale created successfully!");

      // Reset form
      setSelectedCustomer(null);
      setSelectedTractor(null);

      setSaleData({
        sale_price: "",
        discount: "",
        paid_amount: "",
        payment_method: "cash",
        notes: "",
      });
    } catch (error) {
      console.log("Error creating sale:", error);

      setError(
        error.response?.data?.message ||
          "Failed to create sale"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // CANCEL / RESET
  // =========================

  const handleCancel = () => {
    setSelectedCustomer(null);
    setSelectedTractor(null);

    setCustomerSearch("");
    setTractorSearch("");

    setSaleData({
      sale_price: "",
      discount: "",
      paid_amount: "",
      payment_method: "cash",
      notes: "",
    });

    setMessage("");
    setError("");
  };

  return (
    <div className="w-full space-y-6">

      {/* ================= HEADER ================= */}

      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          New Sale / POS
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Create a new tractor sale and record customer payment
        </p>
      </div>

      {/* ================= SUCCESS ================= */}

      {message && (
        <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          <CheckCircle size={20} />
          {message}
        </div>
      )}

      {/* ================= ERROR ================= */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleCreateSale}>

        {/* ================= CUSTOMER ================= */}

        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-5 flex items-center gap-3">

            <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
              <User size={22} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Customer
              </h2>

              <p className="text-sm text-slate-500">
                Search and select an existing customer
              </p>
            </div>

          </div>

          {/* Search */}

          {!selectedCustomer && (
            <>
              <div className="relative">

                <Search
                  className="absolute left-3 top-3 text-slate-400"
                  size={20}
                />

                <input
                  type="text"
                  placeholder="Search by name, code, phone or CNIC..."
                  value={customerSearch}
                  onChange={(e) =>
                    setCustomerSearch(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Customer results */}

              {customerSearch && (
                <div className="mt-3 max-h-52 overflow-y-auto rounded-xl border border-slate-200 bg-white">

                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => (
                      <button
                        type="button"
                        key={customer.id}
                        onClick={() =>
                          handleSelectCustomer(customer)
                        }
                        className="w-full border-b border-slate-100 p-4 text-left transition last:border-0 hover:bg-slate-50"
                      >
                        <p className="font-semibold text-slate-800">
                          {customer.name}
                        </p>

                        <p className="text-sm text-slate-500">
                          {customer.customer_code} •{" "}
                          {customer.phone}
                        </p>
                      </button>
                    ))
                  ) : (
                    <p className="p-4 text-sm text-slate-500">
                      No customer found
                    </p>
                  )}

                </div>
              )}
            </>
          )}

          {/* Selected Customer */}

          {selectedCustomer && (
            <div className="flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50 p-4">

              <div>
                <p className="font-semibold text-slate-800">
                  {selectedCustomer.name}
                </p>

                <p className="text-sm text-slate-500">
                  {selectedCustomer.customer_code} •{" "}
                  {selectedCustomer.phone}
                </p>

                <p className="text-sm text-slate-500">
                  {selectedCustomer.city}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                className="rounded-lg p-2 text-red-500 transition hover:bg-red-100"
              >
                <X size={20} />
              </button>

            </div>
          )}

        </div>

        {/* ================= TRACTOR ================= */}

        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-5 flex items-center gap-3">

            <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
              <Tractor size={22} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Tractor
              </h2>

              <p className="text-sm text-slate-500">
                Search and select an available tractor
              </p>
            </div>

          </div>

          {/* Search */}

          {!selectedTractor && (
            <>
              <div className="relative">

                <Search
                  className="absolute left-3 top-3 text-slate-400"
                  size={20}
                />

                <input
                  type="text"
                  placeholder="Search by brand, model or tractor code..."
                  value={tractorSearch}
                  onChange={(e) =>
                    setTractorSearch(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* Tractor results */}

              {tractorSearch && (
                <div className="mt-3 max-h-60 overflow-y-auto rounded-xl border border-slate-200 bg-white">

                  {filteredTractors.length > 0 ? (
                    filteredTractors.map((tractor) => (

                      <button
                        type="button"
                        key={tractor.id}
                        onClick={() =>
                          handleSelectTractor(tractor)
                        }
                        disabled={Number(tractor.stock_quantity) <= 0}
                        className="flex w-full items-center justify-between border-b border-slate-100 p-4 text-left transition last:border-0 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >

                        <div>
                          <p className="font-semibold text-slate-800">
                            {tractor.brand} {tractor.model}
                          </p>

                          <p className="text-sm text-slate-500">
                            {tractor.tractor_code}
                          </p>
                        </div>

                        <div className="text-right">

                          <p className="font-semibold text-slate-800">
                            Rs.{" "}
                            {Number(
                              tractor.selling_price
                            ).toLocaleString()}
                          </p>

                          <p className="text-sm text-slate-500">
                            Stock: {tractor.stock_quantity}
                          </p>

                        </div>

                      </button>

                    ))
                  ) : (
                    <p className="p-4 text-sm text-slate-500">
                      No tractor found
                    </p>
                  )}

                </div>
              )}
            </>
          )}

          {/* Selected Tractor */}

          {selectedTractor && (
            <div className="flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50 p-4">

              <div>
                <p className="font-semibold text-slate-800">
                  {selectedTractor.brand}{" "}
                  {selectedTractor.model}
                </p>

                <p className="text-sm text-slate-500">
                  Code: {selectedTractor.tractor_code}
                </p>

                <p className="text-sm text-slate-500">
                  Stock: {selectedTractor.stock_quantity}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedTractor(null);

                  setSaleData((previous) => ({
                    ...previous,
                    sale_price: "",
                  }));
                }}
                className="rounded-lg p-2 text-red-500 transition hover:bg-red-100"
              >
                <X size={20} />
              </button>

            </div>
          )}

        </div>

        {/* ================= SALE DETAILS ================= */}

        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-5 flex items-center gap-3">

            <div className="rounded-lg bg-purple-100 p-2 text-purple-600">
              <Receipt size={22} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Sale Details
              </h2>

              <p className="text-sm text-slate-500">
                Enter pricing and discount information
              </p>
            </div>

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            {/* Sale Price */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Sale Price
              </label>

              <input
                type="number"
                name="sale_price"
                value={saleData.sale_price}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Discount */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Discount
              </label>

              <input
                type="number"
                name="discount"
                value={saleData.discount}
                onChange={handleChange}
                placeholder="0"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

          </div>

          {/* Total */}

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-5">

            <div className="flex justify-between text-sm text-slate-500">
              <span>Sale Price</span>

              <span>
                Rs. {salePrice.toLocaleString()}
              </span>
            </div>

            <div className="mt-2 flex justify-between text-sm text-slate-500">
              <span>Discount</span>

              <span>
                - Rs. {discount.toLocaleString()}
              </span>
            </div>

            <div className="my-3 border-t border-slate-200"></div>

            <div className="flex justify-between text-xl font-bold text-slate-800">
              <span>Total Amount</span>

              <span>
                Rs. {totalAmount.toLocaleString()}
              </span>
            </div>

          </div>

        </div>

        {/* ================= PAYMENT ================= */}

        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-5 flex items-center gap-3">

            <div className="rounded-lg bg-orange-100 p-2 text-orange-600">
              <CreditCard size={22} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Payment
              </h2>

              <p className="text-sm text-slate-500">
                Record customer's payment
              </p>
            </div>

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            {/* Payment Method */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Payment Method
              </label>

              <select
                name="payment_method"
                value={saleData.payment_method}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="cash">Cash</option>

                <option value="bank">Bank</option>

                <option value="installment">
                  Installment
                </option>
              </select>
            </div>

            {/* Paid Amount */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Paid Amount
              </label>

              <input
                type="number"
                name="paid_amount"
                value={saleData.paid_amount}
                onChange={handleChange}
                placeholder="0"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

          </div>

          {/* Remaining */}

          <div className="mt-5 rounded-xl border border-orange-200 bg-orange-50 p-5">

            <div className="flex justify-between">

              <span className="font-medium text-slate-700">
                Remaining Amount
              </span>

              <span className="text-xl font-bold text-orange-600">
                Rs. {remainingAmount.toLocaleString()}
              </span>

            </div>

          </div>

          {/* Notes */}

          <div className="mt-5">

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Notes
            </label>

            <textarea
              name="notes"
              value={saleData.notes}
              onChange={handleChange}
              rows="3"
              placeholder="Optional notes about this sale..."
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>

        </div>

        {/* ================= BUTTONS ================= */}

        <div className="flex justify-end gap-3">

          <button
            type="button"
            onClick={handleCancel}
            className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating Sale..." : "Create Sale"}
          </button>

        </div>

      </form>
    </div>
  );
}

export default POS;