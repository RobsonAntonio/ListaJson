import axios from "axios";

const api = axios.create({
    baseURL: 'https://gorest.co.in/',
    headers: {
        ' X-Pagination-Limit': 100
    }

});

export default api;