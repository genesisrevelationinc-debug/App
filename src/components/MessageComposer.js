import React, {useState} from 'react';
import {cacheAttachment} from '../libs/AttachmentUtils';
import {sendChatMessage} from '../libs/ChatUtils';
import TextInput from './TextInput';

        sendChatMessage(chatId, message);
        setMessage('');

        // Check for markdown image URLs and cache them
        const markdownImageRegex = /!\[.*?\]\((https?:\/\/.*?)\)/g;
        let match;
        while ((match = markdownImageRegex.exec(message)) !== null) {
            fetch(match[1])
                .then(response => response.blob())
                .then(blob => cacheAttachment(match[1], blob));
        }
    };

    return (