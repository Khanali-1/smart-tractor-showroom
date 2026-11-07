import axios from "axios";
import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function Barcode() {
  // API se aane wale tractors
  const [tractors, setTractors] = useState([]);

  // Search input
  const [search, setSearch] = useState("");

  // Selected tractor
  const [selectedTractor, setSelectedTractor] = useState(null);

  // Loading
  const [loading, setLoading] = useState(true);

  // Error
  const [error, setError] = useState("");

  // Get tractors from backend
  const getTractors = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "http://localhost:5000/api/tractors"
      );

      setTractors(response.data);
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

  // Search / filter tractors
  const filteredTractors = tractors.filter((tractor) => {
    const searchText = search.toLowerCase();

    return (
      tractor.tractor_code?.toLowerCase().includes(searchText) ||
      tractor.brand?.toLowerCase().includes(searchText) ||
      tractor.model?.toLowerCase().includes(searchText) ||
      tractor.engine_number?.toLowerCase().includes(searchText)
    );
  });

  // Download QR
  const downloadQR = () => {
    if (!selectedTractor) return;

    const canvas = document.getElementById("tractor-qr");

    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");

    link.href = image;
    link.download = `${selectedTractor.tractor_code}-QR.png`;

    link.click();
  };

  // Print QR
  const printQR = () => {
    if (!selectedTractor) return;

    const canvas = document.getElementById("tractor-qr");

    const image = canvas.toDataURL("image/png");

    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
      <html>
        <head>
          <title>${selectedTractor.tractor_code} QR Code</title>
        </head>

        <body style="text-align:center; font-family:Arial; padding-top:40px;">

          <h2>${selectedTractor.brand} ${selectedTractor.model}</h2>

          <img src="${image}" />

          <h3>${selectedTractor.tractor_code}</h3>

        </body>
      </html>
    `);

    printWindow.document.close();

    printWindow.onload = () => {
      printWindow.print();
    };
  };

  return (
    <div className="w-full space-y-6">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Barcode & QR Code
          </h1>

          <p className="text-sm text-slate-500">
            Generate QR codes for your tractors
          </p>
        </div>

      </div>


      {/* =========================
          SEARCH
      ========================= */}

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

        <h2 className="mb-3 text-lg font-semibold text-slate-800">
          Find Tractor
        </h2>

        <input
          type="text"
          placeholder="Search by code, brand, model, engine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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

      {loading && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-center text-slate-500 shadow-sm">
          Loading tractors...
        </div>
      )}


      {/* =========================
          TRACTOR LIST
      ========================= */}

      {!loading && !error && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="mb-4">

            <h2 className="text-lg font-semibold text-slate-800">
              Select Tractor
            </h2>

            <p className="text-sm text-slate-500">
              {filteredTractors.length} tractor(s) found
            </p>

          </div>


          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead className="border-b border-slate-200 bg-slate-50">

                <tr>

                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Code
                  </th>

                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Brand
                  </th>

                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Model
                  </th>

                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Engine
                  </th>

                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredTractors.map((tractor) => (

                  <tr
                    key={tractor.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >

                    <td className="px-4 py-4 text-sm font-medium text-slate-800">
                      {tractor.tractor_code}
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-600">
                      {tractor.brand}
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-600">
                      {tractor.model}
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-600">
                      {tractor.engine_number}
                    </td>

                    <td className="px-4 py-4">

                      <button
                        onClick={() => setSelectedTractor(tractor)}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
                      >
                        Generate QR
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>
      )}


      {/* =========================
          QR RESULT
      ========================= */}

      {selectedTractor && (

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-6">

            <h2 className="text-xl font-semibold text-slate-800">
              Tractor QR Code
            </h2>

            <p className="text-sm text-slate-500">
              QR code for {selectedTractor.tractor_code}
            </p>

          </div>


          <div className="flex flex-col items-center gap-5">


            {/* =========================
                QR CODE
            ========================= */}

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

              <QRCodeCanvas
                id="tractor-qr"
                value={selectedTractor.tractor_code}
                size={220}
                level="H"
              />

            </div>


            {/* =========================
                TRACTOR INFORMATION
            ========================= */}

            <div className="text-center">

              <h3 className="text-lg font-semibold text-slate-800">
                {selectedTractor.brand} {selectedTractor.model}
              </h3>

              <p className="text-sm text-slate-500">
                Tractor Code: {selectedTractor.tractor_code}
              </p>

            </div>


            {/* =========================
                BUTTONS
            ========================= */}

            <div className="flex flex-wrap justify-center gap-3">

              <button
                onClick={downloadQR}
                className="rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-900"
              >
                Download QR
              </button>

              <button
                onClick={printQR}
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
              >
                Print QR
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Barcode;