import { createStackNavigator } from 'react-navigation-stack';
import { LoginScreen, RegisterScreen, ForgotPasswordScreen } from '../screens';

const AuthNavigation = createStackNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    RegisterScreen: { screen: RegisterScreen },
    ForgotPasswordScreen: { screen: ForgotPasswordScreen },
  },
  {
    initialRouteName: 'LoginScreen',
    headerMode: 'none',
  }
);

export default AuthNavigation;
