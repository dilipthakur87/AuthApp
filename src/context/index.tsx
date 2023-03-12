import React from 'react';
import { AuthProvider } from './AuthContext';
import { TrackingProviderProps } from './types';

export const AppProvider = ({ children }: TrackingProviderProps) => {
  return <AuthProvider>{children}</AuthProvider>;
};
