import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreen from '../features/onboarding/OnboardingScreen';
import OnboardingScreen2 from '../features/onboarding/OnboardingScreen2';
import OnboardingScreen3 from '../features/onboarding/OnboardingScreen3';
import OnboardingScreen4 from '../features/onboarding/OnboardingScreen4';
import {MMKVLoader, useMMKVStorage} from 'react-native-mmkv-storage';
import {getAuth} from '@react-native-firebase/auth';
import {HomeTabNavigator} from './HomeTabNavigator';
import Login from '../features/login/Login';
import {UserContextProvider} from '../context/UserContext';

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

  return (
    <Stack.Navigator>
      {showOnboarding ? (
        // Onboarding Flow
        <>
          <Stack.Screen
            name="Onboarding"
            options={{headerShown: false}}
            children={() => (
              <OnboardingScreen completeOnboarding={completeOnboarding} />
            )}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="OnboardingScreen2"
            component={OnboardingScreen2}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="OnboardingScreen3"
            component={OnboardingScreen3}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="OnboardingScreen4"
            options={{headerShown: false}}
            children={() => (
              <OnboardingScreen4 completeOnboarding={completeOnboarding} />
            )}
          />
        </>
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
