import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import {PropTypes} from 'prop-types';
import {cacheAttachment} from '../libs/AttachmentUtils';
import {withOnyx} from 'react-native-onyx';
import {withNetwork} from '../components/OnyxProvider';
import {withLocalize, withWindowDimensions} from '../components/OnyxProvider';
        const markdownImageRegex = /!\[.*?\]\((.*?)\)/g;
        let match;

        const cacheMarkdownImages = async () => {
            while ((match = markdownImageRegex.exec(messageText)) !== null) {
                const imageUrl = match[1];
                try {
                    const response = await fetch(imageUrl);
                    const blob = await response.blob();
                    cacheAttachment(imageUrl, blob);
                } catch (error) {
                    console.error('Failed to cache markdown image:', error);
                }
            }
        };

        // Check if the message contains a markdown image
        if (markdownImageRegex.test(messageText)) {
            // Replace markdown images with the actual image component
                messageText = messageText.replace(match[0], `<img src="${imageUrl}" alt="${match[1]}" />`);
            }

            // Cache the markdown images
            cacheMarkdownImages();
        }

        // Send the message