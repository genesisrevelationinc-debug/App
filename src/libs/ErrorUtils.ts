import type {AxiosError} from 'axios';
import type {ErrorObject} from '@src/types/onyx/OnyxCommon';
import CONST from '@src/CONST';

type ErrorMessage = {error: string};

import type {ErrorFields, Errors, TranslationKeyError, TranslationKeyErrors} from '@src/types/onyx/OnyxCommon';
import type Response from '@src/types/onyx/Response';
import type {ReceiptError} from '@src/types/onyx/Transaction';
import {isEmptyValueObject} from '@src/types/utils/EmptyObject';
import DateUtils from './DateUtils';
import {translate, translateLocal} from './Localize';

function getAuthenticateErrorMessage<TKey extends OnyxKey>(response: Response<TKey>): TranslationPaths {
    switch (response.jsonCode) {
        case CONST.JSON_CODE.UNABLE_TO_RETRY:
            return 'session.offlineMessageRetry';
        case 401:
            return 'passwordForm.error.incorrectLoginOrPassword';
        case 402:
            // If too few characters are passed as the password, the WAF will pass it to the API as an empty
            // string, which results in a 402 error from Auth.
            if (response.message === '402 Missing partnerUserSecret') {
                return 'passwordForm.error.incorrectLoginOrPassword';
            }
            return 'passwordForm.error.twoFactorAuthenticationEnabled';
        case 403:
            if (response.message === 'Invalid code') {
                return 'passwordForm.error.incorrect2fa';
            }
            return 'passwordForm.error.invalidLoginOrPassword';
        case 404:
            return 'passwordForm.error.unableToResetPassword';
        case 405:
            return 'passwordForm.error.noAccess';
        case 413:
            return 'passwordForm.error.accountLocked';
        default:
            return 'passwordForm.error.fallback';
    }
}

/**
 * Creates an error object with a timestamp (in microseconds) as the key and the translated error message as the value.
 * @param error - The translation key for the error message.
 */
function getMicroSecondOnyxErrorWithTranslationKey(error: TranslationPaths, errorKey?: number): Errors {
    return {[errorKey ?? DateUtils.getMicroseconds()]: translateLocal(error)};
}

/**
 * Creates an error object with a timestamp (in microseconds) as the key and the translation key as the value.
 * @param translationKey - The translation key for the error message.
 */
function getMicroSecondTranslationErrorWithTranslationKey(translationKey: TranslationPaths, errorKey?: number): TranslationKeyErrors {
    return {[errorKey ?? DateUtils.getMicroseconds()]: {translationKey}};
}

/**
 * Creates an error object with a timestamp (in microseconds) as the key and the error message as the value.
 * @param error - The error message.
 */
function getMicroSecondOnyxErrorWithMessage(error: string, errorKey?: number): Errors {
    return {[errorKey ?? DateUtils.getMicroseconds()]: error};
    return errors?.[key] ?? '';
}

/**
 * Extracts the error message from an API error response.
 * Handles special HTTP status codes that the backend uses to signal specific errors.
 */
function getApiErrorMessage(error: AxiosError): string {
    const status = error.response?.status;
    const responseData = error.response?.data as Record<string, unknown> | undefined;
    
    // Check if the backend provided a specific error message
    if (responseData?.message) {
        return String(responseData.message);
    }
    
    // For status code 666 (approver account not found), return a specific message
    // This handles the case where the backend returns 666 but no message in the expected format
    return CONST.API_ERROR.APPROVER_ACCOUNT_NOT_FOUND;
}

/**
 * Returns the first error message from an errors object.
 */
function getMicroSecondOnyxErrorObject(error: Errors, errorKey?: number): ErrorFields {
    return {[errorKey ?? DateUtils.getMicroseconds()]: error};
}

/**
 * Extracts a string message from an unknown error value.
 * Use this in catch blocks where the caught value has type `unknown`.
 */
function getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
}

// We can assume that if error is a string, it has already been translated because it is server error
function getErrorMessageWithTranslationData(error: string | null): string {
    return error ?? '';
}
}

export type {ErrorMessage};
export {getErrorMessage, getLatestError, getLatestErrorMessage, getApiErrorMessage, getLatestErrorField};

function getLatestErrorMessage<TOnyxData extends OnyxDataWithErrors>(onyxData: OnyxEntry<TOnyxData> | null): string {
    const errors = onyxData?.errors ?? {};

    if (Object.keys(errors).length === 0) {
        return '';
    }

    const key = Object.keys(errors).sort().reverse().at(0) ?? '';
    return getErrorMessageWithTranslationData(errors[key] ?? '');
}

