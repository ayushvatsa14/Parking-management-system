import axios from "axios";

const BASEURL="http://localhost:9000"

export const logoutApi=async () => {
        axios.post(BASEURL + "/auth/logout", {
        withCredentials: true,
        timeout: 10000
    });
}