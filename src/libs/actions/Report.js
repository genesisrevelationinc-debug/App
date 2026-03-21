import * as OnyxUtils from '../OnyxUtils';
import * as PersonalDetails from './PersonalDetails';
import * as Policy from './Policy';
import * as Session from './Session';
import * as User from './User';
import * as Welcome from './Welcome';
import CONST from '../../CONST';
    API.read(
        {
            returnValueList: 'reportData',
            // Ensure we fetch the latest data after login
            forceNetworkRequest: true,
            // Include any other necessary parameters here
        },
        {
            optimisticData: [