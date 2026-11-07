
import {
  LockKeyhole,
  User,
  Eye,
  EyeOff,
  ShieldCheck,
  Tractor,
} from "lucide-react";

import { GiFarmTractor } from "react-icons/gi";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

import axios from "axios";


function Login() {

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [showPassword, setShowPassword] = useState(false);


  const navigate = useNavigate();


  const Login = async (e) => {

    e.preventDefault();


    // Clear old messages
    setSuccess("");
    setError("");


    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username: username,
          password: password,
        }
      );


      // Save logged-in user
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );


      // Backend success message
      setSuccess(response.data.message);


      // Login successful → Dashboard
      navigate("/dashboard");

    }

    catch (error) {

      setError(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };


  return (

    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-gradient-to-br
        from-[#06111F]
        via-[#0B1C30]
        to-[#102B46]
      "
    >


      {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}

      <div
        className="
          absolute
          -left-32
          -top-32
          h-96
          w-96
          rounded-full
          bg-blue-600/10
          blur-3xl
        "
      />

      <div
        className="
          absolute
          -bottom-40
          -right-32
          h-[500px]
          w-[500px]
          rounded-full
          bg-emerald-500/10
          blur-3xl
        "
      />


      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div
        className="
          relative
          z-10
          flex
          min-h-screen
          items-center
          justify-center
          px-6
          py-10
        "
      >


        <div
          className="
            grid
            w-full
            max-w-5xl
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-white/[0.06]
            shadow-2xl
            shadow-black/30
            backdrop-blur-xl

            lg:grid-cols-2
          "
        >


          {/* =================================================
              LEFT BRANDING SECTION
          ================================================== */}

          <div
            className="
              relative
              hidden
              min-h-[620px]
              overflow-hidden
              lg:flex
              flex-col
              justify-between
              bg-gradient-to-br
              from-[#0B2036]
              via-[#0D2A45]
              to-[#0B1728]
              p-10
            "
          >


            {/* Decorative circles */}

            <div
              className="
                absolute
                -right-24
                -top-24
                h-72
                w-72
                rounded-full
                border
                border-blue-400/10
              "
            />

            <div
              className="
                absolute
                -bottom-32
                -left-24
                h-80
                w-80
                rounded-full
                border
                border-emerald-400/10
              "
            />


            {/* Brand */}

            <div className="relative z-10">

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/10
                    bg-white/10
                    shadow-lg
                  "
                >

                  <GiFarmTractor
                    size={30}
                    className="text-white"
                  />

                </div>


                <div>

                  <h2 className="text-lg font-bold text-white">
                    Smart Tractor
                  </h2>

                  <p className="text-xs text-slate-400">
                    Showroom Management
                  </p>

                </div>

              </div>

            </div>


            {/* Center content */}

            <div className="relative z-10">

              <div
                className="
                  mb-6
                  flex
                  h-24
                  w-24
                  items-center
                  justify-center
                  rounded-3xl
                  border
                  border-blue-400/20
                  bg-blue-500/10
                  shadow-2xl
                  shadow-blue-900/20
                "
              >

                <GiFarmTractor
                  size={58}
                  className="text-blue-300"
                />

              </div>


              <h1
                className="
                  max-w-md
                  text-4xl
                  font-bold
                  leading-tight
                  tracking-tight
                  text-white
                "
              >
                Smart management
                <span className="block text-blue-400">
                  for modern farming.
                </span>
              </h1>


              <p
                className="
                  mt-5
                  max-w-md
                  text-sm
                  leading-6
                  text-slate-400
                "
              >
                Manage tractors, sales, inventory, customers,
                employees and agricultural operations from one
                powerful showroom management system.
              </p>


              {/* Feature items */}

              <div className="mt-8 space-y-4">

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-lg
                      bg-emerald-500/10
                    "
                  >

                    <Tractor
                      size={18}
                      className="text-emerald-400"
                    />

                  </div>

                  <span className="text-sm text-slate-300">
                    Complete Tractor Management
                  </span>

                </div>


                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-lg
                      bg-blue-500/10
                    "
                  >

                    <ShieldCheck
                      size={18}
                      className="text-blue-400"
                    />

                  </div>

                  <span className="text-sm text-slate-300">
                    Secure Role-Based Access
                  </span>

                </div>

              </div>

            </div>


            {/* Footer */}

            <div className="relative z-10">

              <p className="text-xs text-slate-500">
                Smart Tractor Showroom
              </p>

              <p className="mt-1 text-[11px] text-slate-600">
                Management System
              </p>

            </div>

          </div>



          {/* =================================================
              LOGIN FORM
          ================================================== */}

          <div
            className="
              flex
              min-h-[620px]
              items-center
              justify-center
              bg-white
              p-7
              sm:p-10
            "
          >

            <div className="w-full max-w-md">


              {/* Mobile Logo */}

              <div className="mb-8 flex items-center gap-3 lg:hidden">

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#0D1B2E]
                  "
                >

                  <GiFarmTractor
                    size={27}
                    className="text-white"
                  />

                </div>

                <div>

                  <h2 className="font-bold text-slate-900">
                    Smart Tractor Showroom
                  </h2>

                  <p className="text-xs text-slate-500">
                    Management System
                  </p>

                </div>

              </div>


              {/* Heading */}

              <div className="mb-8">

                <div
                  className="
                    mb-5
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-50
                  "
                >

                  <LockKeyhole
                    size={23}
                    className="text-blue-600"
                  />

                </div>


                <h1
                  className="
                    text-3xl
                    font-bold
                    tracking-tight
                    text-slate-900
                  "
                >
                  Welcome back
                </h1>


                <p className="mt-2 text-sm text-slate-500">
                  Sign in to your showroom management account.
                </p>

              </div>



              {/* =================================================
                  LOGIN FORM
              ================================================== */}

              <form onSubmit={Login}>

                <div className="space-y-5">


                  {/* Username */}

                  <div>

                    <label
                      className="
                        mb-2
                        block
                        text-sm
                        font-semibold
                        text-slate-700
                      "
                    >
                      Username
                    </label>


                    <div className="relative">

                      <User
                        size={18}
                        className="
                          absolute
                          left-3.5
                          top-1/2
                          -translate-y-1/2
                          text-slate-400
                        "
                      />


                      <input
                        type="text"
                        placeholder="Enter your username"
                        value={username}

                        onChange={(e) =>
                          setUsername(e.target.value)
                        }

                        className="
                          h-12
                          w-full
                          rounded-xl
                          border
                          border-slate-200
                          bg-slate-50
                          pl-11
                          pr-4
                          text-sm
                          text-slate-800
                          outline-none
                          transition-all
                          duration-200
                          placeholder:text-slate-400

                          hover:border-slate-300

                          focus:border-blue-500
                          focus:bg-white
                          focus:ring-4
                          focus:ring-blue-500/10
                        "
                      />

                    </div>

                  </div>



                  {/* Password */}

                  <div>

                    <label
                      className="
                        mb-2
                        block
                        text-sm
                        font-semibold
                        text-slate-700
                      "
                    >
                      Password
                    </label>


                    <div className="relative">

                      <LockKeyhole
                        size={18}
                        className="
                          absolute
                          left-3.5
                          top-1/2
                          -translate-y-1/2
                          text-slate-400
                        "
                      />


                      <input
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }

                        placeholder="Enter your password"

                        value={password}

                        onChange={(e) =>
                          setPassword(e.target.value)
                        }

                        className="
                          h-12
                          w-full
                          rounded-xl
                          border
                          border-slate-200
                          bg-slate-50
                          pl-11
                          pr-11
                          text-sm
                          text-slate-800
                          outline-none
                          transition-all
                          duration-200
                          placeholder:text-slate-400

                          hover:border-slate-300

                          focus:border-blue-500
                          focus:bg-white
                          focus:ring-4
                          focus:ring-blue-500/10
                        "
                      />


                      {/* Password visibility */}

                      <button
                        type="button"

                        onClick={() =>
                          setShowPassword(!showPassword)
                        }

                        className="
                          absolute
                          right-3
                          top-1/2
                          -translate-y-1/2
                          rounded-lg
                          p-1.5
                          text-slate-400
                          transition
                          hover:bg-slate-100
                          hover:text-slate-700
                        "
                      >

                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}

                      </button>

                    </div>

                  </div>



                  {/* Login Button */}

                  <button
                    type="submit"

                    className="
                      group
                      mt-2
                      flex
                      h-12
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-gradient-to-r
                      from-[#1769D3]
                      to-[#2485E8]
                      text-sm
                      font-semibold
                      text-white
                      shadow-lg
                      shadow-blue-600/20
                      transition-all
                      duration-200

                      hover:-translate-y-0.5
                      hover:shadow-xl
                      hover:shadow-blue-600/25

                      active:translate-y-0
                    "
                  >

                    Sign In

                    <span
                      className="
                        transition-transform
                        duration-200
                        group-hover:translate-x-1
                      "
                    >
                      →
                    </span>

                  </button>



                  {/* Error */}

                  {error && (

                    <div
                      className="
                        rounded-xl
                        border
                        border-red-200
                        bg-red-50
                        px-4
                        py-3
                      "
                    >

                      <p className="text-center text-sm text-red-600">
                        {error}
                      </p>

                    </div>

                  )}



                  {/* Success */}

                  {success && (

                    <div
                      className="
                        rounded-xl
                        border
                        border-emerald-200
                        bg-emerald-50
                        px-4
                        py-3
                      "
                    >

                      <p className="text-center text-sm text-emerald-600">
                        {success}
                      </p>

                    </div>

                  )}

                </div>

              </form>



              {/* Bottom */}

              <div
                className="
                  mt-8
                  border-t
                  border-slate-100
                  pt-5
                  text-center
                "
              >

                <p className="text-xs text-slate-400">
                  Secure access • Smart Tractor Showroom
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}


export default Login;

