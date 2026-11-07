import { useEffect, useState } from "react";
import axios from "axios";

import {
    Tractor,
    Search,
    Map,
    Gauge,
    IndianRupee,
    Package
} from "lucide-react";


function TractorRecommendation() {

    const [operations, setOperations] = useState([]);

    const [operation, setOperation] = useState("");

    const [landSize, setLandSize] = useState("");

    const [tractors, setTractors] = useState([]);

    const [selectedOperation, setSelectedOperation] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    // ==========================================
    // GET FARMING OPERATIONS
    // ==========================================
    useEffect(() => {

        const getOperations = async () => {

            try {

                const response = await axios.get(
                    "http://localhost:5000/api/agriculture"
                );

                setOperations(response.data.operations);

            } catch (error) {

                console.error(error);

                setError("Failed to load farming operations");
            }
        };


        getOperations();

    }, []);


    // ==========================================
    // FIND SUITABLE TRACTORS
    // ==========================================
    const handleRecommendation = async (e) => {

        e.preventDefault();

        if (!operation) {

            setError("Please select a farming operation");

            return;
        }


        try {

            setLoading(true);

            setError("");

            const response = await axios.get(
                "http://localhost:5000/api/agriculture/recommend",
                {
                    params: {
                        operation: operation,
                        landSize: landSize
                    }
                }
            );


            setSelectedOperation(response.data.operation);

            setTractors(response.data.tractors);

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to find suitable tractors"
            );

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="w-full space-y-6">

            {/* ================================= */}
            {/* PAGE HEADER */}
            {/* ================================= */}

            <div>

                <h1 className="text-2xl font-bold text-slate-800">
                    Tractor Recommendation
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Find suitable showroom tractors based on farming requirements.
                </p>

            </div>


            {/* ================================= */}
            {/* SEARCH CARD */}
            {/* ================================= */}

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-6 flex items-center gap-3">

                    <div className="rounded-lg bg-blue-50 p-3">

                        <Tractor
                            size={25}
                            className="text-blue-600"
                        />

                    </div>


                    <div>

                        <h2 className="font-semibold text-slate-800">
                            Find Suitable Tractor
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Enter farming requirements
                        </p>

                    </div>

                </div>


                <form
                    onSubmit={handleRecommendation}
                    className="grid grid-cols-1 gap-5 md:grid-cols-3"
                >

                    {/* LAND SIZE */}

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Land Size (Acres)
                        </label>

                        <input
                            type="number"
                            min="1"
                            value={landSize}
                            onChange={(e) =>
                                setLandSize(e.target.value)
                            }
                            placeholder="e.g. 20"
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                    </div>


                    {/* OPERATION */}

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Farming Operation
                        </label>

                        <select
                            value={operation}
                            onChange={(e) =>
                                setOperation(e.target.value)
                            }
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >

                            <option value="">
                                Select operation
                            </option>

                            {operations.map((item) => (

                                <option
                                    key={item.id}
                                    value={item.operation_name}
                                >
                                    {item.operation_name}
                                </option>

                            ))}

                        </select>

                    </div>


                    {/* BUTTON */}

                    <div className="flex items-end">

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >

                            <Search size={18} />

                            {loading
                                ? "Searching..."
                                : "Find Suitable Tractors"
                            }

                        </button>

                    </div>

                </form>


                {/* ERROR */}

                {error && (

                    <div className="mt-5 rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-600">
                        {error}
                    </div>

                )}

            </div>


            {/* ================================= */}
            {/* OPERATION INFORMATION */}
            {/* ================================= */}

            {selectedOperation && (

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                        {/* RECOMMENDED HP */}

                        <div className="flex items-center gap-3">

                            <div className="rounded-lg bg-blue-50 p-2">

                                <Gauge
                                    size={21}
                                    className="text-blue-600"
                                />

                            </div>

                            <div>

                                <p className="text-xs text-slate-500">
                                    Recommended HP
                                </p>

                                <p className="font-semibold text-slate-800">
                                    {selectedOperation.min_hp}
                                    {" - "}
                                    {selectedOperation.max_hp} HP
                                </p>

                            </div>

                        </div>


                        {/* LAND SIZE */}

                        <div className="flex items-center gap-3">

                            <div className="rounded-lg bg-blue-50 p-2">

                                <Map
                                    size={21}
                                    className="text-blue-600"
                                />

                            </div>

                            <div>

                                <p className="text-xs text-slate-500">
                                    Land Size
                                </p>

                                <p className="font-semibold text-slate-800">
                                    {landSize
                                        ? `${landSize} Acres`
                                        : "Not specified"
                                    }
                                </p>

                            </div>

                        </div>


                        {/* OPERATION */}

                        <div>

                            <p className="text-xs text-slate-500">
                                Operation
                            </p>

                            <p className="mt-1 font-semibold text-slate-800">
                                {selectedOperation.operation_name}
                            </p>

                        </div>

                    </div>

                </div>

            )}


            {/* ================================= */}
            {/* RESULTS */}
            {/* ================================= */}

            {selectedOperation && (

                <div>

                    {/* RESULTS HEADER */}

                    <div className="mb-5">

                        <h2 className="text-xl font-bold text-slate-800">
                            Suitable Showroom Tractors
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Available tractors matching the recommended horsepower range.
                        </p>

                    </div>


                    {/* NO RESULTS */}

                    {tractors.length === 0 ? (

                        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">

                            <Tractor
                                size={45}
                                className="mx-auto mb-3 text-slate-400"
                            />

                            <h3 className="font-semibold text-slate-700">
                                No suitable tractors found
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                Try another farming operation.
                            </p>

                        </div>

                    ) : (

                        /* TRACTOR CARDS */

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

                            {tractors.map((tractor) => (

                                <div
                                    key={tractor.id}
                                    className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                                >

                                    {/* ================================= */}
                                    {/* IMAGE */}
                                    {/* ================================= */}

                                    <div className="flex h-40 items-center justify-center bg-slate-50">

                                        {tractor.image_url ? (

                                            <img
                                                src={tractor.image_url}
                                                alt={`${tractor.brand} ${tractor.model}`}
                                                className="h-full w-full object-cover"
                                            />

                                        ) : (

                                            <Tractor
                                                size={65}
                                                className="text-blue-600"
                                            />

                                        )}

                                    </div>


                                    {/* ================================= */}
                                    {/* DETAILS */}
                                    {/* ================================= */}

                                    <div className="p-5">

                                        <p className="text-sm font-medium text-blue-600">
                                            {tractor.brand}
                                        </p>

                                        <h3 className="mt-1 text-lg font-bold text-slate-800">
                                            {tractor.model}
                                        </h3>

                                        <p className="text-sm text-slate-500">
                                            {tractor.variant || "Standard Variant"}
                                        </p>


                                        {/* HP + STOCK */}

                                        <div className="mt-4 grid grid-cols-2 gap-3">

                                            {/* HORSEPOWER */}

                                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">

                                                <Gauge
                                                    size={17}
                                                    className="mb-1 text-blue-600"
                                                />

                                                <p className="text-xs text-slate-500">
                                                    Horsepower
                                                </p>

                                                <p className="mt-1 font-semibold text-slate-800">
                                                    {tractor.horsepower} HP
                                                </p>

                                            </div>


                                            {/* STOCK */}

                                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">

                                                <Package
                                                    size={17}
                                                    className="mb-1 text-blue-600"
                                                />

                                                <p className="text-xs text-slate-500">
                                                    Stock
                                                </p>

                                                <p className="mt-1 font-semibold text-slate-800">
                                                    {tractor.stock_quantity}
                                                </p>

                                            </div>

                                        </div>


                                        {/* PRICE */}

                                        <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4">

                                            <IndianRupee
                                                size={18}
                                                className="text-blue-600"
                                            />

                                            <p className="text-lg font-bold text-slate-800">
                                                {Number(
                                                    tractor.selling_price
                                                ).toLocaleString()}
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            )}

        </div>
    );
}


export default TractorRecommendation;