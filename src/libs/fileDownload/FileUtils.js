import lodashGet from 'lodash/get';
import {NativeModules} from 'react-native';
import {CacheUtils} from '../cache/CacheUtils';

const {FileUtils} = NativeModules;

 * @returns {Promise<void>}
 */
export async function downloadFile(url, fileName) {
    // Check if the file is already cached
    const cache = await caches.open('attachments');
    const cachedResponse = await cache.match(url);
    if (cachedResponse) {
        return;
    }
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to download file: ${response.statusText}`);