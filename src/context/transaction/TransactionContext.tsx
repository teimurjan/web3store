import { useWalletConnect } from '@walletconnect/react-native-dapp';
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import ABI from '../../../ABI.json';
import { useWalletConnectAccount } from '../../hooks';
import noop from '../../utils/noop';
import { useFetchToken } from '../token';
import { useWeb3 } from '../web3';

interface TransactionContextValue {
  performTransaction: (
    tokenContractAddress: string,
    to: string,
    amount: number,
  ) => Promise<string>;
}

const TransactionContext = createContext<TransactionContextValue>({
  performTransaction: noop.asyncReturns(''),
});

const NO_ACCOUNT_ERROR_MESSAGE = 'Account is not active';

const TransactionContextProvider = ({ children }: PropsWithChildren) => {
  const intervalIdOfPendingTransaction = useRef<Record<string, NodeJS.Timer>>(
    {},
  );
  const account = useWalletConnectAccount();
  const { sendTransaction } = useWalletConnect();
  const web3 = useWeb3();
  const refetchToken = useFetchToken();

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      Object.values(intervalIdOfPendingTransaction.current).forEach(
        intervalId => {
          clearInterval(intervalId);
        },
      );
    };
  }, []);

  const getTransactionData = useCallback(
    async (tokenContractAddress: string, to: string, amount: number) => {
      const contract = new web3.eth.Contract(ABI as any, tokenContractAddress);
      const transferMethod = contract.methods.transfer(
        to,
        web3.utils.toWei(web3.utils.toBN(amount)),
      );
      const encodedABI = transferMethod.encodeABI();
      const estimatedGas = await web3.eth.estimateGas({
        from: account,
        to: tokenContractAddress,
        data: encodedABI,
      });

      return { encodedABI: transferMethod.encodeABI(), estimatedGas };
    },
    [web3, account],
  );

  const waitUntilTransactionComplete = useCallback(
    async (txHash: string) => {
      await new Promise(resolve => {
        intervalIdOfPendingTransaction.current[txHash] = setInterval(
          async () => {
            const receipt = await web3.eth.getTransactionReceipt(txHash);
            if (receipt) {
              resolve(receipt);
            }
          },
          5000,
        );
      });
      clearInterval(intervalIdOfPendingTransaction.current[txHash]);
    },
    [web3],
  );

  const performTransaction = useCallback(
    async (tokenContractAddress: string, to: string, amount: number) => {
      if (!account) {
        throw new Error(NO_ACCOUNT_ERROR_MESSAGE);
      }

      const { encodedABI, estimatedGas } = await getTransactionData(
        tokenContractAddress,
        to,
        amount,
      );

      const txHash = await sendTransaction({
        from: account,
        to: tokenContractAddress,
        data: encodedABI,
        gasPrice: estimatedGas,
      });

      await waitUntilTransactionComplete(txHash);
      await refetchToken(tokenContractAddress);

      return txHash;
    },
    [
      account,
      sendTransaction,
      getTransactionData,
      refetchToken,
      waitUntilTransactionComplete,
    ],
  );

  const value = useMemo(() => ({ performTransaction }), [performTransaction]);

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

const useTransaction = () => useContext(TransactionContext);

export { TransactionContextProvider, useTransaction };
