import React from 'react';
import {View, Pressable, Text, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles/styles';
import Icon from '../Icon';
    constructor(props) {
        super(props);
        this.state = {
            // Add state for future assignment date
            futureAssignDate: '',
            showDatePicker: false,
            isFutureDated: false,
            isFocused: false,
        };

    }

    render() {
        const {isFutureDated, futureAssignDate} = this.state;
        
        return (
            <View style={styles.flex1}>
                <Pressable
                    ref={this.pressableRef}
                   	onPress={() => {
                        if (this.props.onPress) {
                            this.props.onPress();
                        }
                    }}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                >
                    <View style={[styles.flexRow, styles.alignItemsCenter]}>
                        <View style={styles.flex1}>
                            {this.props.children}
                        </View>
                        {this.props.focusedLabel && (
                            <Text style={styles.ml2}>
                                {this.props.focusedLabel}
                            </Text>
                        )}
                        {this.props.inlineLabel && (
                            <Text style={styles.ml2}>
                                {this.props.inlineLabel}
                            </Text>
                        )}
                    </View>
                    {this.state.showDatePicker && (
                        <View style={styles.mt2}>
                            <Text>Assign Date:</Text>
                            <TextInput
                                value={this.state.futureAssignDate}
                                placeholder="YYYY-MM-DD"
                                onChangeText={(text) => this.setState({futureAssignDate: text})}
                            />
                        }
                >