/**
 * Utility functions for working with the Cache API.
 */

const CACHE_NAME = 'attachments';

/**
 * Puts a request and its response in the cache.
 * @param {string} request - The request URL to cache.
 * @param {Response} response - The response to cache.
 */
export async function put(request, response) {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, response);
}

/**
 * Retrieves a response from the cache.
 * @param {string} request - The request URL to retrieve.
 */
export async function get(request) {
    const cache = await caches.open(CACHE_NAME);
    return cache.match(request);
}