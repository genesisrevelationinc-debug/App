import {API} from './API';
import {getCachedAttachment} from './AttachmentUtils';

/**
 * Send a chat message.
    const messageData = {
        chatId,
        message,
        attachments: [],
    };

    // Check for cached attachments and add them to the message data
    const markdownImageRegex = /!\[.*?\]\((https?:\/\/.*?)\)/g;
    let match;
    while ((match = markdownImageRegex.exec(message)) !== null) {
        const cachedBlob = getCachedAttachment(match[1]);
        if (cachedBlob) {
            messageData.attachments.push(cachedBlob);
        }
    }

    return API.post('sendChatMessage', messageData);
}