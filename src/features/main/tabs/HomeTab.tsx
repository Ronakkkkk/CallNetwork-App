import {getAuth} from '@react-native-firebase/auth';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import Info from '../../../assets/svg/Info.svg';
import Phone from '../../../assets/svg/Phone.svg';
import Protection from '../../../assets/svg/Protection.svg';
import {useUserContext} from '../../../context/UserContext';
import colors from '../../../config/color';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

export default function HomeTab() {
  const user = useUserContext();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  // Dummy data
  const [callBalance, setCallBalance] = useState(25);
  const [totalContacts, setTotalContacts] = useState(100);
  const [spamDetected, setSpamDetected] = useState(30);
  const [rewardProgress, setRewardProgress] = useState(50); // 50% progress

  // Truncate address function
  const truncateAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4,
    )}`;
  };

  // Toggle FAQ function
  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  // FAQ data
  const faqData = [
    {
      question: 'What is ZK Login?',
      answer:
        'Zero-Knowledge Login is a cryptographic authentication method that allows you to prove your identity without revealing sensitive information.',
    },
    {
      question: 'What is Call Network?',
      answer:
        'Call Network is a decentralized caller identification platform that uses blockchain technology to provide secure and private caller ID services.',
    },
    {
      question: 'How do rewards work?',
      answer:
        'You earn CALL tokens by contributing to the network through activities like importing contacts, identifying spam calls, and verifying legitimate contacts.',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBarContainer}>
        <View style={styles.topBarBackground}>
          <Image
            source={require('../../../assets/images/profile.png')}
            style={styles.backgroundImage}
            blurRadius={0} // Change from 10 to 0 to remove blur completely
          />
        </View>

        <View style={styles.topBarContent}>
          <TouchableOpacity style={styles.backButton}>
            <Feather name="chevron-left" size={24} color={colors.black} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.wrapper}>
        {/* User Details Section - Centered below the background */}
        <View style={styles.userDetailsSection}>
          <Text style={styles.welcomeText}>Welcome, John Doe</Text>
          <View style={styles.addressContainer}>
            <Text style={styles.addressText}>
              {truncateAddress('234567890987656789876787')}
            </Text>
            <TouchableOpacity style={styles.copyButton}>
              <Feather name="copy" size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.dividerContainer}>
          {Array(30)
            .fill(0)
            .map((_, index) => (
              <View key={index} style={styles.dashItem} />
            ))}
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <View style={{position: 'absolute', top: 8, right: 8}}>
            <Info width={20} height={20} />
          </View>
          <View style={styles.balanceInfo}>
            <Text style={styles.balanceLabel}>$CALL BALANCE :</Text>
            <Text style={styles.balanceValue}>{callBalance}</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={{position: 'absolute', top: 8, right: 8}}>
              <Info width={20} height={20} opacity={0.6} />
            </View>
            <View style={styles.statContent}>
              <Image
                source={require('../../../assets/images/phone.png')}
                style={{
                  width: 32,
                  height: 32,
                  marginTop: 2, // Add a small top margin to align with text
                }}
              />
              <View style={styles.statTextContainer}>
                <Text style={styles.statLabel}>Total Contacts</Text>
              </View>
            </View>
            <Text style={styles.statValue}>{totalContacts}</Text>
          </View>

          <View style={styles.statCard}>
            <View style={{position: 'absolute', top: 8, right: 8}}>
              <Info width={20} height={20} opacity={0.6} />
            </View>
            <View style={styles.statContent}>
              <Image
                source={require('../../../assets/images/protection.png')}
                style={{
                  width: 32,
                  height: 32,
                  marginTop: 2, // Add a small top margin to align with text
                }}
              />
              <View style={styles.statTextContainer}>
                <Text style={styles.statLabel}>Spam Detected</Text>
              </View>
            </View>
            <Text style={styles.statValue}>{spamDetected}</Text>
          </View>
        </View>

        <View style={styles.dividerContainer}>
          {Array(30)
            .fill(0)
            .map((_, index) => (
              <View key={index} style={styles.dashItem} />
            ))}
        </View>

        {/* Reward Progress */}
        {/* Reward Progress */}
        <View style={styles.rewardSection}>
          <Text style={styles.sectionTitle}>Reward Progress</Text>
          <View style={styles.progressContainer}>
            <AnimatedCircularProgress
              size={120}
              width={15}
              fill={rewardProgress}
              tintColor={colors.purple}
              backgroundColor="rgba(151, 71, 255, 0.2)"
              rotation={0}>
              {() => (
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.progressText}>Rewards</Text>
                </View>
              )}
            </AnimatedCircularProgress>
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>FAQ's</Text>
          {faqData.map((faq, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity
                style={styles.faqItem}
                onPress={() => toggleFAQ(index)}>
                <View style={styles.faqHeader}>
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                  <Feather
                    name={expandedFAQ === index ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color={colors.white}
                  />
                </View>

                {expandedFAQ === index && (
                  <Text style={styles.faqAnswer}>{faq.answer}</Text>
                )}
              </TouchableOpacity>

              {/* Divider after each FAQ */}

              <View style={styles.dividerContainer}>
                {Array(30)
                  .fill(0)
                  .map((_, i) => (
                    <View key={i} style={styles.dashItem} />
                  ))}
              </View>
            </React.Fragment>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBarContainer: {
    position: 'relative',
    height: 280, // 20% of typical screen height
  },
  wrapper: {
    backgroundColor: '#312033',
    // backgroundColor: '#1a1522',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20, // Creates an overlap with the top section
    paddingTop: 16,
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  topBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Add a semi-transparent overlay
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  topBarContent: {
    flex: 1,
    padding: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.black,
  },
  userInfo: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: colors.purple,
  },
  // New section for content below the background
  userDetailsSection: {
    paddingHorizontal: 16,
    marginTop: -20, // Negative margin to create overlap with profile image
    marginBottom: 10,
    alignItems: 'center', // Center align all content
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
    marginTop: 16,
    textAlign: 'center', // Center the text
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // Remove background color
    backgroundColor: 'transparent',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  addressText: {
    color: 'rgba(255, 255, 255, 0.6)', // Decreased opacity
    fontSize: 14,
    marginRight: 8,
  },
  copyButton: {
    padding: 4,
  },
  balanceCard: {
    backgroundColor: '#332245',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#615772',
    padding: 36,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    fontSize: 18,
  },
  balanceLabel: {
    color: colors.white,
    fontSize: 28, // Increased from 16 to match balanceValue
    fontWeight: '600',
    marginRight: 8, // Add spacing between label and value
  },
  balanceValue: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#332245',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#615772',
    padding: 16,
    marginHorizontal: 5,
    minWidth: '45%',

    position: 'relative',
  },
  statContent: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Change to flex-start to align with top text
    width: '100%',
  },
  statTextContainer: {
    marginLeft: 12,
    flex: 1,
    justifyContent: 'flex-start', // Change from center to flex-start
    alignItems: 'flex-start', // Add this line to ensure all content is left-aligned
  },

  statLabel: {
    color: '#ccc',
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'left',
  },
  statValue: {
    color: 'white',
    fontSize: 28,
    paddingLeft: 10,
    fontWeight: '700',
    textAlign: 'left',
    alignSelf: 'flex-start', // Add this to ensure the value is left-aligned
  },
  rewardSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 16,
    backgroundColor: '#332245',
    borderRadius: 12,
    alignContent: 'center',
    width: '100%',
    padding: 12,
    textAlign: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 20,
    alignSelf: 'center',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
  },
  progressSubtext: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 4,
  },
  rewardDetails: {
    marginLeft: 20,
    flex: 1,
  },
  rewardTitle: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 4,
  },
  rewardValue: {
    color: colors.purple,
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 4,
  },
  rewardDescription: {
    color: '#aaa',
    fontSize: 13,
  },
  faqSection: {
    marginBottom: 20,
  },
  faqItem: {
    padding: 5,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: colors.white,
  },
  faqAnswer: {
    marginTop: 12,
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  importButton: {
    backgroundColor: colors.purple,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  importButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  dashItem: {
    width: 6,
    height: 1.5,
    backgroundColor: '#211d26',
    marginHorizontal: 3,
  },
});
