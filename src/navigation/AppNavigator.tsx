import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../features/home/screens/HomeScreen';
import OnboardingScreen from '../features/onboarding/OnboardingScreen';
import LoginScreen from '../features/login/PhoneSignIn';
import {MMKVLoader, useMMKVStorage} from 'react-native-mmkv-storage';
import {getAuth} from '@react-native-firebase/auth';

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
