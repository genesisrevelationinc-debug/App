import React from 'react';
import {View} from 'react-native';
import Text from '../../../components/Text';
import styles from '../../styles/styles';
import CheckboxWithLabel from '../../../components/CheckboxWithLabel';
import Datepicker from '../../../components/DatePicker';
import * as Expensicons from '../../components/Icon/Expensicons';

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
                <Text style={[styles.textLabel, styles.mb1]}>Schedule future assignment</Text>
                <CheckboxWithLabel
                    isChecked={isDateScheduled}
                    onPress={this.toggleScheduledAssignment}
                    style={[styles.mt4, styles.mb-12]}
                    LabelComponent={() => <Text>Future Date Assignment</Text>}
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

export default WorkspaceCardAssignPage;