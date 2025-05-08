import {getAuth} from '@react-native-firebase/auth';
import React from 'react';
import {View, Text, Button} from 'react-native';

export default function HomeTab() {
  return (
    <View>
      <Text>Welcome to CallNetwork 👋</Text>
      <Button
        onPress={() => {
          getAuth().signOut();
        }}
        title="Sign Out"
      />
    </View>
  );
}
