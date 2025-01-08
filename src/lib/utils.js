
import axios from "axios";



export const request = axios.create({
    baseURL: 'https://teatral-api-production.up.railway.app',
    withCredentials: true
});

let csrfFetched = false; // Prevent multiple CSRF requests

request.interceptors.request.use(async (config) => {
    if (!csrfFetched) {
        await csrf(); // Fetch CSRF token only once
        csrfFetched = true;
    }

    const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];
    if (token) {
        config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
    }

    return config;
});

export const csrf = async () => {
    const res = await axios.get('https://teatral-api-production.up.railway.app/sanctum/csrf-cookie', {
        withCredentials: true
    });
    console.log(res, document.cookie);
    return res;
    
};


