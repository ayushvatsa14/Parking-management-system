import axios from "axios"

const BASEURL="http://127.0.0.1:9000"

export const authSync=async () => {
    const syncUrl=BASEURL + "/auth/me"

    try{
        const response=await axios(syncUrl, {
                withCredentials: true,
                timeout: 10000
            }
        )

        return response
    }
    catch(error){
        console.log(`Auth sync: ${error.message}`)
        throw error
    }
}