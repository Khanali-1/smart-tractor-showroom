import { Tractor, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Abhi database nahi hai
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">

        <div className="mb-8 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-600 text-white">
            <Tractor size={32} />
          </div>

          <h1 className="mt-4 text-2xl font-bold">
            Smart Tractor Showroom
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Admin Management System
          </p>

        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="mb-2 block text-sm font-medium">
              Username
            </label>

            <div className="relative">
              <User
                size={18}
                className="absolute left-3 top-3 text-slate-400"
              />

              <input
                type="text"
                placeholder="Enter username"
                className="w-full rounded-lg border py-2.5 pl-10 pr-4 outline-none focus:border-green-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-3 text-slate-400"
              />

              <input
                type="password"
                placeholder="Enter password"
                className="w-full rounded-lg border py-2.5 pl-10 pr-4 outline-none focus:border-green-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;