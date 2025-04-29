import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../features/home/screens/HomeScreen';
import OnboardingScreen from '../features/onboarding/OnboardingScreen';
import LoginScreen from '../features/login/LoginScreen';
import {MMKVLoader, useMMKVStorage} from 'react-native-mmkv-storage';

type AuthToken = null | {token: string; exp: string};

const Stack = createNativeStackNavigator();
const storage = new MMKVLoader().initialize();

export default function RootStack() {
  const [showOnboarding, setShowOnboarding] = useMMKVStorage(
    'showOnboarding',
    storage,
    true,
  );

  const [authToken, setAuthToken] = useMMKVStorage<AuthToken>(
    'authToken',
    storage,
    null,
  );

  const completeOnboarding = () => {
    setShowOnboarding(false);
  };

  const isAuthenticated = () => {
    // later check exp and other fields from jwt
    return authToken !== null;
  };

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
          {isAuthenticated() ? (
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{title: 'Home'}}
            />
          ) : (
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{title: 'Login'}}
            />
          )}
        </>
      )}
    </Stack.Navigator>
  );
}
