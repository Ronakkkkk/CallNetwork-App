import {useState, useEffect} from 'react';
import {Button, Text, TextInput} from 'react-native';
import {
  FirebaseAuthTypes,
  getAuth,
  onAuthStateChanged,
  signInWithPhoneNumber,
} from '@react-native-firebase/auth';

export default function PhoneSignIn() {
  // If null, no SMS has been sent
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');

  // user phone number
  const [phoneNumber, setPhoneNumber] = useState('+977 9860632193');

  // Handle login
  function handleAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function handleSignInWithPhoneNumber(userPhoneNumber: string) {
    const confirmation = await signInWithPhoneNumber(
      getAuth(),
      userPhoneNumber,
    );
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

  // Stuff to show before sending OTP
  if (!confirm) {
    return (
      <>
        <Text>Enter your phone number (+977 9860632193)</Text>
        <TextInput
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
        />
        <Button
          title="Continue"
          onPress={() => handleSignInWithPhoneNumber(phoneNumber)}
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
