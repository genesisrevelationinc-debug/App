import * as OnyxUtils from '../OnyxUtils';
import * as PersonalDetailsUtils from '../PersonalDetailsUtils';
import * as ReportUtils from '../ReportUtils';
import * as SessionUtils from '../SessionUtils';
import * as UserUtils from '../UserUtils';
import {SIDE_EFFECT_REQUEST_COMMANDS} from '../Request';
import {reportPropTypes} from '../../pages/reportPropTypes';
const allSortedReports = {};
const allReportsData = {};

function fetchAllReports() {
    API.read({returnValueList: 'reports'});
}

function clearData() {
    allReports = {};
    allSortedReports = {};
    if (!reportID) {
        return;
    }
    fetchAllReports();
    const report = allReports[reportID];
    if (!report) {
        return;