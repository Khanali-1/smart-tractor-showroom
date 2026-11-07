import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/card.jsx";

function Stockalert() {

  const [tractor, setTractor] = useState([]);

  // Search input
  const [search, setSearch] = useState("");

  // Loading
  const [loading, setLoading] = useState(true);

  // Error
  const [error, setError] = useState("");


  // =========================
  // GET TRACTORS FROM BACKEND
  // =========================

  const getTractors = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await axios.get(
        "http://localhost:5000/api/tractors"
      );

      setTractor(response.data);

    } catch (error) {

      console.log("Error fetching tractors:", error);

      setError("Failed to fetch tractors");

    } finally {

      setLoading(false);

    }
  };


  // API call when page loads
  useEffect(() => {
    getTractors();
  }, []);


  // =========================
  // STOCK COUNTS
  // =========================

  // Total tractors which have stock
  const inStock = tractor.filter(
    (tractor) => Number(tractor.stock_quantity) > 0
  ).length;


  // Low stock tractors
  const lowStock = tractor.filter(
    (tractor) =>
      Number(tractor.stock_quantity) > 0 &&
      Number(tractor.stock_quantity) <=
        Number(tractor.low_stock_limit)
  ).length;


  // Out of stock tractors
  const outOfStock = tractor.filter(
    (tractor) => Number(tractor.stock_quantity) === 0
  ).length;


  // =========================
  // SEARCH + STOCK ALERT FILTER
  // =========================

  const filteredTractors = tractor
    .filter((tractor) => {

      const searchText = search.toLowerCase();

      return (
        tractor.tractor_code
          ?.toLowerCase()
          .includes(searchText) ||

        tractor.brand
          ?.toLowerCase()
          .includes(searchText) ||

        tractor.model
          ?.toLowerCase()
          .includes(searchText) ||

        tractor.engine_number
          ?.toLowerCase()
          .includes(searchText) ||

        tractor.chassis_number
          ?.toLowerCase()
          .includes(searchText)
      );

    })

    // Only low-stock and out-of-stock tractors
    .filter((tractor) => {

      const stock = Number(tractor.stock_quantity);
      const limit = Number(tractor.low_stock_limit);

      return stock <= limit;

    });


  return (

    <div className="w-full space-y-6">


      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <div>

        <h1 className="text-2xl font-bold text-slate-800">
          Stock Alerts
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Monitor low-stock and out-of-stock tractors
        </p>

      </div>


      {/* ========================= */}
      {/* CARDS */}
      {/* ========================= */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

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


      {/* ========================= */}
      {/* SEARCH BOX */}
      {/* ========================= */}

      <div className="w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

        <input
          type="text"
          placeholder="Search by code, brand, model, engine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />

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

      {loading && (

        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-sm">

          Loading stock alerts...

        </div>

      )}


      {/* ========================= */}
      {/* STOCK ALERT TABLE */}
      {/* ========================= */}

      {!loading && (

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 px-6 py-4">

            <h2 className="text-lg font-semibold text-slate-800">
              Stock Alert List
            </h2>

            <p className="text-sm text-slate-500">
              Tractors that need stock attention
            </p>

          </div>


          {filteredTractors.length === 0 ? (

            <div className="p-8 text-center text-sm text-slate-500">

              No stock alerts found.

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full text-left text-sm">

                <thead className="border-b border-slate-200 bg-slate-50">

                  <tr>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Tractor Code
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Brand
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Model
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Current Stock
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Minimum Stock
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </th>

                  </tr>

                </thead>


                <tbody className="divide-y divide-slate-100">

                  {filteredTractors.map((tractor) => {

                    const stock = Number(
                      tractor.stock_quantity
                    );

                    const limit = Number(
                      tractor.low_stock_limit
                    );


                    return (

                      <tr
                        key={tractor.id}
                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                      >

                        <td className="px-6 py-4 font-medium text-slate-700">
                          {tractor.tractor_code}
                        </td>

                        <td className="px-6 py-4 text-slate-600">
                          {tractor.brand}
                        </td>

                        <td className="px-6 py-4 text-slate-600">
                          {tractor.model}
                        </td>

                        <td
                          className={`px-6 py-4 font-bold ${
                            stock === 0
                              ? "text-red-600"
                              : "text-orange-500"
                          }`}
                        >
                          {stock}
                        </td>

                        <td className="px-6 py-4 text-slate-600">
                          {limit}
                        </td>

                        <td className="px-6 py-4">

                          {stock === 0 ? (

                            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                              Out of Stock
                            </span>

                          ) : (

                            <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                              Low Stock
                            </span>

                          )}

                        </td>

                      </tr>

                    );

                  })}

                </tbody>

              </table>

            </div>

          )}

        </div>

      )}

    </div>

  );
}

export default Stockalert;