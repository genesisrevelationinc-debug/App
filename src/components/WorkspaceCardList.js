import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import moment from 'moment';
import _ from 'underscore';
import PropTypes from 'prop-types';
import styles from '../styles/styles';
import {isSameDay} from '../libs/DateUtils';
import withLocalize from '../components/withLocalize';
import * as Expensicons from '../components/Icon/Expensicons';
import * as Illustrations from '../components/Icon/Illustrations';
import * as OptionsList from '../components/OptionsList';
import * as ReimbursementAccount from '../libs/actions/ReimbursementAccount';
import * as Workspace from '../libs/actions/Workspace';
import * as CardUtils from '../libs/CardUtils';

const WorkspaceCardList = (props) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedAssignee, setSelectedAssignee] = useState(null);
    const [isAssigning, setIsAssigning] = useState(false);
    const [showAssignmentModal, setShowAssignmentModal] = useState(false);
    const [assignmentDate, setAssignmentDate] = useState(new Date());
    const [assignmentTime, setAssignmentTime] = useState(null);
    
    // Check if we need to show future date assignment option
    const [showFutureDateOption, setShowFutureDateOption] = useState(false);
    
    // Add future date assignment functionality
    const setupFutureDateAssignment = () => {
        setShowFutureDateOption(true);
    };
    
    // Initialize the component
    useEffect(() => {
        setupFutureDateAssignment();
    }, []);
    
    // Handle card assignment with future date
    const assignCardWithFutureDate = (card, assignee, futureDate = null) => {
        if (futureDate && moment(futureDate).isAfter(moment())) {
            // Schedule future assignment
            return assignCardFuture(card, assignee, futureDate);
        } else {
            // Assign immediately
            return assignCardNow(card, assignee);
        }
    };
    
    // Handle immediate card assignment
    const assignCardNow = (card, assignee) => {
        // Implementation for immediate assignment
        return CardUtils.assignCardToEmployee(card, assignee);
    };
    
    // Handle future card assignment
    const assignCardFuture = (card, assignee, futureDate) => {
        // Implementation for future assignment
        if (!moment(futureDate).isSame(moment(), 'day')) {
            // Schedule for future date
            return CardUtils.scheduleCardAssignment(card, assignee, futureDate);
        }
        return null;
    };
    
    // Updated to include scheduling functionality
    const handleAssignCard = (card, assignee, assignmentDate = null) => {
        // If assignmentDate is provided, create scheduled assignment
        if (assignmentDate && moment(assignmentDate).isAfter(moment())) {
            // Store the future assignment in pending assignments
            const futureAssignments = JSON.parse(localStorage.getItem('futureCardAssignments') || '[]');
            futureAssignments.push({
                cardId: card.cardID,
                assignee: assignee,
                assignmentDate: assignmentDate,
                assignedAt: moment().toISOString()
            });
            localStorage.setItem('futureCardAssignments', JSON.stringify(futureAssignments));
        } else {
            // Assign immediately
            return assignCardWithFutureDate(card, assignee, assignmentDate);
        }
    };
    
    return (
        <View style={[styles.workspaceSectionContainer, styles.bodyCard]}>
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardHeaderText}>Company Cards</Text>
                </View>
                <View style={styles.cardBody}>
                    <OptionsList
                        sections={[
                            {
                                title: 'Company Cards',
                                data: props.cards,
                                renderItem: ({item}) => (
                                    <Workspace.CardItem
                                        card={item}
                                        onAssignCard={(assignee, futureDate) => {
                                            handleAssignCard(item, assignee, futureDate);
                                        }}
                                    />
                                ),
                                index: 0,
                            }
                        ]}
                        onSelectRow={(item) => {
                            setSelectedAssignee(item);
                        }}
                        onSelection={(item) => {
                            props.onCardSelect(item);
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

export default WorkspaceCardList;