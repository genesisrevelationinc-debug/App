import lodashSet from 'lodash/set';
import lodashClone from 'lodash/clone';
import lodashCloneDeep from 'lodash/cloneDeep';
import {getCachedAttachment} from './AttachmentUtils';
import {withOnyx} from 'react-native-onyx';
import {withNetwork} from '../components/OnyxProvider';
import {withLocalize, withWindowDimensions} from '../components/OnyxProvider';
        const imageUrl = lodashGet(request, 'data.url');

        if (imageUrl) {
            // Check if the image is cached
            const cachedBlob = await getCachedAttachment(imageUrl);
            if (cachedBlob) {
                // Use the cached image
                request.data.blob = cachedBlob;
                request.data.url = undefined; // Remove the URL to use the blob
                return request;
            }

            // If not cached, proceed with the original request
        }

        return request;
    }