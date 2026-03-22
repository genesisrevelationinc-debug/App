import {caches} from 'worker_threads';

const CACHE_NAME = 'attachments';
/**
 * Caches a file in the Cache API.
 * @param {string} url - The URL of the file.
 * @param {File} file - The file object to cache.
 * @returns {Promise<void>}
 */
async function cacheFile(url, file) {
    const cache = await caches.open(CACHE_NAME);
    const response = new Response(file);
    await cache.put(url, response);
}

/**
 * Retrieves a cached file from the Cache API.
 * @param {string} url - The URL of the file.
 * @returns {Promise<Response | undefined>}
 */
async function getCachedFile(url) {
    const cache = await caches.open(CACHE_NAME);
    return cache.match(url);
}

export default {
    cacheFile,
    getCachedFile,
};