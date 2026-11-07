import axios from "axios";
import { useState, useEffect } from "react";

function Customer360() {
  const [customers, setCustomers] = useState([]);

  const [loaidng, setLoaidng] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  // get all the data
  const getAllcustomers = async () => {
    try {
      setError("");
      setLoaidng(true);

      const response = await axios.get(
        "http://localhost:5000/api/customers"
      );
      setCustomers(response.data);
    } catch (error) {
      console.log("Error fetching customer", error);
    } finally {
      setLoaidng(false);
    }
  };

  const filterCustomers = customers.filter((customers) => {
    const searchText = search.toLowerCase();

    return (
      customers.customer_code?.toLowerCase().includes(searchText) ||
      customers.name?.toLowerCase().includes(searchText) ||
      customers.phone?.toLowerCase().includes(searchText) ||
      customers.cnic?.toLowerCase().includes(searchText) ||
      customers.email?.toLowerCase().includes(searchText) ||
      customers.city?.toLowerCase().includes(searchText)
    );
  });

  useEffect(() => {
    getAllcustomers();
  }, []);

  return (
    <>
      <div className="w-full space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Customer360
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Complete customer profile, purchases and payment history
          </p>
        </div>

        {/* Search */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by code, name, phone, city, CNIC or email"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Loading */}
        {loaidng && (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm text-slate-500">
              Loading customers...
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Customer Cards */}
        {!loaidng && !error && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filterCustomers.map((customer) => (
              <div
                key={customer.id}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                {/* Card Header */}
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">
                      {customer.name}
                    </h2>

                    <p className="text-sm text-slate-500">
                      {customer.customer_code}
                    </p>
                  </div>

                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                    Customer
                  </span>
                </div>

                {/* Customer Details */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">
                      Phone
                    </span>

                    <span className="font-medium text-slate-700">
                      {customer.phone || "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">
                      CNIC
                    </span>

                    <span className="font-medium text-slate-700">
                      {customer.cnic || "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">
                      Email
                    </span>

                    <span className="font-medium text-slate-700">
                      {customer.email || "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">
                      City
                    </span>

                    <span className="font-medium text-slate-700">
                      {customer.city || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No result */}
        {!loaidng && filterCustomers.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-sm text-slate-500">
              No customer found.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Customer360;