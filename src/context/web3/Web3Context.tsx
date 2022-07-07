import { INFURA_URL } from '@env';
import React, { createContext, PropsWithChildren, useContext } from 'react';
import Web3 from 'web3';

const web3 = new Web3(new Web3.providers.HttpProvider(INFURA_URL));

const Web3Context = createContext(web3);

const Web3ContextProvider = ({ children }: PropsWithChildren) => (
  <Web3Context.Provider value={web3}>{children}</Web3Context.Provider>
);

const useWeb3 = () => useContext(Web3Context);

export { Web3ContextProvider, useWeb3 };
