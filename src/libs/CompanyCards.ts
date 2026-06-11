import type {ValueOf} from 'type-fest';
import Onyx from 'react-native-onyx';
import type {OnyxEntry} from 'react-native-onyx';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import type {CompanyCardFeed} from '@src/types/onyx';
    return feedName.toUpperCase() as ValueOf<typeof CONST.COMPANY_CARD.FEED_NAME>;
}

/**
 * Check if a company card feed has a valid connection status
 * This prevents false-positive "fix connection" warnings when the feed is actually working
 */
function isCompanyCardFeedConnected(feed: OnyxEntry<CompanyCardFeed>): boolean {
    if (!feed) {
        return false;
    }
    
    // If the feed has no error or the error is not a connection error, consider it connected
    const hasConnectionError = feed.errors && Object.keys(feed.errors).some((key) => 
        key.includes('connection') || key.includes('CONNECT')
    );
    
    // Also check if the feed has recent successful sync - if lastSync is recent and no critical errors
    const hasRecentSync = feed.lastSync && (Date.now() - feed.lastSync < CONST.COMPANY_CARD.SYNC_TIMEOUT);
    
    return !hasConnectionError || hasRecentSync;
}

/**
 * Get the custom feed name for a given feed
 */
    getCustomFeedName,
    getFeedIcon,
    getBankName,
    isCompanyCardFeedConnected,
};