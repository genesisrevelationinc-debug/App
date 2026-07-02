import React, {useEffect, useRef} from 'react';
import {Animated, Easing, View} from 'react-native';
import useAnimatedStyle from '@hooks/useAnimatedStyle';
import useThemeStyles from '@hooks/useThemeStyles';
    const styles = useThemeStyles();
    const {isSmallScreenWidth} = useWindowDimensions();
    const {isOpen} = useRightHandPanel();
    const isAnimating = useRef(false);

    const {animation, isAnimating: isAnimationRunning} = useAnimatedStyle(isOpen, {
        duration: CONST.ANIMATED_RHP_TRANSITION_DURATION,
        easing: Easing.inOut(Easing.ease),
    });

    // Prevent rapid open/close transitions from causing visual misalignment
    useEffect(() => {
        if (isAnimationRunning) {
            isAnimating.current = true;
        } else {
            // Small delay to ensure animation state is fully settled
            const timeout = setTimeout(() => {
                isAnimating.current = false;
            }, 50);
            return () => clearTimeout(timeout);
        }
    }, [isAnimationRunning]);

    const isTransitioning = isAnimating.current || isAnimationRunning;

    return (
        <View
            style={[
                    ? styles.rhpContainer
                    : styles.rhpContainerLargeScreen,
                {
                    opacity: isTransitioning ? animation : 1,
                    transform: [
                        {
                            translateX: animation.interpolate({