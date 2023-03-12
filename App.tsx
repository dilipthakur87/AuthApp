import React from 'react';
import { Provider } from 'react-native-paper';
import App from './src';
import { AuthProvider } from './src/context/AuthContext';
import { theme } from './src/core/theme';

const Main = () => (
  <AuthProvider>
    <Provider theme={theme}>
      <App />
    </Provider>
  </AuthProvider>
);

export default Main;
