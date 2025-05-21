import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../../../config/color';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Solana from '../../../assets/svg/solana.svg';
import Creditcard from '../../../assets/svg/Creditcard.svg';
import RewardHeader from '../../../Components/RewardHeader';
import Star from '../../../assets/svg/ministar.svg';

const Rewards = () => {
  const navigation = useNavigation();

  // FAQ state for expandable sections
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  // Toggle FAQ expansion
  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  // Dummy data for earning rules
  const earningRules = [
    {
      question: '2,000+ points (to $1000+ value) for becoming active',
      answer:
        'You earn 5 points for each new contact you import to the platform. This helps grow our community and improve caller identification.',
    },
    {
      question: 'Superboost your Solana staking rewards (up to 3X!)',
      answer:
        'You earn 10 points each time you report a number as spam that gets verified by our system or by other users.',
    },
    {
      question: '6-18% in reward points per card spend',
      answer:
        'You earn 2 points for each contact you verify as legitimate. This helps improve the accuracy of our database.',
    },
  ];

  // Dummy leaderboard data
  const leaderboardData = [
    {
      id: 1,
      name: 'Rohit  Agrawal',
      score: 2422,
      image: require('../../../assets/images/pp.png'),
    },
    {
      id: 2,
      name: 'Rohit  Agrawal',
      score: 2422,
      image: require('../../../assets/images/pp.png'),
    },
    {
      id: 3,
      name: 'Rohit  Agrawal',
      score: 2422,
      image: require('../../../assets/images/pp.png'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rewards</Text>
        <Feather name="help-circle" size={24} color={colors.white} />
      </View>
      <View
        style={{
          width: '100%',
          height: 20, // Increase height to give more space
          position: 'relative', // Keep this
          marginBottom: 10, // Add margin below the stars
        }}>
        <Star
          width={44}
          height={44}
          style={{
            position: 'absolute',
            top: -10, // Position from top
            right: 100, // Position from right edge
            zIndex: 2,
          }}
        />
        <Star
          width={20}
          height={20}
          style={{
            position: 'absolute',
            top: -10, // Slightly lower than the first star
            right: 90, // Further from right than the first star
            zIndex: 2,
          }}
        />
      </View>

      <RewardHeader name="Kash Dhandha" callpoints="250" />

      {/* User Points Summary */}

      {/* History Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>History</Text>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Contacts Imported</Text>
            <Text style={styles.statValue}>86</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Spam Detected</Text>
            <Text style={styles.statValue}>20</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Contacts Verified</Text>
            <Text style={styles.statValue}>14</Text>
          </View>
        </View>
      </View>

      {/* Earn Rules Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Earn Rules</Text>

        {earningRules.map((rule, index) => (
          <TouchableOpacity
            key={index}
            style={styles.faqItem}
            onPress={() => toggleFAQ(index)}>
            <View style={styles.faqHeader}>
              {/* Display different icon based on index */}
              {index === 0 && (
                <AntDesign
                  name="staro"
                  size={20}
                  color={colors.white}
                  style={styles.ruleIcon}
                />
              )}
              {index === 1 && (
                <Creditcard width={20} height={20} style={styles.ruleIcon} />
              )}
              {index === 2 && (
                <Solana width={20} height={20} style={styles.ruleIcon} />
              )}

              <Text style={styles.faqQuestion}>{rule.question}</Text>
              <Feather
                name={expandedFAQ === index ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={colors.white}
              />
            </View>

            {expandedFAQ === index && (
              <Text style={styles.faqAnswer}>{rule.answer}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Leaderboard Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Leaderboard</Text>

        {leaderboardData.map((user, index) => (
          <View key={user.id} style={styles.leaderboardItem}>
            <Image source={user.image} style={styles.leaderAvatar} />

            <View style={styles.leaderInfo}>
              <Text style={styles.leaderName}>{user.name}</Text>
            </View>

            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>{user.score}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Available Rewards Section */}
    </ScrollView>
  );
};

export default Rewards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  backButton: {
    padding: 4,
  },
  topTetrax: {
    position: 'absolute',
    bottom: 120,
    right: 60,
    zIndex: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
  },
  userPointsCard: {
    marginHorizontal: 16,
    marginVertical: 20,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // More subtle background
    borderRadius: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#9747FF', // Solid color for emphasis
  },
  userDetails: {
    marginLeft: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 4,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsText: {
    marginLeft: 6,
    fontSize: 16,
    color: '#9747FF', // Solid color for emphasis
    fontWeight: '500',
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 4,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5a5363',
    marginBottom: 12, // Reduced from 16
    alignSelf: 'center',
  },
  statsGrid: {
    flexDirection: 'column',
    marginBottom: 0, // Remove bottom margin
    marginVertical: 0, // Remove vertical margin
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 10, // Reduce padding further
    alignItems: 'center',
    marginHorizontal: 4,
    marginBottom: 2, // Add small bottom margin to each card
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent', // Remove background color
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 15,
    color: colors.white,
    textAlign: 'center',
  },
  faqItem: {
    padding: 16,
    marginBottom: 10,
    backgroundColor: '#1f0f35',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#615772',
    // Remove the flexDirection: 'row' from here as it's causing layout issues
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', // Ensure it takes full width
  },
  faqQuestion: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: colors.white,
    paddingHorizontal: 12, // Add padding on both sides
  },
  faqAnswer: {
    marginTop: 12,
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f0f35', // More subtle background
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#615772',
  },
  rankContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#9747FF', // Solid color for emphasis
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
  leaderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  leaderInfo: {
    flex: 1,
  },
  leaderName: {
    color: colors.white,
    fontWeight: '500',
    fontSize: 16,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  scoreText: {
    color: colors.white, // Solid color for emphasis
    fontWeight: '700',
    fontSize: 18,
  },
  pointsLabel: {
    color: '#aaa',
    fontSize: 12,
    marginLeft: 2,
  },
  rewardsSection: {
    marginBottom: 40,
  },
  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(151, 71, 255, 0.3)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  rewardIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(128, 90, 213, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  rewardInfo: {
    flex: 1,
  },
  rewardTitle: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
  },
  rewardDescription: {
    color: '#aaa',
    fontSize: 13,
  },
  rewardPoints: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  rewardPointsText: {
    color: '#9747FF', // Solid color for emphasis
    fontWeight: '700',
    fontSize: 18,
  },
  rewardPointsLabel: {
    color: '#aaa',
    fontSize: 12,
    marginLeft: 2,
  },
  ruleIcon: {
    marginLeft: 8, // Add some left margin
    marginRight: 12, // Keep the right margin
  },
});
