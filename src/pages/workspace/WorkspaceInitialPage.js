import React from 'react';
import {InteractionManager} from 'react-native';
import {withOnyx} from 'react-native-onyx';
import PropTypes from 'prop-types';
import lodashGet from 'lodash/get';
        }

        const policyID = lodashGet(this.props.policy, 'id', '');
        
        // Use InteractionManager to defer navigation to prevent UI blocking
        // This fixes the page unresponsiveness issue when clicking Manage Settings
        InteractionManager.runAfterInteractions(() => {
            if (this.props.route.params && this.props.route.params.policyID) {
                Navigation.navigate(ROUTES.getWorkspaceAccountRoute(this.props.route.params.policyID));
            } else {
                Navigation.navigate(ROUTES.getWorkspaceAccountRoute(policyID));
            }
        });

        this.setState({isNavigateAfterBlocking: false});
    }

        }

        const policyID = lodashGet(this.props.policy, 'id', '');
        
        // Use InteractionManager to defer navigation to prevent UI blocking
        // This fixes the page unresponsiveness issue when clicking Manage Settings
        InteractionManager.runAfterInteractions(() => {
            if (this.props.route.params && this.props.route.params.policyID) {
                Navigation.navigate(ROUTES.getWorkspaceAccountRoute(this.props.route.params.policyID));
            } else {
                Navigation.navigate(ROUTES.getWorkspaceAccountRoute(policyID));
            }
        });

        this.setState({isNavigateAfterBlocking: false});
    }