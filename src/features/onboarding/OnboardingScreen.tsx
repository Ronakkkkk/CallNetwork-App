import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import PagerView from 'react-native-pager-view';

export default function OnboardingScreen({
  completeOnboarding,
}: {
  completeOnboarding: () => void;
}) {
  return (
    <PagerView initialPage={0} style={styles.pagerView}>
      <View key="1">
        <Text>First page</Text>
      </View>
      <View key="2">
        <Text>Second page</Text>
      </View>
      <View key="3">
        <Text>Third page</Text>
        <Button title="Complete onboarding" onPress={completeOnboarding} />
      </View>
    </PagerView>
  );
}

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
});
