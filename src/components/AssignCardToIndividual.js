import React, {useState} from 'react';
import {View, Text} from 'react-native';
import DatePicker from './DatePicker';
import Button from './Button';
import ExpensiPicker from './ExpensiPicker';
import {assignCard} from '../libs/actions/Card';

const AssignCardToIndividual = ({card, onClose}) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [assignee, setAssignee] = useState('');
    const [assignmentDate, setAssignmentDate] = useState('today');
    
    const handleAssign = () => {
        // Current behavior - immediate assignment
        if (assignmentDate === 'today') {
            assignCard(card, assignee, selectedDate);
        } else {
            // Future-dated assignment functionality
            assignCard(card, assignee, selectedDate);
        }
        onClose();
    };

    return (
        <View>
            <Text>Assign Card</Text>
            <ExpensiPicker
                label="Select assignee"
                items={assigneeOptions}
                onChange={(value) => setAssignee(value)}
            />
            <DatePicker
                label="Assignment Date"
                value={selectedDate}
                onDateChange={setSelectedDate}
            />
            <ExpensiPicker
                label="Assignment Timing"
                items={[
                    {label: 'Today', value: 'today'},
                    {label: 'Future Date', value: 'future'}
                ]}
                onChange={(value) => setAssignmentDate(value)}
            />
            <Button
                title="Assign Card"
                onPress={handleAssign}
            />
        </View>
    );
};

export default AssignCardToIndividual;