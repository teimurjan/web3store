import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import waitFor from '../../utils/wait-for';

export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
}

const ProductsContext = createContext<{
  isLoading: boolean;
  products: Product[];
  error?: string;
}>({
  isLoading: false,
  error: undefined,
  products: [],
});

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: "Nike Air Force 1 '07",
    price: '99',
    image:
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/1eedde6f-0c5e-4088-86b5-bf283db4e3e5/air-force-1-07-herrenschuh-cHxKHR.png',
  },
];

const ProductsContextProvider = ({ children }: PropsWithChildren) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);

    try {
      // Simulate network request
      await waitFor(1000);
      setProducts(MOCK_PRODUCTS);
    } catch (e) {
      setError((e as Error).toString());
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const value = useMemo(
    () => ({ products, isLoading, error }),
    [products, isLoading, error],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

const useProducts = () => useContext(ProductsContext);

export { ProductsContextProvider, useProducts };
