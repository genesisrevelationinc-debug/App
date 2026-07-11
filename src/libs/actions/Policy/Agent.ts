import type {OnyxEntry} from 'react-native-onyx';
import type {OnyxUpdate} from 'react-native-onyx';
import * as API from '@libs/API';
import type {DeletePolicyAgentParams} from '@libs/API/parameters';
import {WRITE_COMMANDS} from '@libs/API/types';
import getPolicyEmployeeList from '@libs/PolicyEmployeeListUtils';
import type {OnyxData} from '@libs/actions/OnyxDerived';
import * as OnyxDerived from '@libs/actions/OnyxDerived';
import * as Report from '@libs/actions/Report';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import type {PolicyEmployeeList} from '@src/types/onyx';
import type {Policy} from '@src/types/onyx';
import type {Report} from '@src/types/onyx';
import type {ReportAction} from '@src/types/onyx';
import type {Session} from '@src/types/onyx';

type PolicyEmployeeListParams = {
    policyID: string;

type DeletePolicyAgentOnyxData = {
    optimisticData: OnyxData;
    successData: OnyxData;
    failureData: OnyxData;
};

    const policyEmployeeList = getPolicyEmployeeList(policyID);
    const employee = policyEmployeeList?.[email];
    const accountID = employee?.accountID;
    const sessionEmail = OnyxDerived.getSession()?.email;

    const optimisticData: OnyxUpdate[] = [
        {
        },
    ];

    const successData: OnyxUpdate[] = [
        {
            onyxMethod: CONST.ONYX.METHOD.MERGE,
            key: `${ONYXKEYS.COLLECTION.POLICY_EMPLOYEE_LIST}${policyID}`,
            value: {
                [email]: null,
            },
        },
    ];

    // If the deleted agent is the current user, we need to handle navigation
    if (sessionEmail === email) {
        // The user is deleting themselves - navigate away from policy pages
        Report.navigateToAndDeleteReport(reports, reportActions);
    }

    const failureData: OnyxUpdate[] = [
        {
            onyxMethod: CONST.ONYX.METHOD.MERGE,
        params,
        optimisticData,
        successData: [
            ...successData,
            ...optimisticData,
        ],
        failureData,
    };