import {getAuth} from '@react-native-firebase/auth';
import React from 'react';
import {View, Text, Button} from 'react-native';
import {useUserContext} from '../../../context/UserContext';

export default function HomeTab() {
  const user = useUserContext();
  return (
    <View>
      <Text>Welcome to CallNetwork 👋</Text>
      <Text>{user?.firstName ?? 'No User :('}</Text>
      <Button
        onPress={() => {
          getAuth().signOut();
        }}
        title="Sign Out"
      />
    </View>
  );
}
