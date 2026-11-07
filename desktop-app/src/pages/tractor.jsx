// Tractor.jsx

import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/card";
import Table from "../components/table";

function Tractor() {
  const [tractor, setTractor] = useState([]);

  // error
  const [error, setError] = useState("");

  // loading state
  const [load, setLoad] = useState(true);

  // search
  const [search, setSearch] = useState("");

  const [showform, setShowform] = useState(false);

  const getData = async () => {
    try {
      setLoad(true);
      setError("");

      const response = await axios.get(
        "http://localhost:5000/api/tractors"
      );

      setTractor(response.data);
    } catch (error) {
      console.log("error fetching data", error);
      setError("Failed to fetch tractors");
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // =========================
  // CARD DATA
  // =========================

  const totalTractors = tractor.length;

  // tractors which have stock
  const inStock = tractor.filter(
    (tractor) => tractor.stock_quantity > 0
  ).length;

  // tractors which are low in stock
  const lowStock = tractor.filter(
    (tractor) =>
      tractor.stock_quantity > 0 &&
      tractor.stock_quantity <= tractor.low_stock_limit
  ).length;

  // out of stock
  const outOfStock = tractor.filter(
    (tractor) => tractor.stock_quantity === 0
  ).length;

  // =========================
  // SEARCH TRACTORS
  // =========================

  const filteredTractors = tractor.filter((tractor) => {
    const searchText = search.toLowerCase();

    return (
      tractor.tractor_code?.toLowerCase().includes(searchText) ||
      tractor.brand?.toLowerCase().includes(searchText) ||
      tractor.model?.toLowerCase().includes(searchText) ||
      tractor.engine_number?.toLowerCase().includes(searchText) ||
      tractor.chassis_number?.toLowerCase().includes(searchText)
    );
  });

  // =========================
  // TABLE COLUMNS
  // =========================

  const tractorColumns = [
    { key: "tractor_code", label: "Code" },
    { key: "brand", label: "Brand" },
    { key: "model", label: "Model" },
    { key: "engine_number", label: "Engine" },
    { key: "chassis_number", label: "Chassis" },
    { key: "stock_quantity", label: "Stock" },
  ];

  return (
    <>
      <div className="w-full space-y-6">

        {/* =========================
            PAGE HEADER
        ========================= */}

        <div className="mb-12 mt-4 flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Tractor Management
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your showroom tractors, inventory and stock
            </p>
          </div>

          {/* ADD TRACTOR BUTTON */}

          <button
            onClick={() => setShowform(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
          >
            + Add Tractor
          </button>

        </div>


        {/* =========================
            ADD TRACTOR FORM
        ========================= */}

        {showform && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl">

              {/* FORM */}

              <form className="space-y-7 p-6">

                {/* =========================
                    BASIC INFORMATION
                ========================= */}

                <div>
                  <h3 className="mb-4 text-sm font-semibold uppercase text-blue-600">
                    Basic Information
                  </h3>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                    <input
                      type="text"
                      placeholder="Brand"
                      className="rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />

                    <input
                      type="text"
                      placeholder="Model"
                      className="rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />

                    <input
                      type="text"
                      placeholder="Variant"
                      className="rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />

                    <input
                      type="text"
                      placeholder="Tractor Code"
                      className="rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />

                    <input
                      type="text"
                      placeholder="Engine Number"
                      className="rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />

                    <input
                      type="text"
                      placeholder="Chassis Number"
                      className="rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />

                    <input
                      type="number"
                      placeholder="Manufacturing Year"
                      className="rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />

                  </div>
                </div>


                {/* =========================
                    PRICE & STOCK
                ========================= */}

                <div>
                  <h3 className="mb-4 text-sm font-semibold uppercase text-blue-600">
                    Price & Stock
                  </h3>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-4">

                    <input
                      type="number"
                      placeholder="Purchase Price"
                      className="rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />

                    <input
                      type="number"
                      placeholder="Selling Price"
                      className="rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />

                    <input
                      type="number"
                      placeholder="Stock Quantity"
                      className="rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />

                    <input
                      type="number"
                      placeholder="Low Stock Limit"
                      defaultValue="2"
                      className="rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />

                  </div>
                </div>


                {/* =========================
                    SPECIFICATIONS
                ========================= */}

                <div>
                  <h3 className="mb-4 text-sm font-semibold uppercase text-blue-600">
                    Specifications
                  </h3>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-4">

                    <input
                      type="number"
                      placeholder="Horsepower"
                      className="rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />

                    <select
                      className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Transmission</option>
                      <option value="Manual">Manual</option>
                      <option value="Automatic">Automatic</option>
                    </select>

                    <select
                      className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Fuel Type</option>
                      <option value="Diesel">Diesel</option>
                    </select>

                    <input
                      type="text"
                      placeholder="Color"
                      className="rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />

                  </div>
                </div>


                {/* =========================
                    SUPPLIER
                ========================= */}

                <div>
                  <h3 className="mb-4 text-sm font-semibold uppercase text-blue-600">
                    Supplier Information
                  </h3>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    <input
                      type="text"
                      placeholder="Supplier Name"
                      className="rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />

                    <input
                      type="text"
                      placeholder="Supplier Contact"
                      className="rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />

                  </div>
                </div>


                {/* =========================
                    WARRANTY & STATUS
                ========================= */}

                <div>
                  <h3 className="mb-4 text-sm font-semibold uppercase text-blue-600">
                    Warranty & Status
                  </h3>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    <input
                      type="number"
                      placeholder="Warranty Months"
                      className="rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />

                    <select
                      className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="available">
                        Available
                      </option>

                      <option value="low_stock">
                        Low Stock
                      </option>

                      <option value="out_of_stock">
                        Out of Stock
                      </option>

                      <option value="inactive">
                        Inactive
                      </option>
                    </select>

                  </div>
                </div>


                {/* =========================
                    DESCRIPTION
                ========================= */}

                <div>
                  <h3 className="mb-4 text-sm font-semibold uppercase text-blue-600">
                    Additional Information
                  </h3>

                  <textarea
                    rows="4"
                    placeholder="Enter tractor description..."
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  ></textarea>
                </div>


                {/* =========================
                    IMAGE
                ========================= */}

                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Tractor Image URL
                  </label>

                  <input
                    type="text"
                    placeholder="https://example.com/tractor.jpg"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />

                </div>


                {/* =========================
                    BUTTONS
                ========================= */}

                <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">

                  <button
                    type="button"
                    onClick={() => setShowform(false)}
                    className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
                  >
                    Add Tractor
                  </button>

                </div>

              </form>

            </div>

          </div>
        )}


        {/* =========================
            STAT CARDS
        ========================= */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <Card
            title="Total Tractors"
            value={totalTractors}
          />

          <Card
            title="In Stock"
            value={inStock}
          />

          <Card
            title="Low Stock"
            value={lowStock}
          />

          <Card
            title="Out of Stock"
            value={outOfStock}
          />

        </div>


        {/* =========================
            SEARCH BOX
        ========================= */}

        <div className="flex w-full flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">

          <input
            type="text"
            placeholder="Search by code, brand, model, engine..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />

        </div>


        {/* =========================
            ERROR
        ========================= */}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}


        {/* =========================
            LOADING
        ========================= */}

        {load && (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-center text-slate-500 shadow-sm">
            Loading tractors...
          </div>
        )}


        {/* =========================
            TABLE
        ========================= */}

        {!load && !error && (
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="mb-4">

              <h2 className="text-lg font-semibold text-slate-800">
                Tractor List
              </h2>

              <p className="text-sm text-slate-500">
                {filteredTractors.length} tractor(s) found
              </p>

            </div>

            <Table
              columns={tractorColumns}
              data={filteredTractors}
            />

          </div>
        )}

      </div>
    </>
  );
}

export default Tractor;