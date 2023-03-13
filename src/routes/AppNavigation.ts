import { createStackNavigator } from 'react-navigation-stack';
import { Dashboard } from '../screens';

const AppNavigation = createStackNavigator(
  {
    Dashboard: { screen: Dashboard },
  },
  {
    initialRouteName: 'Dashboard',
  }
);

export default AppNavigation;
