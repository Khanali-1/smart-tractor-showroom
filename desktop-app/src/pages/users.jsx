import { useEffect, useState } from "react";
import axios from "axios";

import {
    Users,
    UserPlus,
    Edit,
    Trash2,
    X,
    Save
} from "lucide-react";


const User = () => {

    // ==============================
    // STATES
    // ==============================

    const [users, setUsers] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [editingUser, setEditingUser] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
        role: "hr",
        status: 1
    });


    // ==============================
    // GET USERS
    // ==============================

    const getUsers = async () => {

        try {

            const response = await axios.get(
                "http://localhost:5000/api/users"
            );

            setUsers(response.data.users);

        } catch (error) {

            console.error("Error getting users:", error);

            alert("Failed to load users");
        }
    };


    // ==============================
    // LOAD USERS WHEN PAGE OPENS
    // ==============================

    useEffect(() => {

        getUsers();

    }, []);


    // ==============================
    // HANDLE INPUT
    // ==============================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]:
                name === "status"
                    ? Number(value)
                    : value
        });
    };


    // ==============================
    // OPEN ADD USER FORM
    // ==============================

    const openAddForm = () => {

        setEditingUser(null);

        setFormData({
            name: "",
            username: "",
            password: "",
            role: "hr",
            status: 1
        });

        setShowForm(true);
    };


    // ==============================
    // OPEN EDIT FORM
    // ==============================

    const openEditForm = (user) => {

        setEditingUser(user);

        setFormData({
            name: user.name,
            username: user.username,
            password: "",
            role: user.role,
            status: user.status
        });

        setShowForm(true);
    };


    // ==============================
    // SUBMIT FORM
    // ==============================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            // ==============================
            // UPDATE USER
            // ==============================

            if (editingUser) {

                await axios.put(
                    `http://localhost:5000/api/users/${editingUser.id}`,
                    formData
                );

                alert("User updated successfully");

            }

            // ==============================
            // ADD USER
            // ==============================

            else {

                await axios.post(
                    "http://localhost:5000/api/users",
                    formData
                );

                alert("User created successfully");
            }


            // Refresh users
            getUsers();


            // Close form
            setShowForm(false);

            setEditingUser(null);


        } catch (error) {

            console.error("User save error:", error);

            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };


    // ==============================
    // DELETE USER
    // ==============================

    const deleteUser = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) {
            return;
        }


        try {

            await axios.delete(
                `http://localhost:5000/api/users/${id}`
            );

            alert("User deleted successfully");

            getUsers();


        } catch (error) {

            console.error("Delete user error:", error);

            alert("Failed to delete user");
        }
    };


    // ==============================
    // STATISTICS
    // ==============================

    const totalUsers = users.length;

    const activeUsers = users.filter(
        (user) => user.status === 1
    ).length;

    const inactiveUsers = users.filter(
        (user) => user.status === 0
    ).length;


    return (

        <div className="w-full space-y-6">


            {/* ================================= */}
            {/* PAGE HEADER */}
            {/* ================================= */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                    <h1 className="text-2xl font-bold text-slate-800">
                        User Management
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage system users and login accounts
                    </p>

                </div>


                <button
                    onClick={openAddForm}
                    className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                >

                    <UserPlus size={18} />

                    Add User

                </button>

            </div>



            {/* ================================= */}
            {/* STAT CARDS */}
            {/* ================================= */}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">


                {/* TOTAL USERS */}

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                    <div className="flex items-center gap-4">

                        <div className="rounded-lg bg-blue-50 p-3">

                            <Users
                                size={24}
                                className="text-blue-600"
                            />

                        </div>


                        <div>

                            <p className="text-sm font-medium text-slate-500">
                                Total Users
                            </p>

                            <h2 className="mt-1 text-2xl font-bold text-slate-800">
                                {totalUsers}
                            </h2>

                        </div>

                    </div>

                </div>



                {/* ACTIVE USERS */}

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                    <p className="text-sm font-medium text-slate-500">
                        Active Users
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-green-600">
                        {activeUsers}
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                        Currently active accounts
                    </p>

                </div>



                {/* INACTIVE USERS */}

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                    <p className="text-sm font-medium text-slate-500">
                        Inactive Users
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-red-600">
                        {inactiveUsers}
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                        Disabled accounts
                    </p>

                </div>

            </div>



            {/* ================================= */}
            {/* ADD / EDIT FORM */}
            {/* ================================= */}

            {showForm && (

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">


                    {/* FORM HEADER */}

                    <div className="mb-5 flex items-center justify-between border-b border-slate-200 pb-4">

                        <div>

                            <h2 className="text-lg font-semibold text-slate-800">

                                {editingUser
                                    ? "Edit User"
                                    : "Create New User"}

                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                {editingUser
                                    ? "Update user account information"
                                    : "Create a new system login account"}
                            </p>

                        </div>


                        <button
                            onClick={() => setShowForm(false)}
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                        >

                            <X size={20} />

                        </button>

                    </div>



                    {/* FORM */}

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 gap-5 md:grid-cols-2"
                    >


                        {/* NAME */}

                        <div>

                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter name"
                                required
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                        </div>



                        {/* USERNAME */}

                        <div>

                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                Username
                            </label>

                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter username"
                                required
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                        </div>



                        {/* PASSWORD */}

                        <div>

                            <label className="mb-1.5 block text-sm font-medium text-slate-700">

                                Password

                                {editingUser && (
                                    <span className="ml-2 text-xs font-normal text-slate-400">
                                        Leave empty to keep old password
                                    </span>
                                )}

                            </label>

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder={
                                    editingUser
                                        ? "Enter new password"
                                        : "Enter password"
                                }
                                required={!editingUser}
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                        </div>



                        {/* ROLE */}

                        <div>

                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                Role
                            </label>

                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            >

                                <option value="admin">
                                    Admin
                                </option>

                                <option value="hr">
                                    HR
                                </option>

                            </select>

                        </div>



                        {/* STATUS */}

                        <div>

                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                Status
                            </label>

                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            >

                                <option value={1}>
                                    Active
                                </option>

                                <option value={0}>
                                    Inactive
                                </option>

                            </select>

                        </div>



                        {/* FORM BUTTONS */}

                        <div className="flex items-end gap-3">

                            <button
                                type="submit"
                                className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                            >

                                <Save size={18} />

                                {editingUser
                                    ? "Update User"
                                    : "Create User"}

                            </button>


                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                            >

                                Cancel

                            </button>

                        </div>

                    </form>

                </div>

            )}



            {/* ================================= */}
            {/* USERS TABLE */}
            {/* ================================= */}

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">


                {/* TABLE HEADER */}

                <div className="border-b border-slate-200 p-5">

                    <h2 className="text-lg font-semibold text-slate-800">
                        System Users
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        All registered system accounts
                    </p>

                </div>


                <div className="overflow-x-auto">

                    <table className="w-full text-left">

                        <thead>

                            <tr className="border-b border-slate-200 bg-slate-50">

                                <th className="px-5 py-3 text-sm font-medium text-slate-500">
                                    ID
                                </th>

                                <th className="px-5 py-3 text-sm font-medium text-slate-500">
                                    Name
                                </th>

                                <th className="px-5 py-3 text-sm font-medium text-slate-500">
                                    Username
                                </th>

                                <th className="px-5 py-3 text-sm font-medium text-slate-500">
                                    Role
                                </th>

                                <th className="px-5 py-3 text-sm font-medium text-slate-500">
                                    Status
                                </th>

                                <th className="px-5 py-3 text-sm font-medium text-slate-500">
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {users.map((user) => (

                                <tr
                                    key={user.id}
                                    className="border-b border-slate-100 transition hover:bg-slate-50"
                                >


                                    {/* ID */}

                                    <td className="px-5 py-3 text-sm text-slate-500">
                                        {user.id}
                                    </td>


                                    {/* NAME */}

                                    <td className="px-5 py-3">

                                        <span className="font-medium text-slate-800">
                                            {user.name}
                                        </span>

                                    </td>


                                    {/* USERNAME */}

                                    <td className="px-5 py-3 text-sm text-slate-600">
                                        {user.username}
                                    </td>


                                    {/* ROLE */}

                                    <td className="px-5 py-3">

                                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">

                                            {user.role.toUpperCase()}

                                        </span>

                                    </td>


                                    {/* STATUS */}

                                    <td className="px-5 py-3">

                                        {user.status === 1 ? (

                                            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                                                Active
                                            </span>

                                        ) : (

                                            <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
                                                Inactive
                                            </span>

                                        )}

                                    </td>


                                    {/* ACTIONS */}

                                    <td className="px-5 py-3">

                                        <div className="flex gap-2">


                                            {/* EDIT */}

                                            <button
                                                onClick={() =>
                                                    openEditForm(user)
                                                }
                                                className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                                                title="Edit User"
                                            >

                                                <Edit size={17} />

                                            </button>


                                            {/* DELETE */}

                                            <button
                                                onClick={() =>
                                                    deleteUser(user.id)
                                                }
                                                className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                                                title="Delete User"
                                            >

                                                <Trash2 size={17} />

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}


                            {/* NO USERS */}

                            {users.length === 0 && (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="px-5 py-10 text-center text-sm text-slate-500"
                                    >

                                        No users found

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
};


export default User;