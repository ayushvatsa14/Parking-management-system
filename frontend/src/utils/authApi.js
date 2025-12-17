import axios from "axios"

const BASEURL="http://127.0.0.1:9000"


export const authApi=async (email, password) => {
    const loginUrl=BASEURL + "/auth/login"

    try{
        const response=await axios.post(
            loginUrl, 
            {
                email,
                password
            },
            {
                withCredentials: true,
                timeout: 10000
            } 
        )

        return response
    }
    catch(error){
        console.log(`Login API: ${error.message}`)
        throw error
    }
}