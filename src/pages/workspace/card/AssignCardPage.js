import React, {useState} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {withOnyx} from 'react-native-onyx';
import _ from 'underscore';
import lodashGet from 'lodash/get';
import moment from 'moment';
import compose from '../../../libs/compose';
import HeaderWithBackButton from '../../../components/HeaderWithBackButton';
import ScreenWrapper from '../../../components/ScreenWrapper';
import styles from '../../../styles/styles';
import Navigation from '../../../libs/Navigation/Navigation';
import ROUTES from '../../../ROUTES';
import * as Card from '../../../libs/actions/Card';
import useLocalize from '../../../hooks/useLocalize';
import Form from '../../../components/Form';
import * as ValidationUtils from '../../../libs/ValidationUtils';
import DatePicker from '../../../components/DatePicker';
import CONST from '../../../CONST';
import TextInput from '../../../components/TextInput';
import ONYXKEYS from '../../../ONYXKEYS';
import Text from '../../../components/Text';
import Picker from '../../../components/Picker';
import DateUtils from '../../../libs/DateUtils';

const propTypes = {
    /** Wallet terms */
    walletTerms: PropTypes.shape({
        /** The date the card was issued */
        issuedDate: PropTypes.string,
    }),
};

const defaultProps = {
    walletTerms: {},
};

function AssignCardPage({walletTerms}) {
    const {translate} = useLocalize();
    const [selectedDate, setSelectedDate] = useState(new Date());
    
    const validate = (values) => {
        const errors = {};
        if (!values.selectedDate || !moment(values.selectedDate).isValid()) {
            errors.selectedDate = 'common.error.fieldRequired';
        }
        return errors;
    };

    const submit = (values) => {
        // Submit logic would go here
        // This would include passing the selected date for future assignment
        Card.assignCard(values.cardID, values.assigneeEmail, values.selectedDate);
    };

    return (
        <ScreenWrapper includeSafeAreaPaddingBottom={false}>
            <HeaderWithBackButton
                title={translate('workspace.card.assignCard')}
                onBackButtonPress={() => Navigation.goBack(ROUTES.WORKSPACE_CARD)}
            />
            <Form
                formID={ONYXKEYS.FORMS.ASSIGN_CARD_FORM}
                validate={validate}
                onSubmit={submit}
                submitButtonText={translate('workspace.card.assign')}
                style={[styles.mh5, styles.flexGrow1]}
            >
                <View style={styles.mb4}>
                    <Text style={[styles.textLabelSupporting, styles.mb1]}>
                        {translate('workspace.card.assignmentDate')}
                    </Text>
                    <DatePicker
                        inputID="selectedDate"
                        label={translate('workspace.card.whenAssign')}
                        defaultValue={new Date()}
                        minDate={new Date()}
                        maxDate={moment().add(1, 'year').toDate()}
                    />
                </View>
                <View style={styles.mb4}>
                    <Text style={[styles.textLabelSupporting, styles.mb1]}>
                        {translate('workspace.card.immediateAssignment')}
                    </Text>
                    <Picker
                        inputID="assignmentType"
                        items={[
                            {label: translate('workspace.card.immediate'), value: 'immediate'},
                            {label: translate('workspace.card.futureDate'), value: 'future'},
                        ]}
                        defaultValue="immediate"
                    />
                </View>
            </Form>
        </ScreenWrapper>
    );
}

AssignCardPage.propTypes = propTypes;
AssignCardPage.defaultProps = defaultProps;

export default withOnyx({
    walletTerms: {
        key: ONYXKEYS.WALLET_TERMS,
    },
})(AssignCardPage);