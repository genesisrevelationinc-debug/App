import lodashGet from 'lodash/get';
import {FileUtils} from './fileDownload/FileUtils';
import {CacheUtils} from './cache/CacheUtils';
/**
 * Extracts the file extension from a URL.
            const url = match[1];
            const extension = getFileExtension(url);
            const fileName = `markdown-image-${Date.now()}.${extension}`;
            // Cache the image URL
            CacheUtils.cacheAttachment(url, fileName)
                .then(() => {
                    console.log(`Cached attachment: ${fileName}`);
                })
                .catch(error => console.error('Failed to cache attachment:', error));

            // Replace the markdown image URL with a local file URL
            return `![](${FileUtils.getLocalFileURL(fileName)})`;