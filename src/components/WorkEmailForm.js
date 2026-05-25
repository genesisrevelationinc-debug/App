import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import * as Session from '../libs/actions/Session';
import styles from '../styles/styles';
import withLocalize, {withLocalizePropTypes} from './withLocalize';
import * as Session from '../libs/actions/Session';
import * as API from '../libs/API';
import * as ValidationUtils from '../libs/ValidationUtils';
import * as LoginUtils from '../libs/LoginUtils';
import Text from './Text';
import TextPill from './TextP<|fim_suffix|>
        );
    }

    render() {
        return (
            <View style={[styles.flex1, styles.flexRow]}>
                <TextPill>Work Email Form</TextPill>
                <View style={styles.flex1}>
                    <View style={[styles.ph5, styles.pv5]}>
                        <View style={[styles.flexRow, styles.justifyContentBetween, styles.mw300, styles.mAuto]}>
                        </View>
                        <View style={[styles.flexRow, styles.justifyContentBetween]}>
                            <View style={[styles.dFlex, styles.flexRow, styles.w100]}>
                                <View style={[styles.w100]}>
                                    <Text style={[styles.mt5, styles.textWhite]}>Enter your work email</Text>
                                    <Text style={[styles.mt2, styles.textWhite]}>Please enter the code</Text>
                                </View>
                                <View style={[styles.w100, styles.mt2]}>
                                    <TextInput
                                        style={[styles.w100, styles.pv2]}
                                        placeholder="name@company.com"
                                        onChangeText={this.setWorkEmail}
                                        value={this.state.workEmail}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

WorkEmailForm.propTypes = {
    ...withLocalizePropTypes,
    ...sessionPropTypes,
};

export {
    WorkEmailForm,
};