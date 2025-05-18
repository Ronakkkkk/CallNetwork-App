import {
  type GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';

export function OnboardingButton({
  text,
  onPress,
}: {
  text: string;
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
}) {
  const styles = StyleSheet.create({
    pressable: {
      backgroundColor: 'black',
      alignSelf: 'flex-start',
      borderRadius: 6,
    },
    text: {
      backgroundColor: 'red',
      alignContent: 'center',
      justifyContent: 'center',
    },
  });
  return (
    <Pressable style={styles.pressable} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}
