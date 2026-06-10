import React from 'react';
import {View, Text} from 'react-native';
import _ from 'underscore';
import lodashGet from 'lodash/get';
import PropTypes from 'prop-types';
    }).isRequired,
};

const WorkspaceCards = (props) => {
    const {translate} = props;
    const menuItems = props.cardList.map((card) => {
        const isCheckingDomain = props.user.isUsingExpensifyCard || props.user.isCheckingDomain;
        return (
            <WorkspaceCardListItem
                key={card.cardID}
                card={card}
                workspaceID={props.workspaceID}
                isSmallScreen={props.isSmallScreen}
                isCheckingDomain={isCheckingDomain}
            />
        );
    });
    
const WorkspaceCards = (props) => {
    const {translate} = props;
    const menuItems = props.cardList.map((card) => {
        );
    });

    return menuItems;
};

    return (
        <View style={[styles.flex1, styles.mt3]}>
            <View style={[styles.cardList, styles.flex1, styles.mt3]}>
                {menuItems}
            </View>
        </View>
        <View style={[styles.flexRow, styles.justifyContentBetween, styles.p4]}>
            <Text style={[styles.textStrong, styles.flex1]}>Card</Text>
            <Text style={[styles.textStrong, styles.flex1, styles.textAlignRight]}>Current Cardholder</Text>
        </View>
    );
};