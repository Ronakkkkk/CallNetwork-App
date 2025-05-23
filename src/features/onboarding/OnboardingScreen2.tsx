import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import colors from '../../config/color';
import Star from '../../assets/svg/ministar.svg';
import Blurstar from '../../assets/svg/Blurstart.svg';
import Blurstar2 from '../../assets/svg/Blurstar2.svg';


const OnboardingScreen2 = () => {
  const navigation = useNavigation<any>();

  const goToNextScreen = () => {
    console.log('Navigating to OnboardingScreen3');
    navigation.navigate('OnboardingScreen3');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          {/* Clock image with stars positioned around it */}
          <View style={styles.clockWrapper}>
            <Image
              source={require('./img/clock.png')}
              style={styles.clockImage}
              resizeMode="contain"
            />

            {/* Stars positioned absolutely on the left top of the clock */}
            <Star width={40} height={40} style={styles.star1} />
            <Star width={25} height={25} style={styles.star2} />
          </View>
        </View>

        <View style={styles.textContainer}>

          <View style={styles.waitContainer}>
            <Text style={styles.title}>Wait For a While...</Text>

            {/* Stars positioned to the right of the text with blur effect - using direct positioning */}
            <Blurstar2 width={30} height={30} style={styles.blurredStar1} />
            <Blurstar width={40} height={40} style={styles.blurredStar2} />
          </View>
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

export default OnboardingScreen2;

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
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Container for the clock and stars
  clockWrapper: {
    width: 250,
    height: 250,
    position: 'relative', // Important for absolute positioning of stars
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockImage: {
    width: 200,
    height: 200,
  },
  // Direct positioning for stars around the clock
  star1: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 10,
  },
  star2: {
    position: 'absolute',
    top: 40,
    left: 5,
    zIndex: 10,
  },
  textContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  waitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    marginTop: 10,
  },
  // Direct positioning for stars near the text
  blurredStar1: {
    position: 'absolute',
      right: 25,
    top:35,
  },
  blurredStar2: {
    position: 'absolute',
      right: 0,
      top: 5,


  },
  title: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
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
