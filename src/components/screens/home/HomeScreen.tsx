import React from 'react';
import { StyleSheet } from 'react-native';

import { Layout } from '@ui-kitten/components';

import { ConnectWallet, ProductList } from '../../organisms';
import { useWalletConnect } from '@walletconnect/react-native-dapp';

const HomeScreen = () => {
  const { connected } = useWalletConnect();

  return (
    <Layout style={styles.container}>
      <Layout style={styles.contentContainer}>
        {connected ? <ProductList /> : <ConnectWallet />}
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
