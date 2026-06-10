import React, {useCallback, useMemo, memo} from 'react';
import {View} from 'react-native';
import type {OnyxEntry} from 'react-native-onyx';
import {useOnyx} from 'react-native-onyx';
    isUserCreatedPolicyRoom?: boolean;
};

function ReportActionItemSingleComponent({
    action,
    showHeader = true,
    wrapperStyles,
    );
}

function areEqual(prevProps: ReportActionItemSingleProps, nextProps: ReportActionItemSingleProps) {
    return (
        prevProps.action.reportActionID === nextProps.action.reportActionID &&
        prevProps.showHeader === nextProps.showHeader &&
        prevProps.isUserCreatedPolicyRoom === nextProps.isUserCreatedPolicyRoom
    );
}

const ReportActionItemSingle = memo(ReportActionItemSingleComponent, areEqual);
ReportActionItemSingle.displayName = 'ReportActionItemSingle';

export default ReportActionItemSingle;