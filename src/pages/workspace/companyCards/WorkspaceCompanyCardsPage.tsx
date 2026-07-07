import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useMemo, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useOnyx} from 'react-native-onyx';
import type {ValueOf} from 'type-fest';
import useCurrentUserPersonalDetails from '@hooks/useCurrentUserPersonalDetails';
import {useMemoizedLazyIllustrations} from '@hooks/useLazyAsset';
import useLocalize from '@hooks/useLocalize';
import useNetwork from '@hooks/useNetwork';
import usePolicy from '@hooks/usePolicy';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import useWorkspaceDocumentTitle from '@hooks/useWorkspaceDocumentTitle';

import {getDomainOrWorkspaceAccountID} from '@libs/CardUtils';
import useNetwork from '@hooks/useNetwork';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import {getWorkspaceAccountID} from '@libs/CardUtils';
import {convertToDisplayStringWithoutCurrency} from '@libs/CurrencyUtils';
import {getLatestErrorMessage} from '@libs/ErrorUtils';
import Navigation from '@libs/Navigation/Navigation';

import {openPolicyCompanyCardsFeed, openPolicyCompanyCardsPage} from '@userActions/CompanyCards';

    getWorkspaceAccountID,
    getWorkspaceInstance,
    isPolicyAdmin,
    getPolicy,
} from '@libs/PolicyUtils';
import type {PlatformStackScreenProps} from '@navigation/PlatformStackNavigation/types';
import type {SettingsNavigatorParamList} from '@navigation/types';
type WorkspaceCompanyCardsPageProps = PlatformStackScreenProps<WorkspaceSplitNavigatorParamList, typeof SCREENS.WORKSPACE.COMPANY_CARDS>;

