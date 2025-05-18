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
  const [totalContacts, setTotalContacts] = useState(122);
  const [spamDetected, setSpamDetected] = useState(22);
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
            blurRadius={10}
          />
          <View style={styles.backgroundOverlay} />
        </View>

        <View style={styles.topBarContent}>
          <TouchableOpacity style={styles.backButton}>
            <Feather name="arrow-left" size={24} color={colors.white} />
          </TouchableOpacity>

          <View style={styles.userInfo}>
            <Image
              source={require('../../../assets/images/profile.png')}
              style={styles.profileImage}
            />
          </View>
        </View>
      </View>

      {/* User Details Section - Centered below the background */}
      <View style={styles.userDetailsSection}>
        <Text style={styles.welcomeText}>Welcome, John Doe</Text>
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>
            {truncateAddress('234567890987656789876787')}
          </Text>
          <TouchableOpacity style={styles.copyButton}>
            <Feather name="copy" size={16} color={colors.purple} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <View style={styles.balanceInfo}>
          <Text style={styles.balanceLabel}>$CALL BALANCE :</Text>
          <Text style={styles.balanceValue}>{callBalance}</Text>
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Feather name="users" size={22} color={colors.purple} />
          </View>
          <Text style={styles.statLabel}>Total Contacts</Text>
          <Text style={styles.statValue}>{totalContacts}</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Feather name="alert-triangle" size={22} color={colors.purple} />
          </View>
          <Text style={styles.statLabel}>Spam Detected</Text>
          <Text style={styles.statValue}>{spamDetected}</Text>
        </View>
      </View>

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
            {fill => (
              <Text style={styles.progressText}>{`${Math.round(fill)}%`}</Text>
            )}
          </AnimatedCircularProgress>
          <View style={styles.rewardDetails}>
            <Text style={styles.rewardTitle}>Next Reward</Text>
            <Text style={styles.rewardValue}>25 CALL</Text>
            <Text style={styles.rewardDescription}>
              Import 10 more contacts to claim
            </Text>
          </View>
        </View>
      </View>

      {/* FAQ Section */}
      <View style={styles.faqSection}>
        <Text style={styles.sectionTitle}>FAQs</Text>
        {faqData.map((faq, index) => (
          <TouchableOpacity
            key={index}
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
        ))}
      </View>

      {/* Import Contacts Button */}
      {/* <TouchableOpacity style={styles.importButton}>
        <AntDesign name="addusergroup" size={20} color="white" />
        <Text style={styles.importButtonText}>Import Contacts</Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    padding: 16,
  },
  topBarContainer: {
    position: 'relative',
    height: 180, // 20% of typical screen height
  },
  topBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  topBarContent: {
    flex: 1,
    padding: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
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
    marginBottom: 24,
    alignItems: 'center', // Center align all content
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 8,
    textAlign: 'center', // Center the text
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // Remove background color
    backgroundColor: 'transparent',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
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
    backgroundColor: 'rgba(151, 71, 255, 0.3)',
    borderRadius: 12,
    padding: 16,
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
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
    minWidth: '45%', // Enforce minimum width
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(151, 71, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    color: '#ccc',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
    textAlign: 'center',
  },
  statValue: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  rewardSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 20,
  },
  progressText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
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
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
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
});
