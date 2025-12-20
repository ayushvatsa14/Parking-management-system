import axios from "axios"

const BASEURL="http://localhost:9000"

export const updateSpace=async (space, status) => {
    try{
        const response=await axios.patch(BASEURL + "/parking-spaces/update", {
            "level": Number(space.level),
            "spot": Number(space.spot),
            "availability": status
        },
        {
            withCredentials: true,
            timeout: 10000
        }
    )

        return response
    }
    catch(error){
        console.log(error.message)
        throw error
    }
}