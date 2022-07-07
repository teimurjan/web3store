import React from 'react';

import { Spinner } from '@ui-kitten/components';

import { useProducts } from '../../../context/products';
import ProductCard from '../product-card';
import { useErrorAlert } from '../../../hooks';

const FETCH_PRODUCTS_ERROR_TITLE = "Couldn't load products";

const ProductList = () => {
  const { products, isLoading, error } = useProducts();

  useErrorAlert(error, FETCH_PRODUCTS_ERROR_TITLE);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {products.map(product => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </>
  );
};

export default ProductList;
