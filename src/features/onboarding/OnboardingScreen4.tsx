import React from 'react';
import {StyleSheet, Text, Image, TouchableOpacity, View, SafeAreaView, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import colors from '../../config/color';
import Rocket from "./img/rocket.svg";
import Star from "../../assets/svg/ministar.svg";

const {width} = Dimensions.get('window');

const OnboardingScreen4 = ({completeOnboarding}: {completeOnboarding: () => void}) => {
  const navigation = useNavigation<any>();
    
  const handleComplete = () => {
    // Now we call completeOnboarding to finish the entire onboarding process
    completeOnboarding();
    // No need to navigate - AppNavigator will automatically show HomeStack
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Successful!</Text>

        <View style={styles.imageContainer}>
          {/* Rocket image with stars positioned on the right side */}
          <View style={styles.rocketContainer}>
            <Image
              source={require('./img/rocket.png')}
              style={styles.rocketImage}
              resizeMode="contain"
            />
            
            {/* Stars positioned absolutely on the right side of the rocket */}
            <View style={styles.star1Container}>
              <Star width={40} height={40} />
            </View>
            
            <View style={styles.star2Container}>
              <Star width={25} height={25} />
            </View>
          </View>
        </View>

        <Text style={styles.description}>Contacts Imported Successfully</Text>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleComplete}>
          <Text style={styles.buttonText}>Continue to App</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  imageContainer: {
    width: width * 0.9,
    height: width * 0.7,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rocketContainer: {
    width: width * 0.7,
    height: width * 0.7,
    position: 'relative', // Important for absolute positioning of stars
  },
  rocketImage: {
    width: '100%',
    height: '100%',
  },
  // Larger star positioned on the right side of the rocket
  star1Container: {
    position: 'absolute',
    top: '5%', // Position at mid-height
    right: -20, // Position just outside the right edge
    zIndex: 10, // Ensure stars appear above rocket
  },
  // Second smaller star positioned slightly offset from the first
  star2Container: {
    position: 'absolute',
    top: '15%', // Position slightly above the first star
    right: 5, // Position closer to the rocket than the first star
    zIndex: 10,
  },
  title: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 28,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontFamily: 'PoppinsRegular',
    fontSize: 18,
    lineHeight: 24,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 40,
  },
  continueButton: {
    paddingVertical: 14,
    backgroundColor: colors.purple,
    borderRadius: 22,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B983FF',
    width: 250,
  },
  buttonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
});
