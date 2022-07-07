import { useMemo } from 'react';

import { useWalletConnect } from '@walletconnect/react-native-dapp';

const useWalletConnectAccount = () => {
  const { session } = useWalletConnect();

  return useMemo(
    () =>
      session && session.accounts && session.accounts.length > 0
        ? session.accounts[0]
        : undefined,
    [session],
  );
};

export default useWalletConnectAccount;
