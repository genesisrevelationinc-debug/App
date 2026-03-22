import lodashGet from 'lodash/get';
import {CacheManager} from '../cache/CacheManager';
/**
 * Fetches a file from a given URL.
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                // Check if the file is cached
                return CacheManager.getCachedFile(url).then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse.blob();
                    }
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                });
            }
            return response.blob();
        });