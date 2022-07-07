import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

import ABI from '../../../ABI.json';
import { useWalletConnectAccount } from '../../hooks';
import noop from '../../utils/noop';
import { useWeb3 } from '../web3';
import { initialState, reducer, Token, TokenState } from './state';

type GetTokenReturnValue = Partial<Token> & { state: TokenState };

interface TokenContextValue {
  fetchToken: (tokenContractAddress: string) => Promise<void>;
  getToken: (tokenContractAddress: string) => GetTokenReturnValue;
}

const INITIAL_TOKEN_STATE = { isLoading: false };

const TokenContext = createContext<TokenContextValue>({
  fetchToken: noop.async,
  getToken: noop.returns({ state: INITIAL_TOKEN_STATE }),
});

const TokenContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const account = useWalletConnectAccount();
  const web3 = useWeb3();

  useEffect(() => {
    dispatch({ type: 'RESET' });
  }, [account]);

  const getToken = useCallback(
    (tokenContractAddress: string) => {
      return {
        ...(state.tokens[tokenContractAddress] ?? {}),
        state: state.tokenStates[tokenContractAddress] ?? INITIAL_TOKEN_STATE,
      };
    },
    [state],
  );

  const fetchToken = useCallback(
    async (tokenContractAddress: string) => {
      if (!account) {
        return;
      }

      dispatch({
        type: 'SET_TOKEN_STATE',
        payload: { address: tokenContractAddress, isLoading: true },
      });

      try {
        const contract = new web3.eth.Contract(
          ABI as any,
          tokenContractAddress,
        );
        const [balanceInWei, symbol, name] = await Promise.all([
          contract.methods.balanceOf(account).call(),
          contract.methods.symbol().call(),
          contract.methods.name().call(),
        ]);

        const balance = web3.utils.fromWei(balanceInWei);

        dispatch({
          type: 'SET_TOKEN',
          payload: {
            address: tokenContractAddress,
            balance,
            symbol,
            name,
          },
        });
        dispatch({
          type: 'SET_TOKEN_STATE',
          payload: {
            address: tokenContractAddress,
            isLoading: false,
          },
        });
      } catch (e) {
        dispatch({
          type: 'SET_TOKEN_STATE',
          payload: {
            address: tokenContractAddress,
            isLoading: false,
            error: (e as Error).toString(),
          },
        });
      }
    },
    [account, web3],
  );

  const value = useMemo(
    () => ({ getToken, fetchToken }),
    [getToken, fetchToken],
  );

  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
};

const useToken = (tokenContractAddress: string) => {
  const { getToken, fetchToken } = useContext(TokenContext);

  const token = getToken(tokenContractAddress);

  useEffect(() => {
    if (!token.balance && !token.state.isLoading) {
      fetchToken(tokenContractAddress);
    }
  }, [token, tokenContractAddress, fetchToken]);

  return token;
};

const useFetchToken = () => {
  const { fetchToken } = useContext(TokenContext);
  return fetchToken;
};

export { TokenContextProvider, useToken, useFetchToken };
