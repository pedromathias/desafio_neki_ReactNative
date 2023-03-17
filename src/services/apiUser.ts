import axios, { AxiosResponse } from "axios";

export const ApiNeki = axios.create({
    baseURL: ' https://a5f9-2804-56c-8211-cc00-fe68-eced-1478-5a1.sa.ngrok.io',
    headers: {
        "Content-Type": "application/json"
    },
});
