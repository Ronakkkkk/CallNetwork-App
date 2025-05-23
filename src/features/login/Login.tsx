import {useState} from 'react';
import {
  Button,
  GestureResponderEvent,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  FirebaseAuthTypes,
  getAuth,
  signInWithPhoneNumber,
} from '@react-native-firebase/auth';
import {OtpInput} from 'react-native-otp-entry';
import colors from '../../config/color';
import * as Progress from 'react-native-progress';
import {useNavigation} from '@react-navigation/native';

export default function Login() {
  const [isLoading, setLoading] = useState(false);

  // If null, no SMS has been sent
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');

  // user phone number
  const [phoneNumber, setPhoneNumber] = useState('');

  // Handle phone number entry
  async function handleSignInWithPhoneNumber() {
    setLoading(true);
    const confirmation = await signInWithPhoneNumber(getAuth(), phoneNumber);
    // await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setConfirm(confirmation);
  }
  const navigation = useNavigation<any>();

  // Handle otp verification
  async function confirmCode() {
    try {
      setLoading(true);
      await confirm?.confirm(code);
      setLoading(false);
      navigation.navigate('OnboardingScreen2');
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  // Stuff to show before sending OTP
  if (!confirm) {
    return (
      <View style={styles.main}>
        <Image
          source={require('../../assets/images/logo.png')} // local image
          style={styles.logoImage}
        />
        <Text>Welcome to CallNetwork</Text>
        <Text>Login using your phone number to get started</Text>
        <Text>Enter your phone number</Text>
        <TextInput
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
          style={styles.textInput}
        />

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleSignInWithPhoneNumber}>
          <Text style={styles.loginButtonText}>Login</Text>
          {/* Add icon maybe */}
          {isLoading && (
            <Progress.Circle
              size={30}
              indeterminate={true}
              color={colors.white}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  }

  // Stuff to show after sending OTP
  return (
    <View style={styles.main}>
      <Text>Enter code (111111)</Text>
      <OtpInput
        numberOfDigits={6}
        onTextChange={text => setCode(text)}
        focusColor={colors.purple}
        theme={{
          pinCodeContainerStyle: {height: 50},
        }}
      />
      <TouchableOpacity style={styles.loginButton} onPress={confirmCode}>
        <Text style={styles.loginButtonText}>Login</Text>
        {/* Add icon maybe */}
        {isLoading && (
          <Progress.Circle
            size={30}
            indeterminate={true}
            color={colors.white}
          />
        )}
      </TouchableOpacity>

      <Pressable onPress={() => setConfirm(null)}>
        <Text style={{color: colors.purple}}>Try another number</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    paddingInline: 20,
  },
  logoImage: {height: 67, width: 60},
  textInput: {borderColor: '#ABABAB', borderWidth: 2, borderRadius: 16},
  loginButton: {
    flexDirection: 'row',
    backgroundColor: colors.purple,
    borderRadius: 10,
    paddingVertical: 14,
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    width: '90%',
  },
  loginButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
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
