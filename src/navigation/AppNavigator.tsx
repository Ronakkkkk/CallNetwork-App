import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreen from '../features/onboarding/OnboardingScreen';
import {MMKVLoader, useMMKVStorage} from 'react-native-mmkv-storage';
import {getAuth} from '@react-native-firebase/auth';
import {HomeTabNavigator} from './HomeTabNavigator';
import Login from '../features/login/Login';
import {UserContextProvider} from '../context/UserContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();
const storage = new MMKVLoader().initialize();

export default function RootStack() {
  // Initially set showOnboarding to true to show the onboarding screens
  const [showOnboarding, setShowOnboarding] = useMMKVStorage(
    'showOnboarding',
    storage,
    true, // Default to true to show onboarding on first app launch
  );

  // This function should set showOnboarding to false when onboarding is complete
  const completeOnboarding = () => {
    setShowOnboarding(false);
  };

  const [isLoggedIn, setLoggedIn] = useState(getAuth().currentUser !== null);

  useEffect(() => {
    // Firebase internal stuff
    const unsubscribe = getAuth().onAuthStateChanged(user => {
      setLoggedIn(user !== null);
    });
    return unsubscribe;
  }, []);
  const insets = useSafeAreaInsets();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      }}>
      {showOnboarding ? (
        // Onboarding Flow
        <Stack.Screen
          name="Onboarding"
          children={() => (
            <OnboardingScreen completeOnboarding={completeOnboarding} />
          )}
        />
      ) : (
        // Main App Flow - based on login status
        <>
          {isLoggedIn ? (
            <Stack.Screen
              name="HomeStack"
              options={{title: 'Main', headerShown: false}}
              children={() => (
                <UserContextProvider>
                  <HomeTabNavigator />
                </UserContextProvider>
              )}
            />
          ) : (
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
          )}
        </>
      )}
    </Stack.Navigator>
  );
}
