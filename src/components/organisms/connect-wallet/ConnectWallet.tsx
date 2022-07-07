import React, { useCallback } from 'react';

import { Button } from '@ui-kitten/components';
import { useWalletConnect } from '@walletconnect/react-native-dapp';

import buttonLoadingStateProps from '../../../utils/button-loading-state-props';

const ConnectWallet = () => {
  const { pending, connect } = useWalletConnect();

  const handleConnectButtonPress = useCallback(() => {
    connect();
  }, [connect]);

  return (
    <Button
      onPress={handleConnectButtonPress}
      {...(pending ? buttonLoadingStateProps : {})}>
      Connect to MetaMask
    </Button>
  );
};

export default ConnectWallet;
