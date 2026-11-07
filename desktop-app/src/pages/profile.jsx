import { UserCircle, ShieldCheck, User, CircleCheck } from "lucide-react";

function Profile() {

  // Logged-in user localStorage se get karna
  const user = JSON.parse(localStorage.getItem("user"));

  // Role ko readable name mein convert karna
  const getRoleName = (role) => {

    if (role === "admin") {
      return "Administrator";
    }

    if (role === "hr") {
      return "HR Manager";
    }

    return role || "User";
  };


  return (

    <div className="w-full space-y-6">

      {/* ================================= */}
      {/* PAGE HEADING */}
      {/* ================================= */}

      <div>

        <h1 className="text-2xl font-bold text-slate-800">
          My Profile
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View your account information
        </p>

      </div>


      {/* ================================= */}
      {/* PROFILE CARD */}
      {/* ================================= */}

      <div className="max-w-3xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">


        {/* ================================= */}
        {/* PROFILE HEADER */}
        {/* ================================= */}

        <div className="flex items-center gap-5 border-b border-slate-200 p-6">

          {/* Profile Icon */}

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">

            <UserCircle
              size={55}
              className="text-blue-600"
            />

          </div>


          {/* User Name */}

          <div>

            <h2 className="text-xl font-bold text-slate-800">
              {user?.name || "User"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {getRoleName(user?.role)}
            </p>

          </div>

        </div>


        {/* ================================= */}
        {/* ACCOUNT INFORMATION */}
        {/* ================================= */}

        <div className="p-6">

          <div className="mb-5">

            <h3 className="text-lg font-semibold text-slate-800">
              Account Information
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Your logged-in account details
            </p>

          </div>


          {/* ================================= */}
          {/* INFORMATION GRID */}
          {/* ================================= */}

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">


            {/* ================================= */}
            {/* NAME */}
            {/* ================================= */}

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-white">

              <div className="mb-2 flex items-center gap-2">

                <User
                  size={18}
                  className="text-blue-600"
                />

                <p className="text-sm text-slate-500">
                  Full Name
                </p>

              </div>

              <p className="font-semibold text-slate-800">
                {user?.name || "Not available"}
              </p>

            </div>


            {/* ================================= */}
            {/* USERNAME */}
            {/* ================================= */}

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-white">

              <div className="mb-2 flex items-center gap-2">

                <User
                  size={18}
                  className="text-blue-600"
                />

                <p className="text-sm text-slate-500">
                  Username
                </p>

              </div>

              <p className="font-semibold text-slate-800">
                {user?.username || "Not available"}
              </p>

            </div>


            {/* ================================= */}
            {/* ROLE */}
            {/* ================================= */}

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-white">

              <div className="mb-2 flex items-center gap-2">

                <ShieldCheck
                  size={18}
                  className="text-blue-600"
                />

                <p className="text-sm text-slate-500">
                  Role
                </p>

              </div>

              <p className="font-semibold text-slate-800">
                {getRoleName(user?.role)}
              </p>

            </div>


            {/* ================================= */}
            {/* STATUS */}
            {/* ================================= */}

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-white">

              <div className="mb-2 flex items-center gap-2">

                <CircleCheck
                  size={18}
                  className={
                    Number(user?.status) === 1
                      ? "text-green-600"
                      : "text-red-600"
                  }
                />

                <p className="text-sm text-slate-500">
                  Account Status
                </p>

              </div>

              <p
                className={`font-semibold ${
                  Number(user?.status) === 1
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >

                {Number(user?.status) === 1
                  ? "Active"
                  : "Inactive"}

              </p>

            </div>


          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;