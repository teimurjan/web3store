import React, { useCallback } from 'react';
import { Alert } from 'react-native';

import { TopNavigationAction } from '@ui-kitten/components';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { useNavigation } from '@react-navigation/native';

import { BackIcon, LogOutIcon } from '../../../../atoms';

const KILL_SESSION_ERROR_TITLE = 'Logout failed';
const KILL_SESSION_ERROR_DESCRIPTION = 'Something went wrong';

const useLeftAccessory = () => {
  const { canGoBack, goBack } = useNavigation();

  const { session, killSession } = useWalletConnect();

  const handleLogOutPress = useCallback(async () => {
    try {
      await killSession();
    } catch (e) {
      Alert.alert(KILL_SESSION_ERROR_TITLE, KILL_SESSION_ERROR_DESCRIPTION);
    }
  }, [killSession]);

  if (canGoBack()) {
    return <TopNavigationAction icon={BackIcon} onPress={goBack} />;
  }

  return session?.connected ? (
    <TopNavigationAction icon={LogOutIcon} onPress={handleLogOutPress} />
  ) : undefined;
};

export default useLeftAccessory;
