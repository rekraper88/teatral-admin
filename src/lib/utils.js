// export default async (url, method = 'get', data = null, credentials = 'include') => {
//     try {
//         const xsrfToken = document.cookie
//             .split('; ')
//             .find(row => row.startsWith('XSRF-TOKEN='))
//             ?.split('=')[1];

import axios from "axios";

//         const response = await fetch(url, {
//             method,
//             headers: {
//                 'Content-Type': 'application/json',
//                 ...(xsrfToken ? { 'X-XSRF-TOKEN': decodeURIComponent(xsrfToken) } : {}),
//             },
//             ...(data ? { body: JSON.stringify(data) } : {}),
//             credentials
//         });

//         if (!response.ok) {
//             const errorMessage = await response.text();
//             return errorMessage;
//         }

//         return response.json();
//     } catch (error) {
//         return error;
//     }
// };

// export axios.create

const API_PATH='http://localhost:8000';

// export const request = {
//     post: async (url, data) => {
//         try {
//             const response = await fetch(`${API_PATH}${url.startsWith('/') ? url : `/${url}`}`, {
//                 method: 'POST',
//                 body: JSON.stringify(data),
//                 credentials: 'include',
//             });

//             if (!response.ok) {
//                 const errorMessage = await response.text();
//                 return errorMessage;
//             }

//             return response.json();
//         } catch (error) {
//             return error;
//         }
//     }
// }

        
        


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
    await axios.get('https://teatral-api-production.up.railway.app/sanctum/csrf-cookie', {
        withCredentials: true
    });
};


