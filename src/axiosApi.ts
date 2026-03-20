import axios from "axios";

export const axiosApi = axios.create({
    baseURL: "https://plovo-app-f8f8e-default-rtdb.europe-west1.firebasedatabase.app/"
})