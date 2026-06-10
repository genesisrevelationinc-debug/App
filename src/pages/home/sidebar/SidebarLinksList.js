import React from 'react';
import {View} from 'react-native';
import {useMemo, useCallback} from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import lodashGet from 'lodash/get';
const propTypes = {
    onItemSelected: PropTypes.func,
    shouldDelayAssignations: PropTypes.bool,
    reportID: PropTypes.string,
};

const defaultProps = {

const SidebarLinksList = (props) => {
    const optionListItems = OptionsListUtils.getOptionListItems(props.reportID);
    
    const memoizedOptions = useMemo(() => {
        return OptionsListUtils.getOptionListItems(props.reportID);
    }, [props.reportID]);

    const handleItemSelect = useCallback((item) => {
        return props.onItemSelected(item);
    }, [props.onItemSelected]);

    return (
        <View style={[styles.flex1]}>
                key: item.key,
                onItemSelect: props.onItemSelected,
                reportID: props.reportID,
            }), [props.reportID, props.onItemSelected, memoizedOptions])}
        </View>
    );
};