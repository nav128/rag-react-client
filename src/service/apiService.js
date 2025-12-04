const apiUrl = process.env.REACT_APP_SERVER_URL
const apiPort = process.env.REACT_APP_SERVER_PORT
const apiKey = process.env.REACT_APP_SERVER_API_KEY
export const baseUrl = `${apiUrl}:${apiPort}/api`

async function api(method, suffix, body, headers={}) {
    return fetch(`${baseUrl}/${suffix}`, {
        method: method,
        headers: { 
            ...headers,
            'Content-Type': 'application/json',
            'x-api-key': apiKey
        },
        body: body ? JSON.stringify(body) : null
    }
    );
}

export {api, apiUrl, apiPort, apiKey };
