import { useEffect } from 'react';
import { Alert } from 'react-native';

const useErrorAlert = (error: string | undefined, title: string) => {
  useEffect(() => {
    if (error) {
      Alert.alert(title, error);
    }
  }, [error, title]);
};

export default useErrorAlert;
