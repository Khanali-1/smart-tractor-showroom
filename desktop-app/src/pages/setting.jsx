import { useState } from "react";

import {
    Settings as SettingsIcon,
    User,
    Lock,
    Bell,
    Database,
    Save
} from "lucide-react";


const Settings = () => {

    // ==============================
    // STATES
    // ==============================

    const [settings, setSettings] = useState({
        showroomName: "Smart Tractor Showroom",
        phone: "",
        email: "",
        address: "",
        notifications: true,
        lowStockAlerts: true
    });


    // ==============================
    // HANDLE INPUT
    // ==============================

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setSettings({
            ...settings,
            [name]: type === "checkbox" ? checked : value
        });
    };


    // ==============================
    // SAVE SETTINGS
    // ==============================

    const handleSave = (e) => {

        e.preventDefault();

        // For now settings are saved in browser
        localStorage.setItem(
            "showroomSettings",
            JSON.stringify(settings)
        );

        alert("Settings saved successfully");
    };


    return (

        <div className="w-full space-y-6">

            {/* ================================= */}
            {/* HEADER */}
            {/* ================================= */}

            <div>

                <div className="flex items-center gap-3">

                    <div className="rounded-lg bg-blue-50 p-3">

                        <SettingsIcon
                            size={24}
                            className="text-blue-600"
                        />

                    </div>


                    <div>

                        <h1 className="text-2xl font-bold text-slate-800">
                            Settings
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage showroom application settings
                        </p>

                    </div>

                </div>

            </div>


            {/* ================================= */}
            {/* SETTINGS CONTAINER */}
            {/* ================================= */}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">


                {/* ================================= */}
                {/* SETTINGS MENU */}
                {/* ================================= */}

                <div className="h-fit rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

                    <h2 className="mb-4 font-semibold text-slate-800">
                        Settings
                    </h2>


                    <div className="space-y-2">


                        {/* SHOWROOM PROFILE */}

                        <button
                            className="flex w-full items-center gap-3 rounded-lg bg-blue-50 px-4 py-3 text-left text-blue-700"
                        >

                            <User size={19} />

                            Showroom Profile

                        </button>


                        {/* SECURITY */}

                        <button
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-slate-600 transition hover:bg-slate-50"
                        >

                            <Lock size={19} />

                            Security

                        </button>


                        {/* NOTIFICATIONS */}

                        <button
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-slate-600 transition hover:bg-slate-50"
                        >

                            <Bell size={19} />

                            Notifications

                        </button>


                        {/* DATABASE */}

                        <button
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-slate-600 transition hover:bg-slate-50"
                        >

                            <Database size={19} />

                            Database

                        </button>

                    </div>

                </div>


                {/* ================================= */}
                {/* SETTINGS FORM */}
                {/* ================================= */}

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">


                    {/* FORM HEADER */}

                    <div className="mb-6">

                        <h2 className="text-lg font-semibold text-slate-800">
                            Showroom Profile
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Update your showroom information
                        </p>

                    </div>


                    <form onSubmit={handleSave}>


                        {/* ================================= */}
                        {/* SHOWROOM NAME */}
                        {/* ================================= */}

                        <div className="mb-5">

                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                Showroom Name
                            </label>

                            <input
                                type="text"
                                name="showroomName"
                                value={settings.showroomName}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                        </div>


                        {/* ================================= */}
                        {/* PHONE */}
                        {/* ================================= */}

                        <div className="mb-5">

                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                Phone Number
                            </label>

                            <input
                                type="text"
                                name="phone"
                                value={settings.phone}
                                onChange={handleChange}
                                placeholder="03XX-XXXXXXX"
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                        </div>


                        {/* ================================= */}
                        {/* EMAIL */}
                        {/* ================================= */}

                        <div className="mb-5">

                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={settings.email}
                                onChange={handleChange}
                                placeholder="showroom@example.com"
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                        </div>


                        {/* ================================= */}
                        {/* ADDRESS */}
                        {/* ================================= */}

                        <div className="mb-6">

                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                Address
                            </label>

                            <textarea
                                name="address"
                                value={settings.address}
                                onChange={handleChange}
                                rows="3"
                                placeholder="Enter showroom address"
                                className="w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                        </div>


                        {/* ================================= */}
                        {/* NOTIFICATIONS */}
                        {/* ================================= */}

                        <div className="mb-6 border-t border-slate-200 pt-5">

                            <div className="mb-4">

                                <h3 className="font-semibold text-slate-800">
                                    Notifications
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    Configure system alerts and notifications
                                </p>

                            </div>


                            {/* ENABLE NOTIFICATIONS */}

                            <label className="mb-4 flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-white">

                                <div>

                                    <p className="font-medium text-slate-700">
                                        Enable Notifications
                                    </p>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Receive system notifications
                                    </p>

                                </div>


                                <input
                                    type="checkbox"
                                    name="notifications"
                                    checked={settings.notifications}
                                    onChange={handleChange}
                                    className="h-5 w-5 accent-blue-600"
                                />

                            </label>


                            {/* LOW STOCK ALERTS */}

                            <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-white">

                                <div>

                                    <p className="font-medium text-slate-700">
                                        Low Stock Alerts
                                    </p>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Show alert when tractor stock is low
                                    </p>

                                </div>


                                <input
                                    type="checkbox"
                                    name="lowStockAlerts"
                                    checked={settings.lowStockAlerts}
                                    onChange={handleChange}
                                    className="h-5 w-5 accent-blue-600"
                                />

                            </label>

                        </div>


                        {/* ================================= */}
                        {/* SAVE BUTTON */}
                        {/* ================================= */}

                        <button
                            type="submit"
                            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                        >

                            <Save size={18} />

                            Save Settings

                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
};


export default Settings;