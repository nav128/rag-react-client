import * as api from './apiService';
const module = "chat"

export function response_endpoint(chatId, question) {
    return (
         `${api.baseUrl}/${module}/stream?session_id=${chatId}&question=${encodeURIComponent(question)}`
    )
}

export async function postUserMessage(chatId, content) {
    return api.api(
        'POST', 
        `${module}/message`, 
        { chatId, content }
    );
}