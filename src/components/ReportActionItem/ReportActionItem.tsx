import type {RouteProp} from '@react-navigation/native';
import React, {useCallback, useMemo, useRef, useState, memo} from 'react';
import {InteractionManager, View} from 'react-native';
import type {OnyxEntry} from 'react-native-onyx';
import {useOnyx} from 'react-native-onyx';
    isFirstDayNewLine?: boolean;
};

function ReportActionItemComponent({
    action,
    report,
    reportActions,
    );
}

function areEqual(prevProps: ReportActionItemProps, nextProps: ReportActionItemProps) {
    return prevProps.action.reportActionID === nextProps.action.reportActionID &&
        prevProps.displayAsGroup === nextProps.displayAsGroup &&
        prevProps.isMostRecentIOUReportAction === nextProps.isMostRecentIOUReportAction &&
        prevProps.isFirstDayNewLine === nextProps.isFirstDayNewLine;
}

const ReportActionItem = memo(ReportActionItemComponent, areEqual);
ReportActionItem.displayName = 'ReportActionItem';

export default ReportActionItem;