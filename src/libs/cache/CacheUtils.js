import {caches} from 'worker_threads';

const CACHE_NAME = 'attachments';

/**
 * Caches an attachment in the Cache API.
 *
 * @param {string} url - The URL of the attachment to cache.
 * @param {string} fileName - The file name to store the attachment under.
 * @returns {Promise<void>}
 */
export async function cacheAttachment(url, fileName) {
    const cache = await caches.open(CACHE_NAME);
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch attachment: ${response.statusText}`);
    }

    const clonedResponse = response.clone();
    const blob = await response.blob();
    const file = new File([blob], fileName, {type: blob.type});
    const fileResponse = new Response(file);

    await cache.put(url, fileResponse);
}