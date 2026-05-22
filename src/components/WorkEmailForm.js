import React from 'react';
import {View} from 'react-native';
import Text from '../Text';
import Button from '../Button';
import TextInput from '../TextInput';
import * as ValidationUtils from '../../libs/ValidationUtils';
import * as User from '../../services/UserService';
import {withOnyx} from 'react-native-onyx';
import withLocalize from '../withLocalize';
import compose from '../libs/compose';
import ONYX from 'react-native-onyx';

class WorkEmailForm extends React.Component {
    render() {
        return (
            <View>
                <Text style={{color: 'red'}}>Could not add work email</Text>
                <TextInput 
                    label="Work Email"
                    placeholder="Enter your work email"
                />
                <Button 
                    text="Add Work Email" 
                    onPress={() => {
                        // The issue is likely here - the form submission is not properly handling the verification flow
                        // The verification screen should show after work email is added
                    }}
                />
            </View>
        );
    }
}

export default WorkEmailForm;