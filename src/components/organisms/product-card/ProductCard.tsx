import React, { useCallback, useState } from 'react';
import { View } from 'react-native';

import { Button } from '@ui-kitten/components';
import { STORE_OWNER_ADDRESS, TOKEN_CONTRACT_ADDRESS } from '@env';
import { useNavigation } from '@react-navigation/native';

import { Product } from '../../../context/products';
import { Card } from '../../molecules';
import { useTransaction } from '../../../context/transaction';
import { useToken } from '../../../context/token';
import buttonLoadingStateProps from '../../../utils/button-loading-state-props';
import { useErrorAlert } from '../../../hooks';
import { Navigation } from '../../../types';

interface Props {
  product: Product;
}

const BUY_PRODUCT_ERROR_TITLE = "Couldn't buy the product";

const ProductCard = ({ product }: Props) => {
  const token = useToken(TOKEN_CONTRACT_ADDRESS);
  const { performTransaction } = useTransaction();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const { navigate } = useNavigation<Navigation>();

  const handleBuyPress = useCallback(async () => {
    setIsLoading(true);
    try {
      const txHash = await performTransaction(
        TOKEN_CONTRACT_ADDRESS,
        STORE_OWNER_ADDRESS,
        Number(product.price),
      );
      navigate('SuccessfulPurchase', { txHash });
    } catch (e) {
      setError((e as Error).toString());
    }
    setIsLoading(false);
  }, [performTransaction, product, navigate]);

  useErrorAlert(error, BUY_PRODUCT_ERROR_TITLE);

  return (
    <Card
      key={product.id}
      title={product.name}
      subtitle={`Price: ${product.price} ${token?.symbol}`}
      image={product.image}
      footer={
        <View>
          <Button
            onPress={isLoading ? undefined : handleBuyPress}
            status="basic"
            {...(isLoading ? buttonLoadingStateProps : {})}>
            BUY
          </Button>
        </View>
      }
    />
  );
};

export default ProductCard;
