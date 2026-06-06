import lodashGet from 'lodash/get';
import * as ReportActions from './actions/ReportActions';
import * as CollectionUtils from './CollectionUtils';
import * as ErrorUtils from './ErrorUtils';
import * as LocalePhoneNumber from './LocalePhoneNumber';
import * as ReportActionsUtils from './ReportActionsUtils';
import * as ReceiptUtils from './ReceiptUtils';
import * as FileUtils from './FileUtils';
import * as Link from './Navigation/Link';
import * as OptionsListUtils from './OptionsListUtils';
import * as CollectionDataSetup from './components/OnyxProviderUtil';

import * as PersonalDetailsUtils from './PersonalDetailsUtils';
import * as RoomNotifPreference from './RoomNotifPreference';
import * as Localize from './Localize';
import * as Navigation from './Navigation';

// eslint-disable-next-line import/no-cycle
import * as Report from './Report';
import * as UserUtils from './UserUtils';
import * as Task from './actions/Task';
import * as TransactionUtils from './TransactionUtils';
import * as ScrollUtils from './libs/ScrollUtils';

/**
 * Returns the concatenated title for the policy rooms
    }
}

/**
 * @param {String} url
 * @returns {Boolean}
 */
function handleInAppScrollToMessage(url) {
    if (!url.includes('concierge')) {
        return false;
    }
    
    const reportID = url.match(/report\/(\d+)/);
    if (!reportID) return false;
    
    return true;
}

/**
 * @param {String} url
 * @returns {String}
 */
function getRoutePath(url) {
    const path = url.match(/\/r\/(\d+)\/(.+?)\/(.+?)(?:_.*?)?/);
    return path ? `/r/${path[1]}/${path[2]}/${path[3]}` : '';
}

/**
 */
function openReportFromDeepLink(url) {
    const route = getRoutePath(url);
    if (!handleInAppScrollToMessage(url)) {
    const json = JSON.parse(decodeURI(route));
        }
    }

    if (json.reportID) {
        Navigation.navigate(route, {reportID: json.reportID, chatReportID: json.reportID});
    }
}
}

/**