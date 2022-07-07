import React from 'react';
import { useColorScheme } from 'react-native';

import WalletConnectProvider from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen, SuccessfulPurchaseScreen } from './src/components/screens';
import { Web3ContextProvider } from './src/context/web3';
import { TokenContextProvider } from './src/context/token';
import { ProductsContextProvider } from './src/context/products';
import { TransactionContextProvider } from './src/context/transaction';
import { TopAccountNavigation } from './src/components/organisms';
import { StackParamList } from './src/types';

const Stack = createNativeStackNavigator<StackParamList>();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={isDarkMode ? eva.dark : eva.light}>
        <WalletConnectProvider
          storageOptions={{
            // TODO: Fix any typing
            asyncStorage: AsyncStorage as any,
          }}>
          <Web3ContextProvider>
            <TokenContextProvider>
              <TransactionContextProvider>
                <ProductsContextProvider>
                  <NavigationContainer>
                    <Stack.Navigator
                      initialRouteName="Home"
                      screenOptions={{ header: TopAccountNavigation }}>
                      <Stack.Screen name="Home" component={HomeScreen} />
                      <Stack.Screen
                        name="SuccessfulPurchase"
                        component={SuccessfulPurchaseScreen}
                      />
                    </Stack.Navigator>
                  </NavigationContainer>
                </ProductsContextProvider>
              </TransactionContextProvider>
            </TokenContextProvider>
          </Web3ContextProvider>
        </WalletConnectProvider>
      </ApplicationProvider>
    </>
  );
};

export default App;
