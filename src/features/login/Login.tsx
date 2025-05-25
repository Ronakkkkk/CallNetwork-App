import {useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
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
import Feather from 'react-native-vector-icons/Feather';
import Star from '../../assets/svg/ministar.svg';

const {width} = Dimensions.get('window');

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
    if (!phoneNumber.trim()) {
      // Don't proceed with empty phone number
      return;
    }

    setLoading(true);
    try {
      const confirmation = await signInWithPhoneNumber(getAuth(), phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      console.error('Error sending code:', error);
    } finally {
      setLoading(false);
    }
  }

  const navigation = useNavigation<any>();

  // Handle otp verification
  async function confirmCode() {
    if (!code || code.length < 6) {
      return;
    }

    try {
      setLoading(true);
      await confirm?.confirm(code);
      navigation.navigate('OnboardingScreen2');
    } catch (error) {
      console.log('Invalid code.');
    } finally {
      setLoading(false);
    }
  }

  // Phone number entry screen
  if (!confirm) {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidView}>
          <View style={styles.main}>
            {/* Decorative stars */}
            <Star width={40} height={40} style={styles.starTop} opacity={0.7} />
            <Star
              width={25}
              height={25}
              style={styles.starBottom}
              opacity={0.5}
            />

            {/* Logo and Header */}
            <View style={styles.headerContainer}>
              <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
              <Text style={styles.welcomeText}>Welcome to CallNetwork</Text>
              <Text style={styles.subtitleText}>
                Login using your phone number to get started
              </Text>
            </View>

            {/* Phone number input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Enter your phone number</Text>
              <View style={styles.phoneInputWrapper}>
                <TextInput
                  placeholder="+1 (000) 000-0000"
                  placeholderTextColor="#645774"
                  value={phoneNumber}
                  onChangeText={text => setPhoneNumber(text)}
                  style={styles.textInput}
                  keyboardType="phone-pad"
                />
                {phoneNumber ? (
                  <TouchableOpacity
                    style={styles.clearButton}
                    onPress={() => setPhoneNumber('')}>
                    <Feather name="x" size={18} color="#645774" />
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>

            {/* Login button */}
            <TouchableOpacity
              activeOpacity={0.9} // This prevents the default opacity change on press
              style={[
                styles.loginButton,
                !phoneNumber.trim() && styles.disabledButton,
              ]}
              onPress={handleSignInWithPhoneNumber}
              disabled={!phoneNumber.trim() || isLoading}>
              {isLoading ? (
                <Progress.Circle
                  size={24}
                  indeterminate={true}
                  color={colors.white}
                  style={styles.loader}
                />
              ) : (
                <>
                  <Text style={styles.loginButtonText}>
                    Continue to Verification
                  </Text>
                  <Feather name="arrow-right" size={20} color={colors.white} />
                </>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // OTP verification screen
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidView}>
        <View style={styles.main}>
          {/* Decorative stars */}
          <Star width={40} height={40} style={styles.starTop} opacity={0.7} />
          <Star
            width={25}
            height={25}
            style={styles.starBottom}
            opacity={0.5}
          />

          {/* Logo and Header */}
          <View style={styles.headerContainer}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={styles.welcomeText}>Verification Code</Text>
            <Text style={styles.subtitleText}>
              Enter the code we sent to your phone
            </Text>
          </View>

          {/* OTP input */}
          <View style={styles.otpContainer}>
            <OtpInput
              numberOfDigits={6}
              onTextChange={text => setCode(text)}
              focusColor={colors.purple}
              theme={{
                containerStyle: styles.otpContainerStyle,
                pinCodeContainerStyle: styles.otpDigitContainer,
                pinCodeTextStyle: styles.otpDigitText,
              }}
            />
          </View>

          {/* Verify button */}
          <TouchableOpacity
            activeOpacity={0.9} // This prevents the default opacity change on press
            style={[
              styles.loginButton,
              (!code || code.length < 6) && styles.disabledButton,
            ]}
            onPress={confirmCode}
            disabled={!code || code.length < 6 || isLoading}>
            {isLoading ? (
              <Progress.Circle
                size={24}
                indeterminate={true}
                color={colors.white}
                style={styles.loader}
              />
            ) : (
              <>
                <Text style={styles.loginButtonText}>Login to Continue</Text>
                <Feather name="check" size={20} color={colors.white} />
              </>
            )}
          </TouchableOpacity>

          {/* Try another number link */}
          <Pressable
            style={styles.changeNumberButton}
            onPress={() => setConfirm(null)}>
            <Feather name="phone" size={16} color={colors.purple} />
            <Text style={styles.changeNumberText}>Try another number</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoidView: {
    flex: 1,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    position: 'relative',
  },
  starTop: {
    position: 'absolute',
    top: 60,
    right: 30,
  },
  starBottom: {
    position: 'absolute',
    bottom: 100,
    left: 30,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoImage: {
    height: 90,
    width: 80,
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 12,
    fontFamily: 'PoppinsSemiBold',
  },
  subtitleText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'PoppinsRegular',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 32,
  },
  inputLabel: {
    fontSize: 16,
    color: colors.white,
    marginBottom: 12,
    fontFamily: 'PoppinsRegular',
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 2,
    borderColor: '#615772',
    borderRadius: 12,
    backgroundColor: 'rgba(97, 87, 114, 0.1)',
    overflow: 'hidden',
  },
  textInput: {
    flex: 1,
    color: colors.white,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: 'PoppinsRegular',
  },
  clearButton: {
    padding: 12,
    marginRight: 8,
  },
  loginButton: {
    flexDirection: 'row',
    backgroundColor: colors.purple, // Default purple color
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#B983FF',
  },
  disabledButton: {
    backgroundColor: colors.purple, // Darker, more muted color when disabled
    borderColor: 'rgba(97, 87, 114, 0.5)', // More muted border
  },
  loginButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
    marginRight: 8,
    fontFamily: 'PoppinsSemiBold',
    textAlign: 'center', // Ensure text is centered
  },
  loader: {
    marginHorizontal: 10,
  },
  otpContainer: {
    width: '100%',
    marginBottom: 32,
  },
  otpContainerStyle: {
    width: '100%',
    marginVertical: 20,
  },
  otpDigitContainer: {
    height: 60,
    width: 50,
    borderWidth: 2,
    borderColor: '#615772',
    borderRadius: 12,
    backgroundColor: 'rgba(97, 87, 114, 0.1)',
  },
  otpDigitText: {
    fontSize: 20,
    color: colors.white,
    fontFamily: 'PoppinsSemiBold',
  },
  changeNumberButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    padding: 12,
  },
  changeNumberText: {
    color: colors.purple,
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'PoppinsRegular',
  },
});
