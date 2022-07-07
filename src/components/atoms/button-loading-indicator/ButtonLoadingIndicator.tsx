import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { Spinner } from '@ui-kitten/components';

const ButtonLoadingIndicator = ({ style, ...rest }: ViewProps) => (
  <View style={[style, styles.indicator]} {...rest}>
    <Spinner size="small" />
  </View>
);

const styles = StyleSheet.create({
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ButtonLoadingIndicator;
