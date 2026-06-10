import React, {useState} from 'react';
import {View} from 'components/View';
import {withLocalize} from 'components/withLocalize';
import {useNetwork} from 'components/NetworkContext';
import {useTheme} from 'hooks/useTheme';
import * as Card from 'components/Card';
import * as ExpensiForm from 'components/Form';
import * as ExpensiPicker from 'components/ExpensiPicker';
import * as DatePicker from 'components/DatePicker';
import * as Text from 'components/Text';
import * as Button from 'components/Button';
import * as assignCard from 'libs/actions/Card';

const WorkspaceCardPage = () => {
    const {translate} = withLocalize();
    const {isOffline} = useNetwork();
    const theme = useTheme();
    const [assignee, setAssignee] = useState('');
    const [assignmentDate, setAssignmentDate] = useState(new Date());
    const [shouldSchedule, setShouldSchedule] = useState(false);
    
    const assigneeOptions = [
        {label: 'Assign immediately', value: 'immediate'},
        {label: 'Schedule for later', value: 'scheduled'}
    ];

    return (
        <View style={[theme.p5]}>
            <Text style={[theme.textLarge, theme.mb3]}>Assign Card</Text>
            
            <ExpensiForm.default
                onSubmit={() => {
                    if (shouldSchedule) {
                        assignCard.assignCardScheduled(card, assignee, assignmentDate);
                    } else {
                        assignCard.assignCardImmediate(card, assignee);
                    }
                }}
            >
                <ExpensiForm.Section
                    title="Card Assignment"
                    children={
                        <View>
                            <ExpensiPicker
                                label={translate('Assign to')}
                                items={assigneeOptions}
                                value={assignee}
                                onInputChange={(value) => setAssignee(value)}
                            />
                            
                            <DatePicker
                                label="Assignment Date"
                                value={assignmentDate}
                                onInputChange={setAssignmentDate}
                            />
                            
                            <ExpensiPicker
                                label="Assignment Type"
                                items={[
                                    {label: 'Assign now', value: 'immediate'},
                                    {label: 'Schedule for future date', value: 'future'}
                                ]}
                                onInputChange={setShouldSchedule}
                            />
                        </View>
                    }
                />
            </ExpensiForm.default>
        </View>
    );
};

export default withLocalize(WorkspaceCardPage);