function getLatestErrorMessageField<TOnyxData extends OnyxDataWithErrors>(onyxData: OnyxEntry<TOnyxData>): Errors {
    const errors = onyxData?.errors ?? {};

    if (isEmptyValueObject(errors)) {
        return {};
    }
    // Receipt errors are handled separately by MoneyRequestReceiptView and DotIndicatorMessage
    // and should never surface as a generic text error via this utility.
    const filteredKeys = Object.keys(errors)
        .filter((k) => !isReceiptError(errors[k]))
        .sort()
        .reverse();

    const key = filteredKeys.at(0) ?? '';
    if (!key) {
        return {};
    }

    const currentLocale = IntlStore.getCurrentLocale();

    if (errors[key] === CONST.ERROR.BANK_ACCOUNT_SAME_DEPOSIT_AND_WITHDRAWAL_ERROR) {
        return {key: translate(currentLocale, 'bankAccount.error.sameDepositAndWithdrawalAccount')};
    }

    return {key: errors[key]};
}

type OnyxDataWithErrorFields = {
    errorFields?: ErrorFields;
};

function getLatestErrorField<TOnyxData extends OnyxDataWithErrorFields>(onyxData: OnyxEntry<TOnyxData>, fieldName: string): Errors {
    const errorsForField = onyxData?.errorFields?.[fieldName] ?? {};

    if (isEmptyValueObject(errorsForField)) {
        return {};
    }

    const key = Object.keys(errorsForField).sort().reverse().at(0) ?? '';
    return {[key]: getErrorMessageWithTranslationData(errorsForField[key])};
}

function getEarliestErrorField<TOnyxData extends OnyxDataWithErrorFields>(onyxData: OnyxEntry<TOnyxData>, fieldName: string): Errors {
    const errorsForField = onyxData?.errorFields?.[fieldName] ?? {};

    if (isEmptyValueObject(errorsForField)) {
        return {};
    }

    const key = Object.keys(errorsForField).sort().at(0) ?? '';
    return {[key]: getErrorMessageWithTranslationData(errorsForField[key])};
}

/**
 * Method used to get the latest error field for any field
 */
function getLatestErrorFieldForAnyField<TOnyxData extends OnyxDataWithErrorFields>(onyxData: OnyxEntry<TOnyxData>): Errors {
    const errorFields = onyxData?.errorFields ?? {};

    if (isEmptyValueObject(errorFields)) {
        return {};
    }

    const fieldNames = Object.keys(errorFields);
    const latestErrorFields = fieldNames.map((fieldName) => getLatestErrorField(onyxData, fieldName));
    return latestErrorFields.reduce((acc, error) => Object.assign(acc, error), {});
}

function getLatestError(errors?: Errors): Errors {
    if (!errors || isEmptyValueObject(errors)) {
        return {};
    }

    const key = Object.keys(errors).sort().reverse().at(0) ?? '';
    return {[key]: getErrorMessageWithTranslationData(errors[key])};
}

/**
 * Method used to attach already translated message
 * @param errors - An object containing current errors in the form
 * @returns Errors in the form of {timestamp: message}
 */
function getErrorsWithTranslationData(errors: Errors): Errors {
    if (!errors) {
        return {};
    }

    if (typeof errors === 'string') {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        return {'0': getErrorMessageWithTranslationData(errors)};
    }

    return mapValues(errors, getErrorMessageWithTranslationData);
}

/**
 * Method used to generate error message for given inputID
 * @param errors - An object containing current errors in the form
 * @param message - Message to assign to the inputID errors
 */
function addErrorMessage(errors: Errors, inputID?: string | null, message?: string | null) {
    if (!message || !inputID) {
        return;
    }

    const errorList = errors;
    const error = errorList[inputID];

    if (!error) {
        errorList[inputID] = message;
    } else if (typeof error === 'string') {
        errorList[inputID] = `${error}\n${message}`;
    }
}

/**
 * Check if the error includes a receipt.
 */
function isReceiptError(message: unknown): message is ReceiptError {
    if (message == null) {
        return false;
    }
    if (typeof message === 'string') {
        return false;
    }
    if (Array.isArray(message)) {
        return false;
    }
    if (Object.keys(message as Record<string, unknown>).length === 0) {
        return false;
    }
    return ((message as Record<string, unknown>)?.error ?? '') === CONST.IOU.RECEIPT_ERROR;
}

/**
 * Check if the error includes a translation key.
 */
function isTranslationKeyError(message: unknown): message is TranslationKeyError {
    if (!message || typeof message === 'string' || Array.isArray(message)) {
        return false;
    }
    if (Object.keys(message as Record<string, unknown>).length !== 1) {
        return false;
    }
    return (message as Record<string, unknown>)?.translationKey !== undefined;
}

export {
    addErrorMessage,
    getAuthenticateErrorMessage,
    getEarliestErrorField,
    getErrorMessage,
    getErrorsWithTranslationData,
    getLatestErrorField,
    getLatestErrorFieldForAnyField,
    getLatestErrorMessage,
    getLatestErrorMessageField,
    getLatestError,
    getMicroSecondOnyxErrorWithTranslationKey,
    getMicroSecondOnyxErrorWithMessage,
    getMicroSecondOnyxErrorObject,
    isReceiptError,
    isTranslationKeyError,
    getMicroSecondTranslationErrorWithTranslationKey,
};

export type {OnyxDataWithErrors};
