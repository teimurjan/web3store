import React from 'react';

import { ButtonLoadingIndicator } from '../../components/atoms';

const buttonLoadingStateProps = {
  accessoryRight: React.createElement(ButtonLoadingIndicator, {}),
  appearance: 'outline',
} as const;

export default buttonLoadingStateProps;
