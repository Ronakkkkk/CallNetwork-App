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
      question: 'How do I earn points by importing contacts?',
      answer:
        'You earn 5 points for each new contact you import to the platform. This helps grow our community and improve caller identification.',
    },
    {
      question: 'How many points do I get for detecting spam?',
      answer:
        'You earn 10 points each time you report a number as spam that gets verified by our system or by other users.',
    },
    {
      question: 'What are points for verifying contacts?',
      answer:
        'You earn 2 points for each contact you verify as legitimate. This helps improve the accuracy of our database.',
    },

  ];

  // Dummy leaderboard data
  const leaderboardData = [
    {
      id: 1,
      name: 'Alex Morgan',
      score: 950,
      image: require('../../../assets/images/profile.png'),
    },
    {
      id: 2,
      name: 'Sarah Kim',
      score: 820,
      image: require('../../../assets/images/profile.png'),
    },
    {
      id: 3,
      name: 'John Doe',
      score: 780,
      image: require('../../../assets/images/profile.png'),
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
        <View style={{width: 24}} />
      </View>

      {/* User Points Summary */}
      <View style={styles.userPointsCard}>
        <View style={styles.userInfo}>
          <Image
            source={require('../../../assets/images/profile.png')}
            style={styles.userAvatar}
          />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>John Doe</Text>
            <View style={styles.pointsContainer}>
              <Feather name="award" size={16} color={colors.purple} />
              <Text style={styles.pointsText}>200 Call Points</Text>
            </View>
          </View>
        </View>
      </View>

      {/* History Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>History</Text>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>100</Text>
            <Text style={styles.statLabel}>Contacts Imported</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>30</Text>
            <Text style={styles.statLabel}>Spam Detected</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>10</Text>
            <Text style={styles.statLabel}>Contacts Verified</Text>
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
            <View style={styles.rankContainer}>
              <Text style={styles.rankText}>{index + 1}</Text>
            </View>

            <Image source={user.image} style={styles.leaderAvatar} />

            <View style={styles.leaderInfo}>
              <Text style={styles.leaderName}>{user.name}</Text>
            </View>

            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>{user.score}</Text>
              <Text style={styles.pointsLabel}>pts</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Available Rewards Section */}
      <View style={[styles.section, styles.rewardsSection]}>
        <Text style={styles.sectionTitle}>Available Rewards</Text>

        <View style={styles.rewardCard}>
          <View style={styles.rewardIconContainer}>
            <Feather name="gift" size={24} color={colors.purple} />
          </View>
          <View style={styles.rewardInfo}>
            <Text style={styles.rewardTitle}>Premium Features</Text>
            <Text style={styles.rewardDescription}>
              Unlock advanced caller ID features
            </Text>
          </View>
          <View style={styles.rewardPoints}>
            <Text style={styles.rewardPointsText}>500</Text>
            <Text style={styles.rewardPointsLabel}>pts</Text>
          </View>
        </View>

        <View style={styles.rewardCard}>
          <View style={styles.rewardIconContainer}>
            <Feather name="dollar-sign" size={24} color={colors.purple} />
          </View>
          <View style={styles.rewardInfo}>
            <Text style={styles.rewardTitle}>Token Rewards</Text>
            <Text style={styles.rewardDescription}>
              Convert points to crypto tokens
            </Text>
          </View>
          <View style={styles.rewardPoints}>
            <Text style={styles.rewardPointsText}>1000</Text>
            <Text style={styles.rewardPointsLabel}>pts</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Rewards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 4,
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
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(151, 71, 255, 0.3)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'center',
  },
  faqItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // More subtle background
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
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // More subtle background
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
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
    color: '#9747FF', // Solid color for emphasis
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
});
