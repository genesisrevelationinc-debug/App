import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {cacheAttachment} from '../libs/AttachmentUtils';
import {fetchWithTimeout} from '../libs/APIUtils';

const MessageComposer = ({onSendMessage}) => {
    const [message, setMessage] = useState('');
        setMessage('');
    };

    const handleMarkdownImage = async (url) => {
        if (await isAttachmentCached(url)) {
            return;
        }

        try {
            const response = await fetchWithTimeout(url);
            const blob = await response.blob();
            cacheAttachment(url, blob);
        } catch (error) {
            console.error('Failed to cache markdown image:', error);
        }
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);

                const imageUrl = match[1];
                if (imageUrl) {
                    onSendMessage(imageUrl);
                    handleMarkdownImage(imageUrl);
                    return;
                }
            }
        }