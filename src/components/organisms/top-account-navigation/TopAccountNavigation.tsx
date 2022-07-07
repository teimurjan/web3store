import React from 'react';

import { Layout, TopNavigation } from '@ui-kitten/components';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useWalletConnectAccount } from '../../../hooks';
import shortenAddress from '../../../utils/shorten-address';
import { useLeftAccessory, useRightAccessory } from './hooks';

const ACCOUNT_TITLE = 'Account';
const ANONYMOUS_ACCOUNT_TITLE = 'Anonymous';

const TopAccountNavigation = ({}: NativeStackHeaderProps) => {
  const account = useWalletConnectAccount();
  const rightAccessory = useRightAccessory();
  const leftAccessory = useLeftAccessory();
  const insets = useSafeAreaInsets();

  return (
    <Layout style={{ paddingTop: insets.top }}>
      <TopNavigation
        alignment="center"
        title={account ? ACCOUNT_TITLE : ANONYMOUS_ACCOUNT_TITLE}
        subtitle={account ? shortenAddress(account) : ''}
        accessoryRight={rightAccessory}
        accessoryLeft={leftAccessory}
      />
    </Layout>
  );
};

export default TopAccountNavigation;
