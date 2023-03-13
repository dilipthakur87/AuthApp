import React, { memo } from 'react';
import { View, Text } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { Navigation } from '../types';
import { useAuthContext } from '../context/AuthContext';

type Props = {
  navigation: Navigation;
};

const Dashboard = ({ navigation }: Props) => {
  const { userData, handleLogout, isProcessing } = useAuthContext();

  const doLogout = async() => {
    try {
      await handleLogout()
      navigation.navigate('Auth')
    } catch (error) {
      
    }
  }

  return (
    <Background>
      <Logo />
      <Header>Congratulations, you are logged in.</Header>
      <Paragraph>
        This is just a sample app showing an authentication process using
        firebase.
      </Paragraph>
      <View style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 30
      }}>
        <Text>Name: {userData?.displayName || "N/A"}</Text>
        <Text>Email: {userData?.email || "N/A"}</Text>
        <Button
          mode="outlined"
          onPress={() => doLogout()}
          disabled={isProcessing}
          loading={isProcessing}
        >
          Logout
        </Button>
      </View>
    </Background>
  );
};

export default memo(Dashboard);
