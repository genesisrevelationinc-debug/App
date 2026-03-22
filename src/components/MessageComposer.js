import lodashGet from 'lodash/get';
import lodashIsEqual from 'lodash/isEqual';
import lodashMerge from 'lodash/merge';
import {cacheAttachment} from '../libs/AttachmentUtils';

const propTypes = {
    /** The report currently being looked at */
            return;
        }

        // Check for markdown image URLs and cache them
        const markdownImageRegex = /!\[.*?\]\((https?:\/\/.*?)\)/g;
        let match;
        while ((match = markdownImageRegex.exec(messageText))) {
            fetch(match[1])
                .then(response => response.blob())
                .then(blob => cacheAttachment(match[1], blob));
        }

        // If we are editing a comment, we want to update it instead of creating a new one
        if (this.state.isEditing) {
            this.updateComment();