import axios from "axios";

const axiosApi = axios.create({
    baseURL: 'https://ten-vitaliy-works-default-rtdb.firebaseio.com/'
});

export default axiosApi