import type {OnyxUpdate} from 'react-native-onyx';
import Onyx from 'react-native-onyx';
import type {AxiosError} from 'axios';
import * as API from '@libs/API';
import type {SubmitReportParams} from '@libs/API/parameters';
import {READ_COMMANDS, WRITE_COMMANDS} from '@libs/API/types';
import * as TransactionUtils from '@libs/TransactionUtils';
import type {Report} from '@src/types/onyx';
import {isEmptyObject} from '@src/types/utils/Collections';
import {getApiErrorMessage} from '@libs/ErrorUtils';
import * as ErrorUtils from '@libs/ErrorUtils';
import, type {OnyxUpdatesFromServer} from '@src/types/onyx';
import ONYXKEYS from '@src/ONYXKEYS';
            },
        ],
        onFailure: (error) => {
            const axiosError = error as unknown as AxiosError;
            const errorMessage = getApiErrorMessage(axiosError);
            showErrorAlert(errorMessage);
        },
    });