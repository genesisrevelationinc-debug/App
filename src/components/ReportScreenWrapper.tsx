import isLoadingReport from '@libs/isLoadingReport';
import {isMoneyRequestAction} from '@libs/ReportActionsUtils';
import {getReportID} from '@libs/Navigation/Navigation';
import {useFocusEffect} from '@react-navigation/native';

type ReportScreenNavigationProps = StackScreenProps<AuthScreensParamList, typeof SCREENS.REPORT>;

        }
    }, [reportIDFromRoute, reportID]);

    // Force re-evaluation of loading state when screen comes into focus
    // This fixes an iOS issue where the report gets stuck loading after deleting a split
    const [focusKey, setFocusKey] = useState(0);
    useFocusEffect(
        useCallback(() => {
            setFocusKey(prev => prev + 1);
        }, [])
    );

    const isLinkedMessageAvailable = useMemo(() => {
        if (!reportActionIDFromRoute || !reportActions) {
            return false;
        return <FullPageOfflineBlockingView>{getReportScreenContent()}</FullPageOfflineBlockingView>;
    }

    return <View key={focusKey} style={{flex: 1}}>{getReportScreenContent()}</View>;
};

ReportScreenWrapper.displayName = 'ReportScreenWrapper';