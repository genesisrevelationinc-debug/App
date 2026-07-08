import React, {useCallback, useMemo, useState} from 'react';
import {View} from 'react-native';
import type {OnyxEntry} from 'react-native-onyx';
import {isValidCardName} from '@libs/ValidationUtils';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@styles/useThemeStyles';
import type {AccountData} from '@src/types/onyx';
import PaymentCardForm from './PaymentCardForm';
import type {PaymentCardFormProps} from './types';
import {getYearFromExpirationDate, getMonthFromExpirationDate, getCardNumberMasked, getCardNumber} from './utils';

function PaymentCardForm({
    accountData,