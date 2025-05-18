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
      <View style={styles.topBar}>
        <View style={styles.userInfo}>
          <Image
            source={require('../../../assets/images/profile.png')}
            style={styles.profileImage}
          />
          <View style={styles.userDetails}>
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
        </View>
      </View>

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>$CALL BALANCE</Text>
        <Text style={styles.balanceValue}>{callBalance}</Text>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total Contacts</Text>
          <Text style={styles.statValue}>{totalContacts}</Text>
        </View>
        <View style={styles.statCard}>
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
      <TouchableOpacity style={styles.importButton}>
        <AntDesign name="addusergroup" size={20} color="white" />
        <Text style={styles.importButtonText}>Import Contacts</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    padding: 16,
  },
  topBar: {
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.purple,
  },
  userDetails: {
    marginLeft: 12,
    flex: 1,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 4,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  addressText: {
    color: '#ccc',
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
  },
  balanceLabel: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 8,
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
  },
  statLabel: {
    color: '#ccc',
    fontSize: 12,
    marginBottom: 8,
    fontWeight: '500',
  },
  statValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
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
