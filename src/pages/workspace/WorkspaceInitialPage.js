import React, {useCallback, useMemo} from 'react';
import {View, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {withOnyx} from 'react-native-onyx';
import WorkspaceMembersPage from './WorkspaceMembersPage';
import * as PolicyUtils from '../../libs/PolicyUtils';

const WorkspaceInitialPage = (props) => {
    const hasOtherMembers = useMemo(() => {
        if (!props.policy) {
            return false;
        }
        const members = PolicyUtils.getWorkspaceMembers(props.policy.id);
        // Check if there are members other than the current user
        return members && Object.keys(members).length > 1;
    }, [props.policy]);

    // ... rest of component
};

const propTypes = {
    /** The route object passed by Stacks */
    route: PropTypes.shape({
    const policyMembers = useMemo(() => {
        if (!props.policy) {
            return [];
        } 
        return PolicyUtils.getWorkspaceMembers(props.policy.id);
    }, [props.policy]);

                        <MenuItem
                            title={translate('workspace.common.share')}
                            icon={Expensicons.Share}
                            onPress={() => Navigation.navigate(ROUTES.getWorkspaceShareRoute(props.policy.id))}
                            shouldShowRightIcon
                            disabled={!hasOtherMembers}
                        />