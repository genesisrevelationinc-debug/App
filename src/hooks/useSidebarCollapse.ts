import {useCallback, useEffect, useRef, useState} from 'react';
import {useOnyx} from 'react-native-onyx';
import ONYXKEYS from '@src/ONYXKEYS';

type SidebarCollapseState = {
    isCollapsed: boolean;
    isPeeking: boolean;
    toggleCollapse: () => void;
    setIsPeeking: (isPeeking: boolean) => void;
    expand: () => void;
    collapse: () => void;
};

/**
 * Hook to manage the collapsable sidebar state for the Spend screen.
 * Persists collapse state across sessions.
 */
function useSidebarCollapse(): SidebarCollapseState {
    const [isCollapsed, setIsCollapsed] = useOnyx(ONYXKEYS.NVP_SIDEBAR_IS_COLLAPSED, {
        initWithStoredValue: true,
    });
    const [isPeeking, setIsPeekingState] = useState(false);
    const peekTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const toggleCollapse = useCallback(() => {
        setIsCollapsed(!isCollapsed);
    }, [isCollapsed, setIsCollapsed]);

    const expand = useCallback(() => {
        setIsCollapsed(false);
    }, [setIsCollapsed]);

    const collapse = useCallback(() => {
        setIsCollapsed(true);
    }, [setIsCollapsed]);

    const setIsPeeking = useCallback((peeking: boolean) => {
        if (peekTimeoutRef.current) {
            clearTimeout(peekTimeoutRef.current);
        }
        if (peeking) {
            setIsPeekingState(true);
        } else {
            // Small delay before hiding to prevent flickering
            peekTimeoutRef.current = setTimeout(() => {
                setIsPeekingState(false);
            }, 150);
        }
    }, []);

    useEffect(() => {
        return () => {
            if (peekTimeoutRef.current) {
                clearTimeout(peekTimeoutRef.current);
            }
        };
    }, []);

    return {
        isCollapsed: !!isCollapsed,
        isPeeking,
        toggleCollapse,
        setIsPeeking,
        expand,
        collapse,
    };
}

export default useSidebarCollapse;