function WorkspaceCompanyCardsPage({route}: WorkspaceCompanyCardsPageProps) {
    const policyID = route.params.policyID;
    const {translate} = useLocalize();
    const {login: currentUserLogin = ''} = useCurrentUserPersonalDetails();
    const memoizedIllustrations = useMemoizedLazyIllustrations(['CompanyCard']);
    const {shouldUseNarrowLayout} = useResponsiveLayout();

    const policy = usePolicy(policyID);
    useWorkspaceDocumentTitle(policy?.name, 'workspace.common.companyCards');
    const workspaceAccountID = policy?.policyAccountID ?? CONST.DEFAULT_NUMBER_ID;

    const companyCards = useCompanyCards({policyID});
    const {
        allCardFeeds,
        feedName,
        selectedFeed,
        bankName,
        isFeedPending,
        isFeedAdded,
        onyxMetadata: {cardListMetadata},
    } = companyCards;

    const domainOrWorkspaceAccountID = getDomainOrWorkspaceAccountID(workspaceAccountID, selectedFeed);

    // Use a ref so that changes to the employee list (e.g. after inviting a member) don't
    // recreate the callback and trigger an unnecessary re-fetch that flashes a skeleton loader.
    const employeeListRef = useRef(policy?.employeeList);
    useEffect(() => {
        employeeListRef.current = policy?.employeeList;
    }, [policy?.employeeList]);

    const loadPolicyCompanyCardsPage = useCallback(() => {
        const emailList = Object.keys(getMemberAccountIDsForWorkspace(employeeListRef.current));
        openPolicyCompanyCardsPage(policyID, domainOrWorkspaceAccountID, emailList, translate);
    }, [domainOrWorkspaceAccountID, policyID, translate]);

    const {isOffline} = useNetwork({
        onReconnect: loadPolicyCompanyCardsPage,
    });

    const isLoading = !isOffline && (!allCardFeeds || (isFeedAdded && isLoadingOnyxValue(cardListMetadata)));

    const hasFeedsLoaded = !!allCardFeeds && Object.keys(allCardFeeds).length > 0;

    useEffect(() => {
        if (isOffline || hasFeedsLoaded) {
    const [lastSelectedFeed] = useOnyx(`${ONYXKEYS.COLLECTION.LAST_SELECTED_FEED}${policyID}`);
    const workspaceAccountID = getWorkspaceAccountID(policyID);

    // Get the parent workspace ID for card feed reauthorization
    const parentWorkspaceID = useMemo(() => {
        const policy = getPolicy(policyID);
        if (policy?.parentWorkspaceID) {
            return policy.parentWorkspaceID;
        }
        return policyID;
    }, [policyID]);

    const [cardFeeds] = useOnyx(`${ONYXKEYS.COLLECTION.SHARED_NVP_PRIVATE_DOMAIN_MEMBER}${workspaceAccountID}`);
    const selectedFeed = getSelectedFeed(lastSelectedFeed, cardFeeds);
    const shouldShowLoadingState = !isOffline && (!cardFeeds || cardFeeds.isLoading);
    const loadPolicyCompanyCardsFeed = useCallback(() => {
        if (isLoading || !bankName || isFeedPending || isOffline) {
            return;
        }

        openPolicyCompanyCardsFeed(domainOrWorkspaceAccountID, policyID, bankName, translate);
    }, [bankName, domainOrWorkspaceAccountID, isFeedPending, isLoading, policyID, translate, isOffline]);

    useEffect(() => {
        loadPolicyCompanyCardsFeed();
    }, [loadPolicyCompanyCardsFeed]);

    const [shouldShowOfflineModal, setShouldShowOfflineModal] = useState(false);
    const {assignCard, isAssigningCardDisabled} = useAssignCard({feedName, policyID, setShouldShowOfflineModal});
    const canWriteCompanyCards = canMemberWrite(policy, currentUserLogin, CONST.POLICY.POLICY_FEATURE.COMPANY_CARDS);

    return (
        <AccessOrNotFoundWrapper
            policyID={route.params.policyID}
            featureName={CONST.POLICY.MORE_FEATURES.ARE_COMPANY_CARDS_ENABLED}
            policyFeature={CONST.POLICY.POLICY_FEATURE.COMPANY_CARDS}
        >
            <WorkspacePageWithSections
                icon={memoizedIllustrations.CompanyCard}
                headerText={translate('workspace.common.companyCards')}
                route={route}
                policyFeature={CONST.POLICY.POLICY_FEATURE.COMPANY_CARDS}
                shouldShowOfflineIndicatorInWideScreen
                showLoadingAsFirstRender={false}
                addBottomSafeAreaPadding
            >
                <WorkspaceCompanyCardsTable
                    policyID={policyID}
                    isPolicyLoaded={!!policy}
                    domainOrWorkspaceAccountID={domainOrWorkspaceAccountID}
                    companyCards={companyCards}
                    onAssignCard={assignCard}
                    isAssigningCardDisabled={isAssigningCardDisabled || !canWriteCompanyCards}
                    canWriteCompanyCards={canWriteCompanyCards}
                    onReloadPage={loadPolicyCompanyCardsPage}
                    onReloadFeed={loadPolicyCompanyCardsFeed}
                />
            </WorkspacePageWithSections>

            <DecisionModal
                title={translate('common.youAppearToBeOffline')}
                prompt={translate('common.offlinePrompt')}
                isSmallScreenWidth={shouldUseNarrowLayout}
                onSecondOptionSubmit={() => setShouldShowOfflineModal(false)}
                secondOptionText={translate('common.buttonConfirm')}
                isVisible={shouldShowOfflineModal}
                onClose={() => setShouldShowOfflineModal(false)}
            />
        </AccessOrNotFoundWrapper>
    );
}

export default WorkspaceCompanyCardsPage;
                        <Workspace cardList={cardList} />
                    ) : (
                        <WorkspaceCardListPage
                            policyID={parentWorkspaceID}
                            workspaceAccountID={workspaceAccountID}
                            selectedFeed={selectedFeed}
                            fetchCompanyCards={fetchCompanyCards}
