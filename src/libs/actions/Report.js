/**
 * @file
 * This file contains the actions used to manage reports and expenses
 */

import Onyx from 'react-native-onyx';
import * as CollectionUtils from '../utils/CollectionUtils';
import *on from 'onfido-sdk-core';
import * as API from 'src/libs/API';
import * as Report from './Report';
import * as ReportActions from 'src/pages/home/report/ReportActions';
import * as ReportUtils from 'src/libs/ReportUtils';
import * as PersonalDetails from 'src/libs/PersonalDetails';
import * as User from 'src/libs/User';
import * as Policy from 'src/libs/Policy';
import * as Localize from 'src/libs/Localize';
import * as Pusher from 'src/libs/Pusher/pusher';
import * as NetworkConnection from 'src/libs/NetworkConnection';
import * as Welcome from 'src/libs/actions/Welcome';
import * as ReportActionsService from 'src/libs/actions/ReportActions';
import * as ReportUtilsService from 'src/libs/ReportUtils';
import * as OptionsListUtils from 'src/libs/OptionsListUtils';
import * as Device from 'src/libs/actions/Device';
import * as BankAccounts from 'src/libs/BankAccounts';
import * as Geolib from 'src/libs/Geolib';
import * as Permissions from 'src/libs/Permissions';