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
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const handleLogin=async (e) => {
        e.preventDefault();
        setLoading(true)

        try{
            const response=await authApi(email, password);

            if(response.data.success){
                dispatch(login(response.data.data));
                navigate('/');
            }
        }
        catch(error){
            console.log(`Handle login: ${error.message}`)
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <label>Email</label>
            <input 
                type="email"
                value={email}

                onChange={(e) => {
                    setEmail(e.target.value)
                }}

                required
            />

            <label>Password</label>
            <input
                type="password"
                value={password}
                
                onChange={(e) => {
                    setPassword(e.target.value)
                }}

                required
            />

            {loading ? <Loading /> : <button>Login</button>}
        </form>
    )
}