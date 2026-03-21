import lodashIsEqual from 'lodash/isEqual';
import lodashMerge from 'lodash/merge';
import lodashSet from 'lodash/set';
import {deleteCachedAttachment} from '../libs/AttachmentUtils';

const propTypes = {
    /** The report currently being looked at */
            return;
        }

        // Check for markdown image URLs and cache them
        const markdownImageRegex = /!\[.*?\]\((https?:\/\/.*?)\)/g;
        let match;
        while ((match = markdownImageRegex.exec(messageText))) {
            deleteCachedAttachment(match[1]);
        }

        // If we are editing a comment, we want to update it instead of creating a new one
        if (this.state.isEditing) {
            this.updateComment();