import { Bell, Search, UserCircle } from "lucide-react";

function Navbar() {
  return (
    <header className="fixed left-64 right-0 top-0 z-10 flex h-20 items-center justify-between border-b bg-white px-8">

      <div>
        <h2 className="text-xl font-bold text-slate-800">
          Smart Tractor Showroom
        </h2>

        <p className="text-sm text-slate-500">
          Management System
        </p>
      </div>

      <div className="flex items-center gap-5">

        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-3 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-100 rounded-lg border py-2.5 pl-10 pr-4 outline-none focus:border-green-500"
          />
        </div>

        <button className="relative rounded-lg p-2 hover:bg-slate-100">
          <Bell size={21} />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-2">
          <UserCircle size={35} className="text-green-600" />

          <div>
            <p className="text-sm font-semibold">Admin</p>
            <p className="text-xs text-slate-500">Administrator</p>
          </div>
        </div>

      </div>
    </header>
  );
}

export default Navbar;