import {useCallback, useRef} from 'react';

type UseScrollPositionReturn = {
    scrollPosition: number;
    setScrollPosition: (position: number) => void;
};

const scrollPositions = new Map<string, number>();

function useScrollPosition(key: string): UseScrollPositionReturn {
    const positionRef = useRef(scrollPositions.get(key) ?? 0);

    const setScrollPosition = useCallback(
        (position: number) => {
            positionRef.current = position;
            scrollPositions.set(key, position);
        },
        [key],
    );

    return {
        scrollPosition: positionRef.current,
        setScrollPosition,
    };
}

export default useScrollPosition;
export {scrollPositions};