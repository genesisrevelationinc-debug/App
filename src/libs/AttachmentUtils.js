import lodashGet from 'lodash/get';
import {Log} from './DebugUtils';
import {Cache} from './CacheUtils';
/**
 * Extracts the attachment URL from a markdown image syntax.
    return null;
}
/**
 * Caches the attachment URL in the Cache API.
 * @param {string} url - The URL of the attachment to cache.
 */
async function cacheAttachment(url) {
    if ('caches' in window) {
        try {
            await Cache.put(url, await fetch(url));
        } catch (error) {
            Log.error('Failed to cache attachment', {error});
        }
    }
}

/**
 * Processes a message to handle attachments.
 * @param {string} message - The message to process.
        const attachmentUrl = extractAttachmentUrl(message);
        if (attachmentUrl) {
            Log.info('Attachment URL found:', attachmentUrl);
            // Cache the attachment URL
            cacheAttachment(attachmentUrl);

            // Replace the markdown image syntax with a placeholder or handle as needed
            return message.replace(/!\[.*?\]\((.*?)\)/g, '[Attachment]');
        }