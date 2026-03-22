import lodashGet from 'lodash/get';
import {FileUtils} from './fileDownload/FileUtils';
import {CacheManager} from './cache/CacheManager';
/**
 * Extracts the file extension from a URL.
    return FileUtils.getFile(url).then((fileBlob) => {
        const fileObject = new File([fileBlob], file.name, {type: fileBlob.type});
        const fileReader = new FileReader();

        // Cache the file in Cache API
        CacheManager.cacheFile(url, fileObject).then(() => {
            console.log(`Cached file: ${url}`);
        }).catch((error) => {
            console.error(`Failed to cache file: ${url}`, error);
        });

        return fileObject;
    });
}

function addMarkdownImageToCache(url) {
    return FileUtils.getFile(url).then((fileBlob) => {
        const fileObject = new File([fileBlob], 'markdown-image', {type: fileBlob.type});
        CacheManager.cacheFile(url, fileObject).then(() => {
            console.log(`Cached markdown image: ${url}`);
        }).catch((error) => {
            console.error(`Failed to cache markdown image: ${url}`, error);
        });
    });
}
        if (attachment.url) {
            addAttachmentToCache(attachment, attachment.url);
        }
    });

    // Process markdown images
    const markdownImageUrls = message.match(/!\[.*?\]\((.*?)\)/g);
    if (markdownImageUrls) {
        markdownImageUrls.forEach((markdownImage) => {
            const url = markdownImage.match(/\((.*?)\)/)[1];
            addMarkdownImageToCache(url);
        });
    }
}