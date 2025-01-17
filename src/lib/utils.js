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

const API_PATH='https://teatral-api-production.up.railway.app';
//'https://teatral-api-production.up.railway.app'
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
    baseURL: API_PATH,
    withCredentials: true,
    withXSRFToken: true
});

export const csrf = async () => await request.get(API_PATH + '/sanctum/csrf-cookie');