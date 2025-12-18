import axios from "axios"

const BASEURL="http://localhost:9000"

export const fetchParkingSpaces=async () => {
    try{
        const response=await axios.get(BASEURL + "/parking-spaces/", {
            withCredentials: true,
            timeout: 10000
        });

        return response;
    }
    catch(error){
        console.log(`Fetch parking spaces: ${error.message}`);
    }
}