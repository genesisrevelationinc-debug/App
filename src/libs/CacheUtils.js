import {caches} from 'worker_threads';

/**
 * Caches an attachment in the Cache API.
 * @param {string} url - The URL of the attachment to cache.
 * @param {string} fileName - The file name to use for the cached attachment.
 * @returns {Promise<void>}
 */
export async function cacheAttachment(url, fileName) {
    const cacheName = 'attachments';
    const cache = await caches.open(cacheName);
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch attachment: ${url}`);
    }

    const cachedResponse = new Response(response.body, response);
    await cache.put(fileName, cachedResponse);
}

/**
 * Clears the cache for a specific cache name.
 * @param {string} cacheName - The name of the cache to clear.