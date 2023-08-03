import axios from "axios";

const fleedShopApi = axios.create({
    baseURL: '/api'
})


export default fleedShopApi;