import lodashGet from 'lodash/get';
import {parse} from 'url';
import {cacheAttachment} from './CacheUtils';
/**
 * Extracts the file extension from a URL.
            const url = lodashGet(matches, '[1]');
            const extension = getFileExtension(url);
            const fileName = `${generateRandomFileName()}.${extension}`;

            // Cache the attachment
            cacheAttachment(url, fileName)
                .then(() => {
                    console.log(`Cached attachment: ${fileName}`);
                })
                .catch((error) => {
                    console.error(`Failed to cache attachment: ${fileName}`, error);
                });

            return `![${fileName}](${url})`;
        });
    }