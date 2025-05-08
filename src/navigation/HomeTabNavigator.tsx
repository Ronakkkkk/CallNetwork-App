import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeTab from '../features/main/tabs/HomeTab';
import DashboardTab from '../features/main/tabs/DashboardTab';
import ContactsTab from '../features/main/tabs/ContactsTab';
import ProfileTab from '../features/main/tabs/ProfileTab';

const Tab = createBottomTabNavigator();

export function HomeTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeTab} />
      <Tab.Screen name="Dashboard" component={DashboardTab} />
      <Tab.Screen name="Contacts" component={ContactsTab} />
      <Tab.Screen name="Profile" component={ProfileTab} />
    </Tab.Navigator>
  );
}
