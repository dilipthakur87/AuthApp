import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  UserCredential,
  User,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { AuthState, TrackingProviderProps } from './types';
import { firebaseAuth } from './firebase.config';

const AuthContext = createContext<AuthState | undefined>(undefined);

const AuthProvider = ({ children }: TrackingProviderProps) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  onAuthStateChanged(firebaseAuth, user => {
    if (user) {
      setUserData(user);
    }
  });

  const handleLogin = async (email: string, password: string) => {
    setIsProcessing(true);
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential: UserCredential) => {
        // const user = userCredential.user;
        // user logged in
        setIsProcessing(false)
      })
      .catch((error: any) => {
        setIsProcessing(false);
        setUserData(null);
        alert(error.message || 'Login error occured');
      });
  };

  const handleRegister = async (
    name: string,
    email: string,
    username: string,
    password: string
  ) => {
    console.log(' in context api of register');
    setIsProcessing(true);
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential: UserCredential) => {
        // updating the profile with other data
        setIsProcessing(false);
        updateProfile(firebaseAuth.currentUser, {
          displayName: name,
        })
          .then(() => {
            setUserData({...userData, displayName: name})
          })
      })
      .catch((error: any) => {
        setIsProcessing(false);
        setUserData(null);
        alert(error?.message || " Unable to register user. Please try again later.")
      });
  };

  const handleForgotPassword = async (email: string, callback: any) => {
    // resetpassword logic here
    sendPasswordResetEmail(firebaseAuth, email).then(() => {
      alert('Please check your email for instructions to reset your password.');
      callback()
    }).catch((error: any) => {
      alert(error?.message || "error sending reset instructions. Please try again later")
    })
  };

  const handleLogout = async () => {
    try {
      setIsProcessing(true)
      await firebaseAuth.signOut()
      setUserData(null)
      setIsProcessing(false)
    } catch (error) {
      setIsProcessing(false)
      alert(error?.message || "Unable to logout")
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        isProcessing,
        handleLogin,
        handleLogout,
        handleRegister,
        handleForgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuthContext };
