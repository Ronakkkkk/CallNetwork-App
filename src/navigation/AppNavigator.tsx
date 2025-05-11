import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreen from '../features/onboarding/OnboardingScreen';
import {MMKVLoader, useMMKVStorage} from 'react-native-mmkv-storage';
import {getAuth} from '@react-native-firebase/auth';
import {HomeTabNavigator} from './HomeTabNavigator';
import Login from '../features/login/Login';
import {UserContextProvider} from '../context/UserContext';

const Stack = createNativeStackNavigator();
const storage = new MMKVLoader().initialize();

export default function RootStack() {
  const [showOnboarding, setShowOnboarding] = useMMKVStorage(
    'showOnboarding',
    storage,
    true,
  );

  const completeOnboarding = () => {
    setShowOnboarding(false);
  };

  const [isLoggedIn, setLoggedIn] = useState(getAuth().currentUser !== null);

  useEffect(() => {
    getAuth().onAuthStateChanged(user => {
      setLoggedIn(user !== null);
    });
  }, []);

  return (
    <Stack.Navigator>
      {showOnboarding ? (
        <Stack.Screen
          name="Onboarding"
          children={() => (
            <OnboardingScreen completeOnboarding={completeOnboarding} />
          )}
        />
      ) : (
        <>
          {isLoggedIn ? (
            <Stack.Screen
              name="HomeStack"
              options={{title: 'Main'}}
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
              options={{title: 'Login'}}
            />
          )}
        </>
      )}
    </Stack.Navigator>
  );
}
