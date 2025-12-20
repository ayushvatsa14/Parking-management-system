import { useState } from "react"
import { authApi } from "../utils/authApi"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login } from "../features/auth/authSlice"
import { Loading } from "../components/Loading"

export const Login=() => {
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [loading, setLoading]=useState(false)
    const [message, setMessage]=useState("")
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const handleLogin=async (e) => {
        try{
            e.preventDefault();
            setLoading(true)
            const response=await authApi(email, password);

            if(response.data.success){
                
                dispatch(login(response.data.data));
                navigate('/');
            }
            else{
                setMessage(response.data.message)
            }

            setLoading(false)
        }
        catch(error){
            setMessage(error?.response?.data.message)
            console.log(`Handle login: ${error.message}`)
        }
        finally{
            setLoading(false)
        }
    }

    return (
    <div className="flex min-h-[80vh] items-center justify-center">
        <div className="relative w-full max-w-md">
            {loading && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-richblack-900/70 rounded-xl">
                <Loading />
            </div>
            )}

            <form
                onSubmit={handleLogin}
                className="w-full rounded-xl bg-richblack-800 p-8 shadow-lg border border-pure-greys-700 relative z-10"
                >
                <h2 className="mb-6 text-center text-2xl font-semibold text-yellow-50">
                    Login
                </h2>
                
                <div className="mb-4">
                    <label className="mb-1 block text-sm text-pure-greys-200">Email</label>
                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-md bg-richblack-900 px-4 py-2 text-pure-greys-25 outline-none border border-richblack-600 focus:border-yellow-50 transition"
                    />
                </div>

                <div className="mb-6">
                    <label className="mb-1 block text-sm text-pure-greys-200">Password</label>
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-md bg-richblack-900 px-4 py-2 text-pure-greys-25 outline-none border border-richblack-600 focus:border-yellow-50 transition"
                    />
                </div>

                {message !== "" && (
                    <div className="w-fit mb-4 text-[16px] text-red-400">{message}</div>
                )}

                <button
                    type="submit"
                    className="w-full rounded-md bg-yellow-50 py-2 font-semibold text-richblack-900 hover:bg-yellow-25 transition"
                    disabled={loading} // disable during loading
                >
                    Login
                </button>
            </form>
        </div>
    </div>
  )
}