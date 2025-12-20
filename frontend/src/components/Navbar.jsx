import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { logoutApi } from "../utils/logoutApi";
import { useState } from "react";
import { setSpaces } from "../features/parking/parkingSlice";

export const Navbar=() => {
    const userInfo=useSelector(state => state.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [selected, setSelected]=useState(false)

    const handleLogout=async () => {
        try {
            await logoutApi();
        } 
        finally {
            dispatch(logout());
            dispatch(setSpaces({spaces: [], fetched: false, count: -1}))
            navigate("/login");
        }
    }

    const navLinkClass=({ isActive }) =>
        `transition ${
            isActive
                ? "text-yellow-50 font-bold"
                : "text-gray-300 hover:text-yellow-50"}`

    return (
    <nav className="sticky z-50 top-0 w-full bg-richblack-800 border-b border-white mb-4">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <Link
            to="/"
            className="text-xl font-semibold text-yellow-50 tracking-wide"
            >
            Parking<span className="text-white">MS</span>
            </Link>

            <div className="hidden md:flex items-center gap-6 text-[18px] font-semibold">
                <NavLink to="/" className={navLinkClass}>
                    Home
                </NavLink>

                <NavLink to="/all-spaces" className={navLinkClass}>
                    Parking Spaces
                </NavLink>

                <NavLink to="/level-space" className={navLinkClass}>
                    Levels
                </NavLink>

                <NavLink to="/empty-spaces" className={navLinkClass}>
                    Empty Spaces
                </NavLink>
            </div>

            {selected && (
                <div className="fixed top-14 left-0 w-full md:hidden bg-richblack-800 border-t border-richblack-600 shadow-lg z-40">
                    <div className="flex flex-col px-6 py-4 gap-4 text-[16px] font-semibold">
                    <NavLink to="/" onClick={() => setSelected(false)} className={navLinkClass}>
                        Home
                    </NavLink>
                    <NavLink to="/all-spaces" onClick={() => setSelected(false)} className={navLinkClass}>
                        Parking Spaces
                    </NavLink>
                    <NavLink to="/level-space" onClick={() => setSelected(false)} className={navLinkClass}>
                        Levels
                    </NavLink>
                    <NavLink to="/empty-spaces" onClick={() => setSelected(false)} className={navLinkClass}>
                        Empty Spaces
                    </NavLink>
                    </div>
                </div>
            )}


            <button
                onClick={() => setSelected(!selected)}
                className="md:hidden text-yellow-50 focus:outline-none"
                >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>


            {!userInfo.isAuthenticated ? (
            <Link
                to="/login"
                className="cursor-pointer rounded-md bg-yellow-50 px-[20px] py-[8px] font-semibold text-richblack-900"
            >
                Login
            </Link>
            ) : (
            <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2 rounded-lg bg-richblack-700 hover:bg-richblack-600 transition"
            >
                <span className="text-sm text-gray-300">
                {userInfo.user?.name}
                </span>
                <span className="text-yellow-50 font-medium cursor-pointer">Logout</span>
            </button>
            )}
        </div>
    </nav>
  )
}