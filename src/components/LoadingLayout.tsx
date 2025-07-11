import type React from 'react';
import {Text, View} from 'react-native';

export default function LoadingLayout({
  loading,
  children,
}: {
  loading: boolean;
  children: React.ReactNode;
}) {
  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
  return children;
}
