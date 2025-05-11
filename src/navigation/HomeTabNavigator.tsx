import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeTab from '../features/main/tabs/HomeTab';
import DashboardTab from '../features/main/tabs/DashboardTab';
import ContactsTab from '../features/main/tabs/ContactsTab';
import ProfileTab from '../features/main/tabs/ProfileTab';

import {axios} from '../api/index';
import {useEffect, useState} from 'react';
import {useUserDispatchContext} from '../context/UserContext';
import {Text, View} from 'react-native';

const Tab = createBottomTabNavigator();

export function HomeTabNavigator() {
  const [isLoading, setLoading] = useState(true);
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
      <Tab.Screen name="HomeTab" component={HomeTab} />
      <Tab.Screen name="DashboardTab" component={DashboardTab} />
      <Tab.Screen name="ContactsTab" component={ContactsTab} />
      <Tab.Screen name="ProfileTab" component={ProfileTab} />
    </Tab.Navigator>
  );
}
