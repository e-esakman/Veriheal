import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import SplashScreen from '../screens/SplashScreen';
import SelectTypeScreen from '../screens/SelectTypeScreen';
import LoginScreen from '../screens/LoginScreen';
import ConnectWalletScreen from '../screens/ConnectWalletScreen';
import UploadIDScreen from '../screens/UploadIDScreen';
import zkTLSVerificationScreen from '../screens/zkTLSVerificationScreen';
import DashboardScreen from '../screens/DashboardScreen';
import DoctorViewScreen from '../screens/DoctorViewScreen';
import BadgeGalleryScreen from '../screens/BadgeGalleryScreen';

const Stack = createNativeStackNavigator();



export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="SelectType" component={SelectTypeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ConnectWallet" component={ConnectWalletScreen} />
      <Stack.Screen name="UploadID" component={UploadIDScreen} />
      <Stack.Screen name="zkTLSVerification" component={zkTLSVerificationScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="DoctorView" component={DoctorViewScreen} />
      <Stack.Screen name="BadgeGallery" component={BadgeGalleryScreen} />

    </Stack.Navigator>
  );
}
