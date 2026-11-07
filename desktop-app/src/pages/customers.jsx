
import axios from "axios";
import { useEffect, useState } from "react";
import { Search, Plus, X, UserRound } from "lucide-react";
import Table from "../components/table.jsx";


function Customers() {

  // ==========================================
  // getting customers api from backend
  // ==========================================

  const [customers, setCustomers] = useState([]);

  // ==========================================
  // LOADING + ERROR
  // ==========================================

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // SEARCH
  // ==========================================

  const [search, setSearch] = useState("");

  // ==========================================
  // ADD CUSTOMER FORM
  // ==========================================

  const [showForm, setShowForm] = useState(false);

  // ==========================================
  // FORM DATA
  // ==========================================

  const [formData, setFormData] = useState({
    customer_code: "",
    name: "",
    phone: "",
    cnic: "",
    email: "",
    address: "",
    city: "",
    notes: "",
  });


  // ==========================================
  // GET CUSTOMERS
  // ==========================================

  const getCustomers = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await axios.get(
        "http://localhost:5000/api/customers"
      );

      setCustomers(response.data);

    } catch (error) {

      console.log("Error fetching customers:", error);

      setError("Failed to fetch customers");

    } finally {

      setLoading(false);

    }
  };


  // ==========================================
  // USE EFFECT
  // ==========================================

  useEffect(() => {

    getCustomers();

  }, []);


  // ==========================================
  // SEARCH FILTER
  // ==========================================

  const filteredCustomers = customers.filter((customer) => {

    const searchText = search.toLowerCase();

    return (
      customer.customer_code?.toLowerCase().includes(searchText) ||
      customer.name?.toLowerCase().includes(searchText) ||
      customer.phone?.toLowerCase().includes(searchText) ||
      customer.cnic?.toLowerCase().includes(searchText) ||
      customer.email?.toLowerCase().includes(searchText) ||
      customer.city?.toLowerCase().includes(searchText)
    );

  });


  // ==========================================
  // SEARCH RESULT CARD
  // ==========================================

  const selectedCustomer =
    search.trim() !== "" && filteredCustomers.length > 0
      ? filteredCustomers[0]
      : null;


  // ==========================================
  // TABLE COLUMNS
  // ==========================================

  const customerColumns = [
    {
      key: "customer_code",
      label: "Code",
    },
    {
      key: "name",
      label: "Name",
    },
    {
      key: "phone",
      label: "Phone",
    },
    {
      key: "cnic",
      label: "CNIC",
    },
    {
      key: "city",
      label: "City",
    },
    {
      key: "status",
      label: "Status",
    },
  ];


  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

  };


  // ==========================================
  // ADD CUSTOMER
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/customers",
        formData
      );

      alert("Customer added successfully");

      // Form reset
      setFormData({
        customer_code: "",
        name: "",
        phone: "",
        cnic: "",
        email: "",
        address: "",
        city: "",
        notes: "",
      });

      // Close form
      setShowForm(false);

      // Get updated customers
      getCustomers();

    } catch (error) {

      console.log("Error adding customer:", error);

      alert(
        error.response?.data?.message ||
        "Failed to add customer"
      );

    }

  };


  // ==========================================
  // RETURN
  // ==========================================

  return (

    <div className="w-full space-y-6">


      {/* ======================================
          HEADER
      ====================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h1 className="text-2xl font-bold text-slate-800">
            Customer Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage showroom customers and their information
          </p>

        </div>


        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >

          {showForm ? (
            <>
              <X size={18} />
              Close
            </>
          ) : (
            <>
              <Plus size={18} />
              Add Customer
            </>
          )}

        </button>

      </div>


      {/* ======================================
          ADD CUSTOMER FORM
      ====================================== */}

      {showForm && (

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-5">

            <h2 className="text-lg font-semibold text-slate-800">
              Add New Customer
            </h2>

            <p className="text-sm text-slate-500">
              Enter customer information below
            </p>

          </div>


          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >


            {/* Customer Code */}

            <div>

              <label className="mb-1 block text-sm font-medium text-slate-600">
                Customer Code
              </label>

              <input
                type="text"
                name="customer_code"
                value={formData.customer_code}
                onChange={handleChange}
                placeholder="CUST-013"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />

            </div>


            {/* Name */}

            <div>

              <label className="mb-1 block text-sm font-medium text-slate-600">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Customer name"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />

            </div>


            {/* Phone */}

            <div>

              <label className="mb-1 block text-sm font-medium text-slate-600">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="03001234567"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />

            </div>


            {/* CNIC */}

            <div>

              <label className="mb-1 block text-sm font-medium text-slate-600">
                CNIC
              </label>

              <input
                type="text"
                name="cnic"
                value={formData.cnic}
                onChange={handleChange}
                placeholder="42101-1234567-1"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />

            </div>


            {/* Email */}

            <div>

              <label className="mb-1 block text-sm font-medium text-slate-600">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="customer@gmail.com"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />

            </div>


            {/* City */}

            <div>

              <label className="mb-1 block text-sm font-medium text-slate-600">
                City
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Hyderabad"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />

            </div>


            {/* Address */}

            <div className="md:col-span-2">

              <label className="mb-1 block text-sm font-medium text-slate-600">
                Address
              </label>

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Customer address"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />

            </div>


            {/* Notes */}

            <div className="md:col-span-2">

              <label className="mb-1 block text-sm font-medium text-slate-600">
                Notes
              </label>

              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Additional notes..."
                rows="3"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />

            </div>


            {/* Submit */}

            <div className="flex justify-end md:col-span-2">

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Add Customer
              </button>

            </div>

          </form>

        </div>

      )}


      {/* ======================================
          SEARCH BOX
      ====================================== */}

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

        <div className="relative w-full">

          <Search
            size={19}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search by name, code, phone, CNIC or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />

        </div>

      </div>


      {/* ======================================
          SEARCH RESULT CARD
      ====================================== */}

      {selectedCustomer && (

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Card Header */}

          <div className="flex items-center gap-3 bg-blue-600 p-5 text-white">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">

              <UserRound size={25} />

            </div>

            <div>

              <p className="text-xs font-medium uppercase tracking-wide text-blue-100">
                Customer Found
              </p>

              <h2 className="text-xl font-bold">
                {selectedCustomer.name}
              </h2>

            </div>

          </div>


          {/* Card Body */}

          <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">


            <div>
              <p className="text-xs text-slate-400">
                Customer Code
              </p>

              <p className="mt-1 font-semibold text-slate-700">
                {selectedCustomer.customer_code}
              </p>
            </div>


            <div>
              <p className="text-xs text-slate-400">
                Phone
              </p>

              <p className="mt-1 font-semibold text-slate-700">
                {selectedCustomer.phone}
              </p>
            </div>


            <div>
              <p className="text-xs text-slate-400">
                CNIC
              </p>

              <p className="mt-1 font-semibold text-slate-700">
                {selectedCustomer.cnic || "N/A"}
              </p>
            </div>


            <div>
              <p className="text-xs text-slate-400">
                City
              </p>

              <p className="mt-1 font-semibold text-slate-700">
                {selectedCustomer.city || "N/A"}
              </p>
            </div>


            <div className="sm:col-span-2 lg:col-span-4">

              <p className="text-xs text-slate-400">
                Email
              </p>

              <p className="mt-1 font-semibold text-slate-700">
                {selectedCustomer.email || "N/A"}
              </p>

            </div>

          </div>

        </div>

      )}


      {/* ======================================
          NO SEARCH RESULT
      ====================================== */}

      {search.trim() !== "" && filteredCustomers.length === 0 && (

        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">

          <UserRound
            size={35}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-3 font-semibold text-slate-700">
            Customer not found
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            No customer matches your search.
          </p>

        </div>

      )}


      {/* ======================================
          ERROR
      ====================================== */}

      {error && (

        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>

      )}


      {/* ======================================
          LOADING
      ====================================== */}

      {loading && (

        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
          Loading customers...
        </div>

      )}


      {/* ======================================
          CUSTOMER TABLE
      ====================================== */}

      {!loading && !error && (

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="mb-4 flex items-center justify-between">

            <div>

              <h2 className="text-lg font-semibold text-slate-800">
                Customer List
              </h2>

              <p className="text-sm text-slate-500">
                {filteredCustomers.length} customer(s) found
              </p>

            </div>

          </div>


          <Table
            columns={customerColumns}
            data={filteredCustomers}
          />

        </div>

      )}

    </div>

  );
}


export default Customers;

