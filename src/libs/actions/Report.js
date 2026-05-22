/**
 * @file    Report.js
 * @brief   This file contains utility functions for managing reports and expenses
 */
'use strict';

import Onyx from 'react-native-onyx';
import {OnyxEntry} from 'react-native-onyx';
import {format} from 'date-fns';
import {get} from 'lodash';

/**
 * Prevents a single expense from appearing on multiple reports simultaneously by ensuring
 * expense-report relationships are atomic
 */
const MAX_REPORT_ID = 1000000;
const MIN_REPORT_ID = 1;

/**
 * Validates that an expense can only belong to one report at a time
 * @param {Object} expense
 * @param {Object} report
 * @returns {Boolean}
 */
export function validateSingleReportPerExpense(expense, report) { }