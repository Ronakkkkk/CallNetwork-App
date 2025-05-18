import {useState} from 'react';
import {Button, Text, TextInput} from 'react-native';
import {
  FirebaseAuthTypes,
  getAuth,
  signInWithPhoneNumber,
} from '@react-native-firebase/auth';
import WebView from 'react-native-webview';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function Login() {
  // If null, no SMS has been sent
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');

  // user phone number
  const [phoneNumber, setPhoneNumber] = useState('+977 9860632193');

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
      <>
        <Text>Enter your phone numbers (+977 9860632193)</Text>
        <TextInput
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
        />
        <Button
          title="Sign in with phone number"
          onPress={() => handleSignInWithPhoneNumber(phoneNumber)}
          // onPress={() => {
          //   navigation.navigate('HomeStack');
          // }}
        />
        <Text>OR</Text>
        <WebView
          source={{
            uri: 'https://develop.callnetwork.xyz/api/v1/tglogin',
          }}
        />
      </>
    );
  }

  // Stuff to show after sending OTP
  return (
    <>
      <Text>Enter code (111111)</Text>
      <TextInput value={code} onChangeText={text => setCode(text)} />
      <Button title="Login" onPress={() => confirmCode()} />
      <Button title="Try another number" onPress={() => setConfirm(null)} />
    </>
  );
}
