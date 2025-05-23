import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Image,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import {useNavigation} from '@react-navigation/native';
import {OnboardingButton} from './Components';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../config/color';
import PhoneLinkLock from '../../assets/svg/phonelinklock.svg';
import MobileDataoff from '../../assets/svg/mobiledata_off.svg';
import Spa from '../../assets/svg/spa.svg';
const {width} = Dimensions.get('window');

export default function OnboardingScreen({
  completeOnboarding,
}: {
  completeOnboarding: () => void;
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef<PagerView>(null);
  const navigation = useNavigation<any>();

  // Content for each onboarding page using PNG images instead of SVGs
  const pages = [
    {
      // Replace SVG with Image component
      icon: (
        <Image
          source={require('./img/lock.png')}
          style={styles.onboardingImage}
          resizeMode="contain"
        />
      ),
      title: <>Your Trusted Identity, Powered {'\n'} by Blockchain.</>,
      description:
        'Experience secure, decentralized caller identification with blockchain technology.',
    },
    {
      icon: (
        <Image
          source={require('./img/gift.png')}
          style={styles.onboardingImage}
          resizeMode="contain"
        />
      ),
      title: <>Get rewards for identifying {'\n'} spam.</>,
      description:
        'Help the community by identifying spam callers and messages.',
    },
    {
      icon: (
        <Image
          source={require('./img/hand.png')}
          style={styles.onboardingImage}
          resizeMode="contain"
        />
      ),
      title: <>You Are Important So Is Your Data</>,
      description: '',
    },
  ];

  // JSON content for feature highlights on the last page
  const json = [
    {
      icon: <MobileDataoff width={18} height={18} />,
      text: 'We never sell your data',
      id: 1,
    },
    {
      icon: <PhoneLinkLock width={18} height={18} />,
      text: 'We only ask for essential Permissions',
      id: 2,
    },
    {
      icon: <Spa width={18} height={18} />,
      text: 'You get rewarded for identifying spam',
      id: 3,
    },
  ];

  /**
   * Proceeds to login after completing the initial onboarding slides
   */
  const proceedToContactSetup = () => {
    console.log('Navigating to Login');
    // Don't call completeOnboarding() here - we still need the onboarding flow
    navigation.navigate('Login');
  };

  /**
   * Updates the current page when user swipes
   */
  const onPageSelected = (event: any) => {
    setCurrentPage(event.nativeEvent.position);
  };

  /**
   * Navigates to the next page or proceeds to contact setup if on last page
   */
  const goToNextPage = () => {
    if (currentPage < pages.length - 1) {
      pagerRef.current?.setPage(currentPage + 1);
    } else {
      proceedToContactSetup();
    }
  };

  /**
   * Navigates to the previous page if not on first page
   */
  const goToPreviousPage = () => {
    if (currentPage > 0) {
      pagerRef.current?.setPage(currentPage - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Page Indicators */}
      <View style={styles.pageIndicatorContainer}>
        {pages.map((_, index) => (
          <View
            key={index}
            style={[
              styles.pageIndicator,
              currentPage === index ? styles.activePageIndicator : {},
            ]}
          />
        ))}
      </View>

      <PagerView
        ref={pagerRef}
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={onPageSelected}>
        {pages.map((page, i) => {
          return (
            <View style={styles.pageContainer} key={i.toString()}>
              {/* Image Illustration */}
              <View style={styles.imageContainer}>{page.icon}</View>

              {/* Content Area with Curved Top */}
              <View style={styles.contentContainer}>
                <Text style={styles.onboardingTitle}>{page.title}</Text>
                {page.description ? (
                  <Text style={styles.onboardingDescription}>
                    {page.description}
                  </Text>
                ) : null}

                {/* Display JSON content only on the last page */}
                {i === 2 && (
                  <View style={styles.featuresContainer}>
                    {json.map(item => (
                      <View key={item.id} style={styles.featureItem}>
                        <View style={styles.iconContainer}>{item.icon}</View>
                        <Text style={styles.featureText}>{item.text}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {/* Navigation Controls */}
                <View style={styles.navigationContainer}>
                  <TouchableOpacity
                    style={[
                      styles.navButton,
                      currentPage === 0 && styles.disabledButton,
                    ]}
                    onPress={goToPreviousPage}
                    disabled={currentPage === 0}>
                    <Feather
                      name="chevron-left"
                      size={24}
                      color={currentPage === 0 ? '#4D3F66' : colors.white}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.mainButton}
                    onPress={goToNextPage}>
                    <Text style={styles.mainButtonText}>
                      {currentPage === pages.length - 1
                        ? 'Continue'
                        : 'Launch App'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.navButton,
                      currentPage === pages.length - 1 && styles.disabledButton,
                    ]}
                    onPress={goToNextPage}
                    disabled={currentPage === pages.length - 1}>
                    <Feather
                      name="chevron-right"
                      size={24}
                      color={
                        currentPage === pages.length - 1
                          ? '#4D3F66'
                          : colors.white
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </PagerView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  pageIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50, // Reduced from 90 to move it higher
    marginBottom: 8,
  },
  pageIndicator: {
    width: 90, // Made all indicators the same width
    height: 8,
    borderRadius: 4,
    backgroundColor: '#332245',
    marginHorizontal: 5,
  },
  activePageIndicator: {
    backgroundColor: colors.purple,
    // Width is now inherited from pageIndicator
    // No need to specify width here
  },
  pageContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  // New style specifically for the onboarding images
  onboardingImage: {
    width: width * 0.75,
    height: width * 0.55,
  },
  contentContainer: {
    backgroundColor: '#311753',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    width: '100%',
    alignItems: 'center',
    borderWidth: 0.1,
    borderColor: '#aba3b9',
    borderBottomWidth: 0,
    marginBottom: 40,
  },
  pagerView: {
    flex: 1,
  },
  onboardingTitle: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 18,
    lineHeight: 32,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.white,
    marginBottom: 16,
  },
  onboardingDescription: {
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: colors.white,
    marginBottom: 24,
  },
  // Feature list styles
  featuresContainer: {
    width: '100%',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24, // Increased spacing between items
    paddingHorizontal: 8,
    // Removed background and border
  },
  iconContainer: {
    width: 42, // Slightly larger icons
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16, // Increased spacing between icon and text
    // Add a subtle shadow to make icons pop against the background
  },
  featureText: {
    fontSize: 16, // Slightly larger text
    color: colors.white,
    fontWeight: '500',
    flexShrink: 1,
    padding: 4,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  navButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#9489a3',
  },
  disabledButton: {
    backgroundColor: '#221835',
    opacity: 0.5,
  },
  mainButton: {
    paddingVertical: 14,
    paddingHorizontal: 36,
    backgroundColor: colors.purple,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B983FF',
  },
  mainButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
});
