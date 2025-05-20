import {getAuth} from '@react-native-firebase/auth';
import React from 'react';
import {View, Text, Button} from 'react-native';

export default function DashboardTab() {
  return (
    <View>
      <Text>This is the dashboard</Text>
      <Button
        onPress={() => {
          getAuth().signOut();
        }}
        title="Sign Out"
      />
    </View>
  );
}
