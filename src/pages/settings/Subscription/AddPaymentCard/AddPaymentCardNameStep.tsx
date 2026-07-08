// ... existing code ...
import React from 'react';
import {View} from 'react-native';
import {useOnyx} from 'react-native-onyx';
                        name="nameOnCard"
                        label={translate('addPaymentCard.nameOnCard')}
                        accessibilityLabel={translate('addPaymentCard.nameOnCard')}
                        pattern={/^[a-zA-Z0-9\s]+$/}
                        maxLength={CONST.ADD_PAYMENT_CARD_FORM.MAX_LENGTH.NAME}
                        minLength={CONST.ADD_PAYMENT_CARD_FORM.MIN_LENGTH.NAME}
                        inputMode="text"
    );
}

export default AddPaymentCardNameStep;