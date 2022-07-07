import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Text, useTheme } from '@ui-kitten/components';

interface Props {
  identifier: string;
  amount: number | string;
}

const Balance = ({ identifier, amount }: Props) => {
  const theme = useTheme();

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme['color-primary-600'],
      }}>
      <Text
        style={{
          ...styles.amount,
        }}>
        {amount}
      </Text>
      <Text>{identifier}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  amount: {
    marginRight: 4,
  },
});

export default Balance;
