import { baseUrl } from "./apiService";
export function uploadFile(file) {
    const url = `${baseUrl}/files/upload`;
    const formData = new FormData();
    formData.append('file', file); 
    return fetch(url, 
        { headers: {
            'x-api-key': process.env.REACT_APP_SERVER_API_KEY
        },
        method: 'POST',
        body: formData
    });
}