import React, {useCallback, useEffect, useMemo, useRef, useState, memo} from 'react';
import {InteractionManager, View} from 'react-native';
import type {OnyxEntry} from 'react-native-onyx';
import {useOnyx} from 'react-native-onyx';
    isLoading?: boolean;
};

function ReportOptionListComponent({
    options,
    onSelectRow,
    optionHoveredStyle,
    );
}

function areEqual(prevProps: ReportOptionListProps, nextProps: ReportOptionListProps) {
    return prevProps.options === nextProps.options && prevProps.isLoading === nextProps.isLoading;
}

const ReportOptionList = memo(ReportOptionListComponent, areEqual);

ReportOptionList.displayName = 'ReportOptionList';

export default ReportOptionList;