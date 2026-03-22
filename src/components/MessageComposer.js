import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {handleMarkdownImages} from '../libs/AttachmentUtils';

const MessageComposer = ({onSendMessage}) => {
    const [message, setMessage] = useState('');
    const sendMessage = () => {
        if (message.trim()) {
            // Handle markdown images before sending the message
            const processedMessage = handleMarkdownImages(message, () => {});

            onSendMessage(processedMessage);
            setMessage('');
        }