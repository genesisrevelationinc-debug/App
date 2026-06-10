import React from 'react';
import PropTypes from 'prop-types';
import {withOnyx} from 'react-native-onyx';
import _ from 'underscore';
import lodashGet from 'lodash/get';
import {View} from 'react-native';
import Text from '../../../components/Text';
import styles from '../../styles/styles';
import CheckboxWithLabel from '../../../components/CheckboxWithLabel';
import * as Expensicons from '../../components/Icon/Expensicons';
import * as WorkspaceCard from './WorkspaceCard';
import Datepicker from '../../../components/DatePicker';
import StatePicker from '../../../components/StatePicker';
import {DEFAULT_TIME_ZONE} from 'react-native-config';

class WorkspaceCardAssignPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDateScheduled: false,
            scheduledDate: '',
        };
    }

    toggleScheduledAssignment = () => {
        this.setState(prevState => ({isDateScheduled: !prevState.isDateScheduled}));
    };

    render() {
        const {isDateScheduled, scheduledDate} = this.state;
        
        return (
            <View style={[styles.mh5, styles.mb5]}>
                <CheckboxWithLabel
                    isChecked={isDateScheduled}
                    onPress={this.toggleScheduledAssignment}
                    style={[styles.mt4, styles.mb-12]}
                    LabelComponent={() => <Text>Schedule future assignment</Text>}
                />
                {isDateScheduled && (
                    <View style={[styles.mt3]}>
                        <Text style={[styles.textLabel, styles.mb1]}>Assignment Date</Text>
                        <Datepicker
                            value={scheduledDate}
                            onInputChange={(date) => this.setState({scheduledDate: date})}
                        />
                    </View>
                )}
            </View>
        );
    }
}

export default withOnyx({
    // Onyx props would be connected here
})(WorkspaceCardAssignPage);