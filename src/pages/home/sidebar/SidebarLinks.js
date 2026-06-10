import React from 'react';
import {View, Text} from 'react-native';
import {useCallback, useMemo} from 'react';
import _ from 'underscore';
import lodashGet from 'lodash/get';
import * as StyleUtils from '../../../styles/StyleUtils';
    const optionKeys = _.keys(optionListOptions);
    const shouldShowSubscript = optionListOptions.headerMessage ? 0 : 1;

    const memoizedOptions = useMemo(() => optionListOptions, [optionListOptions]);
    const shouldShow = UserUtils.hasLoginEmail() && !_.isEmpty(optionListOptions) && !optionListOptions.headerMessage;

    const optionListItems = optionKeys;
        return props.onItemSelected(optionItem);
    };

    const optionItems = useMemo(() => {
        return SidebarUtils.getOptionListItems(props.reportID);
    }, [props.reportID]);
    
    const handleItemSelect = useCallback((item) => {
        return props.onItemSelected(item);
    }, [props.onItemSelected]);

    const workspaces = Policies.getOrderedPolicies();
    const activeWorkspaceID = _.get(props.policy, 'id', null);
    const shouldHide = !(
                        <Text style={[styles.sidebarListContainer, styles.flex1]}>
                            {props.translate('notFound.cannotSeeAnything')}
                        </Text>
                    </View>
                )}
                {optionListItems.map((item) => (
                    <View>