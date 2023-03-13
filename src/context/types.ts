import { User } from 'firebase/auth';

export type TrackingProviderProps = {
  children: React.ReactNode;
};

export type callBackFunction = () => void;

export type doLogin = (email: string, password: string) => Promise<void>;

export type doRegister = (
  name: string,
  email: string,
  username: string,
  password: string
) => Promise<void>;

export type doResetPassword = (
  email: string,
  callback: callBackFunction
) => Promise<void>;

export type doLogout = () => Promise<void>;

export type AuthState = {
  userData: User | null;
  isProcessing: boolean;
  handleLogin: doLogin;
  handleRegister: doRegister;
  handleLogout: doLogout;
  handleForgotPassword: doResetPassword;
};
