import React from 'react';
import { StyleSheet } from 'react-native';

import { Layout, Text } from '@ui-kitten/components';
import { useRoute } from '@react-navigation/native';

import { Route } from '../../../types';
import shortenAddress from '../../../utils/shorten-address';
import { SuccessIcon } from '../../atoms';

const SuccessfulPurchaseScreen = () => {
  const { params } = useRoute<Route>();

  const message = params
    ? `Purchase ${shortenAddress(params.txHash)} is successful.`
    : 'Purchase is successful.';

  return (
    <Layout style={styles.container}>
      <SuccessIcon style={styles.icon} />
      <Text category="h6">{message}</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default SuccessfulPurchaseScreen;
