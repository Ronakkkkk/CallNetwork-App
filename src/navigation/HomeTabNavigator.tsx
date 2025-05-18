import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeTab from '../features/main/tabs/HomeTab';
import DashboardTab from '../features/main/tabs/DashboardTab';
import ContactsTab from '../features/main/tabs/ContactsTab';
import ProfileTab from '../features/main/tabs/ProfileTab';
import EditProfile from '../features/main/tabs/EditProfile';
import Rewards from '../features/main/tabs/Rewards';

import {axios} from '../api/index';
import {useEffect, useState} from 'react';
import {useUserDispatchContext} from '../context/UserContext';
import {Text, View} from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Create a separate stack for Profile to include EditProfile
function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProfileMain" component={ProfileTab} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
}

export function HomeTabNavigator() {
  // abiskar change true to false
  const [isLoading, setLoading] = useState(false);
  const setUser = useUserDispatchContext();

  useEffect(() => {
    (async () => {
      try {
        const {data} = await axios.get('user/profile');
        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  });

  return isLoading ? (
    <View>
      <Text>Loading</Text>
    </View>
  ) : (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        component={HomeTab}
        options={{headerShown: false}}
      />
      <Tab.Screen name="DashboardTab" component={DashboardTab} />
      <Tab.Screen name="ContactsTab" component={ContactsTab} />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack} // Use the stack instead of just the component
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Rewards"
        component={Rewards}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}
