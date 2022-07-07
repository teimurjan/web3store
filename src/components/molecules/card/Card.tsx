import React from 'react';
import { Image, StyleSheet } from 'react-native';

import {
  Card as UIKittenCard,
  CardProps as UIKittenCardProps,
  Text,
  useTheme,
} from '@ui-kitten/components';

interface Props {
  title: string;
  subtitle: string;
  image: string;
  footer?: UIKittenCardProps['footer'];
}

const Card = ({ title, subtitle, image, footer }: Props) => {
  const theme = useTheme();
  return (
    <UIKittenCard
      style={{ backgroundColor: theme['color-success-600'] }}
      header={<Text category="h4">{title}</Text>}
      footer={footer}>
      <Image style={styles.image} source={{ uri: image }} />
      <Text category="h6">{subtitle}</Text>
    </UIKittenCard>
  );
};

const styles = StyleSheet.create({
  image: {
    marginBottom: 16,
    height: 200,
  },
});

export default Card;
