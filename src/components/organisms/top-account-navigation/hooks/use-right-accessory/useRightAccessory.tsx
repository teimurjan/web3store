import React from 'react';

import { Spinner } from '@ui-kitten/components';
import { TOKEN_CONTRACT_ADDRESS } from '@env';

import { Balance } from '../../../../atoms';
import { useToken } from '../../../../../context/token';
import { useWalletConnect } from '@walletconnect/react-native-dapp';

const useRightAccessory = () => {
  const { session } = useWalletConnect();
  const token = useToken(TOKEN_CONTRACT_ADDRESS);

  if (!session?.connected) {
    return undefined;
  }

  const shouldShowSpinner = token.state.isLoading || token.state.error;
  if (shouldShowSpinner) {
    return <Spinner />;
  }

  const identifier = token.symbol;
  const amount = token.balance;

  return amount && identifier ? (
    <Balance amount={amount} identifier={identifier} />
  ) : undefined;
};

export default useRightAccessory;
