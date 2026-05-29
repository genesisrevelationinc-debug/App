import React, {useState} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {withOnyx} from 'react-native-onyx';
import _ from 'underscore';
import lodashGet from 'lodash/get';
import moment from 'moment';
import CONST from '../../../CONST';
import ONYXKEYS from '../../../ONYXKEYS';
import styles from '../../../styles/styles';
import CheckboxWithLabel from '../../../components/CheckboxWithLabel';
import Text from '../../../components/Text';
import DatePicker from '../../../components/DatePicker';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import HeaderWithBackButton from '../../../components/HeaderWithBackButton';
import ScreenWrapper from '../../../components/ScreenWrapper';
import Form from '../../../components/Form';
import * as CardUtils from '../../../libs/CardUtils';
import * as WorkspaceCard from '../../../libs/actions/WorkspaceCard';
import useLocalize from '../../../hooks/useLocalize';
import Navigation from '../../../libs/Navigation/Navigation';
import ROUTES from '../../../ROUTES';

const propTypes = {
    /** URL params */
    route: PropTypes.shape({
        /** Params from the URL path */
        params: PropTypes.shape({
            /** policyID is used to get workspace details */
            policyID: PropTypes.string.isRequired,
            
            /** cardID is used to get card details */
            cardID: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,

    /** The card being assigned */
    card: PropTypes.shape({
        /** The cardID of the card */
        cardID: PropTypes.string,
        
        /** The card name */
        cardName: PropTypes.string,
    }),

    /** The policy of the card */
    policy: PropTypes.shape({
        /** The policyID of the policy */
        id: PropTypes.string,
        
        /** The name of the policy */
        name: PropTypes.string,
    }),
};

const defaultProps = {
    card: {},
    policy: {},
};

function AssignCardPage({route, card, policy}) {
    const {policyID, cardID} = route.params;
    const {translate} = useLocalize();
    const [futureDateEnabled, setFutureDateEnabled] = useState(false);
    const [assignmentDate, setAssignmentDate] = useState(moment().format(CONST.DATE.MOMENT_FORMAT_STRING));
    
    const handleAssignCard = (values) => {
        const assigneeEmail = values.assignee;
        const effectiveDate = futureDateEnabled ? assignmentDate : moment().format(CONST.DATE.MOMENT_FORMAT_STRING);
        
        WorkspaceCard.assignCard(policyID, cardID, assigneeEmail, effectiveDate);
        Navigation.goBack(ROUTES.getWorkspaceCardRoute(policyID));
    };

    return (
        <ScreenWrapper includeSafeAreaPaddingBottom={false}>
            <HeaderWithBackButton
                title={translate('workspace.card.assignCard')}
                onBackButtonPress={() => Navigation.goBack()}
            />
            <Form
                formID={ONYXKEYS.FORMS.ASSIGN_CARD_FORM}
                submitButtonText={translate('workspace.card.assign')}
                onSubmit={handleAssignCard}
                validate={() => ({})}
                enabledWhenOffline
            >
                <View style={[styles.mh5, styles.mb5]}>
                    <Text style={[styles.textHeadline, styles.mb3]}>
                        {card.cardName || translate('workspace.card.card')}
                    </Text>
                    <Text style={[styles.textLabelSupporting, styles.mb1]}>
                        {translate('workspace.card.assignee')}
                    </Text>
                    <TextInput
                        inputID="assignee"
                        label={translate('workspace.card.assignee')}
                        accessibilityLabel={translate('workspace.card.assignee')}
                        accessibilityRole={CONST.ACCESSIBILITY_ROLE.TEXT}
                        placeholder={translate('workspace.card.enterAssignee')}
                    />
                    
                    <CheckboxWithLabel
                        style={[styles.mb3, styles.mt5]}
                        isChecked={futureDateEnabled}
                        onPress={() => setFutureDateEnabled(!futureDateEnabled)}
                        label={translate('workspace.card.scheduleAssignment')}
                    />
                    
                    {futureDateEnabled && (
                        <View style={styles.mb5}>
                            <Text style={[styles.textLabelSupporting, styles.mb1]}>
                                {translate('workspace.card.assignmentDate')}
                            </Text>
                            <DatePicker
                                value={assignmentDate}
                                onInputChange={setAssignmentDate}
                                label={translate('workspace.card.assignmentDate')}
                                placeholder={translate('workspace.card.selectDate')}
                                maximumDate={moment().add(1, 'years').toDate()}
                                minimumDate={moment().toDate()}
                            />
                            <Text style={[styles.textLabelSupporting, styles.mt1]}>
                                {translate('workspace.card.assignmentDateHelp')}
                            </Text>
                        </View>
                    )}
                </View>
            </Form>
        </ScreenWrapper>
    );
}

AssignCardPage.propTypes = propTypes;
AssignCardPage.defaultProps = defaultProps;

export default withOnyx({
    card: {
        key: ({route}) => `${ONYXKEYS.COLLECTION.CARD}${route.params.cardID}`,
    },
    policy: {
        key: ({route}) => `${ONYXKEYS.COLLECTION.POLICY}${route.params.policyID}`,
    },
})(AssignCardPage);