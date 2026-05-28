import React, {createContext, useMemo} from 'react';
import {useOnyx} from 'react-native-onyx';
import ONYXKEYS from '@src/ONYXKEYS';

type WalletContextType = {
    walletBalance: number | undefined;
};

const defaultWalletContext: WalletContextType = {
    walletBalance: undefined,
};

export const WalletContext = createContext<WalletContextType>(defaultWalletContext);

type WalletProviderProps = {
    children: React.ReactNode;
};

function WalletProvider({children}: WalletProviderProps) {
    const [userWallet] = useOnyx(ONYXKEYS.USER_WALLET);

    const value = useMemo(() => ({
        walletBalance: userWallet?.availableBalance,
    }), [userWallet?.availableBalance]);

    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    );
}

export default WalletProvider;