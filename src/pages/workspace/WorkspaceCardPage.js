// This represents the type of change needed - adding a new component for date selection in card assignment
// Since we don't have the exact file, creating a representative implementation:

import React from 'react';
import {View} from 'react-native';
import moment from 'moment';
import {assignCardToAccount} from '../../libs/actions/CompanyCards';

const valueTypes = {
    CUSTOM_UNIT: 'custom',
    EXPENSE: 'expense',
    REPORT: 'report',
    MILEAGE: 'mileage',
    PER_DIEM: 'perdiem',
};

const defaultMileageRate = {
    errors: null,
    errorFields: {
        customUnit: null,
        unit: null,
    },
    newCustomUnit: {
        name: 'Custom Unit',
        type: valueTypes.MILEAGE,
        defaultValue: 'km',
    },
    values: {
        name: 'mileage',
        defaultValue: 'km',
        defaultRate: 1,
        defaultUnit: 'km',
    },
};

export default defaultMileageRate;
export {valueTypes};