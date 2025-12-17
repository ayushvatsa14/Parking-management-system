import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { logoutApi } from "../utils/logoutApi";

export const Navbar=() => {
    const userInfo=useSelector(state => state.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const handleLogout=async () => {
        try {
            await logoutApi();
        } 
        finally {
            dispatch(logout());
            navigate("/login");
        }
    }

    return (
        <nav>
            <Link to={'/'}>Home</Link>
            <Link to={'/all-spaces'}>Parking Spaces</Link>
            <Link to={'/level-space'}>Parking Level</Link>

            {!userInfo.isAuthenticated ? <Link to={'/login'}>Login</Link>
                    :
                <button onClick={handleLogout}>
                    <span>{userInfo.name}</span>
                    Logout
                </button>
            }
        </nav>
    );
}