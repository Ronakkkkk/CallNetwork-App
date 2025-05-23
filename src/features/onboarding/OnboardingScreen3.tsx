import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import colors from '../../config/color';
import Star from '../../assets/svg/ministar.svg';
import Blurstar from '../../assets/svg/Blurstart.svg';
import Blurstar2 from '../../assets/svg/Blurstar2.svg';

const {width} = Dimensions.get('window');

const OnboardingScreen3 = () => {
  const navigation = useNavigation<any>();

  const goToNextScreen = () => {
    navigation.navigate('OnboardingScreen4');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          {/* Man image with stars positioned around it */}
          <View style={styles.manImageWrapper}>
            <Image
              source={require('./img/man.png')}
              style={styles.image}
              resizeMode="contain"
            />

            {/* Stars positioned absolutely on the left side of the man */}
            <Star width={40} height={40} style={styles.star1} />
            <Star width={25} height={25} style={styles.star2} />
          </View>
        </View>

        
        {/* Container for description text and blur stars */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Click 'Continue' to connect with our bot and easily add your contacts
            in just a few steps!
          </Text>
          
          {/* Stars positioned behind the description text */}
          <Blurstar width={50} height={50} style={styles.blurredStar1} opacity={0.5} />
          <Blurstar2 width={30} height={30} style={styles.blurredStar2} opacity={0.7} />
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={goToNextScreen}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen3;

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
    height: width * 1.0,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  manImageWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  // Direct positioning for stars on the man image
  star1: {
    position: 'absolute',
    top: '10%',
    left: 15,
    zIndex: 10,
  },
  star2: {
    position: 'absolute',
    top: '16%',
    left: 10,
    zIndex: 10,
  },
  title: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 16,
  },
  // Container for the description and its stars
  descriptionContainer: {
    position: 'relative',
    width: '100%',
      marginBottom: 40,
    padding:20
  },
  description: {
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    lineHeight: 24,
    color: colors.white,
    textAlign: 'center',
    zIndex: 2, // Ensure text appears above the stars
  },
  // Position stars at the back-right corner of the description
  blurredStar1: {
    position: 'absolute',
    right: 15,
    bottom: 20,
    zIndex: 1, // Place behind the text
  },
  blurredStar2: {
    position: 'absolute',
    right: 35,
    bottom: 15,
    zIndex: 1, // Place behind the text
  },
  continueButton: {
    paddingVertical: 14,
    paddingHorizontal: 36,
    backgroundColor: colors.purple,
    borderRadius: 22,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B983FF',
    width: 200,
  },
  buttonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
});
