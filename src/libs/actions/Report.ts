import type {OnyxEntry} from 'react-native-onyx';
import Onyx from 'react-native-onyx';
import _ from 'underscore';
import Navigation from '@libs/Navigation/Navigation';
import type {ReportAction, ReportActions, Report, Transaction, Policy, PersonalDetails, Session, Participant} from '@src/types/onyx';
import * as API from '@libs/API';
import type {MergeExpensesParams} from '@libs/API/parameters';
            if (response?.reportID) {
                // Navigate to the merged report
                const mergedReportID = response.reportID;
                
                // Before navigating, ensure the report data is available to prevent "Not Here" flash
                // by setting the report in Onyx first
                if (response.report) {
                    Onyx.merge(`${ONYXKEYS.COLLECTION.REPORT}${mergedReportID}`, response.report);
                }
                Navigation.navigate(ROUTES.REPORT_WITH_ID.getRoute(mergedReportID));
            }
        },