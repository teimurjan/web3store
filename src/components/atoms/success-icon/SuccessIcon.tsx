import React from 'react';

import { Icon, IconProps, useTheme } from '@ui-kitten/components';

const SuccessIcon = (props: IconProps) => {
  const theme = useTheme();

  return (
    <Icon
      {...props}
      fill={theme['color-success-600']}
      name="checkmark-circle-2-outline"
    />
  );
};

export default SuccessIcon;
