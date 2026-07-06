import {Str} from 'expensify-common';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View} from 'react-native';
import {useOnyx} from 'react-native-onyx';
import type {ValueOf} from 'type-fest';
    const [isHovered, setIsHovered] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [ownerPersonalDetails, setOwnerPersonalDetails] = useState<PersonalDetails | null>(null);
    const ownerAccountID = useRef<number | null>(null);
    const isFetchingDetails = useRef(false);

    const [allPolicies] = useOnyx(ONYXKEYS.COLLECTION.POLICY);
    const [allPersonalDetails] = useOnyx(ONYXKEYS.PERSONAL_DETAILS_LIST);
        return getPolicyEmployeeList(policy).length;
    }, [policy]);

    const fetchOwnerDetails = useCallback(() => {
        if (!policy?.ownerAccountID || ownerPersonalDetails || isFetchingDetails.current) {
            return;
        }

        if (ownerAccountID.current === policy.ownerAccountID) {
            return;
        }

        isFetchingDetails.current = true;
        ownerAccountID.current = policy.ownerAccountID;

        // Try to get from existing personal details first
        const existingDetails = allPersonalDetails?.[policy.ownerAccountID];
        if (existingDetails) {
            setOwnerPersonalDetails(existingDetails);
            isFetchingDetails.current = false;
            return;
        }

        // Otherwise fetch from API
        PersonalDetails.openPublicProfileView(policy.ownerAccountID)
            .then((details) => {
                if (details) {
                    setOwnerPersonalDetails(details);
                }
            })
            .catch(() => {
                // Silently fail if we can't fetch owner details
            })
            .finally(() => {
                isFetchingDetails.current = false;
            });
    }, [policy?.ownerAccountID, allPersonalDetails, ownerPersonalDetails]);

    const getThreeDotsMenuItems = useCallback(() => {
        if (!shouldUseFullTitle) {
            return [];
        return null;
    }, [isJoinRequestPending, shouldShowEmployeeCount, employeeCount, translate]);

    useEffect(() => {
        if (isJoinRequestPending && policy?.ownerAccountID) {
            fetchOwnerDetails();
        }
    }, [isJoinRequestPending, policy?.ownerAccountID, fetchOwnerDetails]);

    const titleComponent = useMemo(() => {
        if (!shouldUseFullTitle) {
            return (
        );
    }, [shouldUseFullTitle, title, isSelected, isHovered, isDisabled, isJoinRequestPending, shouldShowEmployeeCount, employeeCount, translate, styles, theme]);

    const getOwnerDetails = useCallback(() => {
        if (!isJoinRequestPending || !policy?.ownerAccountID) {
            return null;
        }
            return null;
        }

        const ownerPersonalDetailsToUse = ownerPersonalDetails ?? allPersonalDetails?.[policy.ownerAccountID];
        const ownerDisplayName = ownerPersonalDetails?.displayName ?? ownerPersonalDetails?.login ?? Str.removeSMSDomain(email);

        return (
                </Text>
            </View>
        );
    }, [isJoinRequestPending, policy?.ownerAccountID, ownerPersonalDetails, allPersonalDetails, email, styles, theme]);

    const rightNode = useMemo(() => {
        if (!shouldUseFullTitle) {
                        <View style={[styles.flexRow, styles.alignItemsCenter, styles.gap1]}>
                            {titleComponent}
                            {badge}
                            {getOwnerDetails()}
                        </View>
                        {subtitle}
                    </View>
        );
    }, [
        badge,
        getOwnerDetails,
        subtitle,
        styles.alignItemsCenter,
        styles.flexRow,