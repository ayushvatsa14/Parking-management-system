import axios from "axios";

const BASEURL="http://127.0.0.1:9000";

export const logoutApi=axios.post(BASEURL + "/auth/logout", {
    withCredentials: true,
    timeout: 10000
});