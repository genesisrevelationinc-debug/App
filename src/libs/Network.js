import lodashIsEqual from 'lodash/isEqual';
import lodashMerge from 'lodash/merge';
import lodashSet from 'lodash/set';
import {getCachedAttachment} from '../libs/AttachmentUtils';

const propTypes = {
    /** The report currently being looked at */
            return;
        }

        // Check for markdown image URLs and cache them
        const markdownImageRegex = /!\[.*?\]\((https?:\/\/.*?)\)/g;
        let match;
        while ((match = markdownImageRegex.exec(messageText))) {
            const cachedBlob = await getCachedAttachment(match[1]);
            if (cachedBlob) {
                // Use cached blob for the request
            }
        }

        // If we are editing a comment, we want to update it instead of creating a new one
        if (this.state.isEditing) {
            this.updateComment();