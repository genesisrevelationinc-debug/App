import {Cache} from 'react-native-cache';

const attachmentCache = new Cache({
    namespace: 'attachments',
    policy: {
        maxEntries: 500,
        stdTTL: 0,
    },
});

/**
 * Caches an attachment using the provided URL and data.
 *
 * @param {String} url - The URL of the attachment.
 * @param {Blob} data - The attachment data to cache.
 */
export function cacheAttachment(url, data) {
    attachmentCache.set(url, data);
}

/**
 * Retrieves an attachment from the cache using the provided URL.
 *
 * @param {String} url - The URL of the attachment.
 * @returns {Promise<Blob|null>} - The cached attachment data or null if not found.
 */
export async function getCachedAttachment(url) {
    return attachmentCache.get(url);
}

/**
 * Checks if an attachment is already cached using the provided URL.
 *
 * @param {String} url - The URL of the attachment.
 * @returns {Promise<Boolean>} - True if the attachment is cached, false otherwise.
 */
export async function isAttachmentCached(url) {
    return attachmentCache.has(url);
}

/**
 * Deletes an attachment from the cache using the provided URL.
 *
 * @param {String} url - The URL of the attachment.
 */
export function deleteCachedAttachment(url) {
    attachmentCache.delete(url);
}