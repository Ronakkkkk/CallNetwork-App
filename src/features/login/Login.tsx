import {useState} from 'react';
import {
  Button,
  GestureResponderEvent,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  FirebaseAuthTypes,
  getAuth,
  signInWithPhoneNumber,
} from '@react-native-firebase/auth';
import WebView from 'react-native-webview';
import {OtpInput} from 'react-native-otp-entry';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function Login() {
  // If null, no SMS has been sent
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');

  // user phone number
  const [phoneNumber, setPhoneNumber] = useState('');

  // Handle the button press
  async function handleSignInWithPhoneNumber(userPhoneNumber: string) {
    const confirmation = await signInWithPhoneNumber(
      getAuth(),
      userPhoneNumber,
    );
    console.log('confimarion');
    console.log('confimarion', confirmation);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      const user = await confirm?.confirm(code);
      console.log(user);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  const navigation = useNavigation();
  // Stuff to show before sending OTP
  if (!confirm) {
    return (
      <View style={styles.main}>
        {/* <View style={{flex: 1}} /> */}

        <Image
          source={require('../../assets/images/logo.png')} // local image
          style={styles.logoImage}
        />
        <Text>Welcome to CallNetwork</Text>
        <Text>Login using your phone number to get started</Text>
        <Text>Enter your phone number (+977 9860632193)</Text>
        {/* <View style={{flex:1}}></View> */}
        <TextInput
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
          style={styles.textInput}
        />
        {/* <View style={{flex: 1}} /> */}
        <CustomButton
          title="Login"
          onPress={() => handleSignInWithPhoneNumber(phoneNumber)}
          // onPress={() => {
          //   navigation.navigate('HomeStack');
          // }}
        />
        {/* <Text>OR</Text> */}
        {/* <WebView
          source={{
            uri: 'https://develop.callnetwork.xyz/api/v1/tglogin',
          }}
        /> */}
        {/* <View style={{flex: 1}} /> */}
      </View>
    );
  }

  // Stuff to show after sending OTP
  return (
    <>
      <Text>Enter code (111111)</Text>
      <OtpInput numberOfDigits={6} onTextChange={text => console.log(text)} />
      <TextInput value={code} onChangeText={text => setCode(text)} />
      <Button title="Login" onPress={() => confirmCode()} />
      <Button title="Try another number" onPress={() => setConfirm(null)} />
    </>
  );
}

const styles = StyleSheet.create({
  main: {flex: 1, justifyContent: 'center', alignItems: 'center', gap: 4},
  logoImage: {height: 67, width: 60},
  textInput: {borderColor: '#ABABAB', borderWidth: 2, borderRadius: 16},
});

function CustomButton({
  title,
  onPress,
  backgroundColor = '#3B2CB4',
  textColor = '#fff',
  padding = 12,
  borderRadius = 8,
  style = {},
  textStyle = {},
}: {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  backgroundColor?: string;
  textColor?: string;
  padding?: number;
  borderRadius?: number;
  style?: object;
  textStyle?: object;
}) {
  const buttonStyles = StyleSheet.create({
    button: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 16,
      fontWeight: '500',
    },
  });

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {
          backgroundColor: pressed ? '#357ABD' : backgroundColor,
          padding,
          borderRadius,
        },
        buttonStyles.button,
        style,
      ]}>
      <Text style={[{color: textColor}, buttonStyles.text, textStyle]}>
        {title}
      </Text>
    </Pressable>
  );
}
