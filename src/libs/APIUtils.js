/**
 * Fetches a resource with a timeout.
 *
 * @param {String} url - The URL to fetch.
 * @param {Object} options - Fetch options.
 * @param {Number} timeout - Timeout in milliseconds.
 * @returns {Promise<Response>} - The fetch response.
 */
export function fetchWithTimeout(url, options = {}, timeout = 5000) {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), timeout)),
    ]);
}