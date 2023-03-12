import { User } from 'firebase/auth';

export type TrackingProviderProps = {
  children: React.ReactNode;
};

export type AuthState = {
  userData: User | null;
  isProcessing: boolean;
  handleLogin: any;
  handleRegister: any;
  handleLogout: any;
  handleForgotPassword: any;
};
