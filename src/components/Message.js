import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import {PropTypes} from 'prop-types';
import {isAttachmentCached} from '../libs/AttachmentUtils';
import {withOnyx} from 'react-native-onyx';
import {withNetwork} from '../components/OnyxProvider';
import {withLocalize, withWindowDimensions} from '../components/OnyxProvider';
        const imageUrl = lodashGet(message, 'data.url');

        if (imageUrl) {
            // Check if the image is cached
            const isCached = await isAttachmentCached(imageUrl);
            if (isCached) {
                // Use the cached image
                message.data.isCached = true;
            } else {
                // If not cached, proceed with the original message
                message.data.isCached = false;
            }

            // Update the message state
            this.setState({message});
        }

        return message;