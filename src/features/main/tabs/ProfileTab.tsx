import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../../../config/color';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Coin from '../../../assets/svg/coin.svg';
import Circle from '../../../assets/svg/circle.svg';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation/types';
import Lock from '../../../assets/svg/Lock.svg';
import Edit from '../../../assets/svg/Edit.svg';
import Progressbar from '../../../Components/Progressbar';
const Profile = () => {
  const [totalCoins, setCoins] = useState(2000);
  const [phonenumber, setPhoneNumber] = useState(983737373);
  const [totalcontact, setTotalcontact] = useState(100);
  const [spamdetected, setSpamDetected] = useState(86);
  const [link, setLink] = useState('callnwtk/refera-friend/xyz');

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onEdit = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with Settings */}
      <View style={styles.header}>
        <View style={{flex: 1}} />
        <TouchableOpacity style={styles.settingButton}>
          <Feather name="settings" size={24} color={colors.purple} />
        </TouchableOpacity>
      </View>

      {/* Profile Info Section */}
      <View style={styles.profileSection}>
        {/* Profile Image with Border */}
        <View style={styles.profileImageWrapper}>
          <View style={styles.profileImageContainer}>
            <Image
              source={require('../../../assets/images/profile.png')}
              style={styles.profileImage}
            />
          </View>
        </View>

        {/* Name and Verification */}
        <View style={styles.nameContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>Welcome Kash !</Text>
            <Octicons name="verified" size={16} color={'#9747FF'} />
          </View>
        </View>

        {/* Phone Number */}
        <Text style={styles.phoneNumber}>{phonenumber}</Text>

        {/* Account Type and Edit Button */}
        <View style={styles.accountTypeContainer}>
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>Personal</Text>
          </View>
          <TouchableOpacity onPress={onEdit} style={styles.editButton}>
            <Edit width={18} height={18} />
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

      {/* Connect Wallet Button */}
      <TouchableOpacity style={styles.connectButton}>
        <FontAwesome6 name="wallet" size={16} color={colors.white} />
        <Text style={styles.connectButtonText}>Connect Wallet</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        {Array(30)
          .fill(0)
          .map((_, index) => (
            <View key={index} style={styles.dashItem} />
          ))}
      </View>

      {/* Points Section */}
      <View style={styles.pointsSection}>
        <Text style={styles.sectionTitle}>Contact Points</Text>

        {/* Coin with Points Display */}
        <View style={styles.coinContainer}>
          <View style={styles.pointsDetails}>
            <Coin width={80} height={80} />
            <Text style={styles.coinText}>
              <Text style={styles.currentPoints}>500</Text>
              <Text style={styles.slashpoints}>/</Text>
              <Text style={styles.totalPoints}>{totalCoins}</Text>
            </Text>

            {/* Progress Bar with Milestones */}
          </View>
          <Progressbar currentPoints={500} maxPoints={2000} />{' '}
        </View>
      </View>

      <View style={styles.dividerContainer}>
        {Array(30)
          .fill(0)
          .map((_, index) => (
            <View key={index} style={styles.dashItem} />
          ))}
      </View>
      {/* Stats Cards - Vertical Layout */}
      <View style={styles.statsContainer}>
        {/* Call Points Card */}
        {/* <View style={styles.statCard}> */}
        <View style={styles.statContent}>
          <Text style={styles.statLabel}>Call Points</Text>
          <Text style={styles.statValue}>25</Text>
        </View>
        {/* </View> */}

        {/* Total Contacts Card */}
        {/* <View style={styles.statCard}> */}
        <View style={styles.statContent}>
          <Text style={styles.statLabel}>Total Contacts</Text>
          <Text style={styles.statValue}>{totalcontact}</Text>
        </View>
        {/* </View> */}

        {/* Spam Detected Card */}
        {/* <View style={styles.statCard}> */}
        <View style={styles.statContent}>
          <Text style={styles.statLabel}>Spam Detected</Text>
          <Text style={styles.statValue}>{spamdetected}</Text>
        </View>
        {/* </View> */}
      </View>
      <View style={styles.dividerContainer}>
        {Array(30)
          .fill(0)
          .map((_, index) => (
            <View key={index} style={styles.dashItem} />
          ))}
      </View>
      {/* Referral Section */}

      <View style={styles.referralHeader}>
        <Text style={styles.referralTitle}>Refer your friend & earn</Text>
        <Text style={styles.referralPoints}>100 points</Text>
      </View>
      <View style={styles.referralContainer}>
        {/* Referral Link */}
        <View style={styles.linkBox}>
          <Text style={styles.linkText}>{link}</Text>
          <TouchableOpacity style={styles.copyButton}>
            <Feather name="copy" size={16} color={colors.white} />
          </TouchableOpacity>
        </View>

        {/* Share Button */}
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareText}>Share</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 16,
  },
  dashItem: {
    width: 6,
    height: 1.5,
    backgroundColor: '#241c2e',
    marginHorizontal: 3,
  },
  settingButton: {
    padding: 12,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: '#301D45',
    borderWidth: 1, // Add this line
  },
  profileSection: {
    alignItems: 'center',
  },
  profileImageWrapper: {
    // padding: ,
    borderRadius: 53,
    marginBottom: 16,
    borderWidth: 2.5,
    borderColor: '#B983FF',
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  nameContainer: {
    alignItems: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.white,
    marginRight: 8,
  },
  phoneNumber: {
    fontSize: 16,
    marginBottom: 16,
    color: '#6f6a74',
  },
  accountTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  tagContainer: {
    backgroundColor: '#291347',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginRight: 12,
  },
  tagText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  editButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',

    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: '#301D45',
    borderWidth: 1, // Add this line
  },
  connectButton: {
    flexDirection: 'row',
    backgroundColor: colors.purple,
    borderRadius: 10,
    paddingVertical: 14,
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  connectButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  pointsSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#514a5b',
    marginBottom: 16,
    alignSelf: 'center',
  },
  coinContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(151, 71, 255, 0.15)',
    borderRadius: 16,
    padding: 24,
    borderColor: '#645774',
    borderWidth: 2,
    shadowColor: '#9747FF',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 8,
  },
  pointsDetails: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // Changed from center to flex-start
  },
  coinText: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginLeft: 12, // Positive margin for spacing between coin and text
  },
  currentPoints: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.white,
    marginRight: 4,
  },
  slashpoints: {
    fontSize: 38,
    fontWeight: '700',
    color: colors.white,
    marginRight: 4,
  },
  totalPoints: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.white,
    marginRight: 4,
  },
  progressBarContainer: {
    width: '100%',
    marginTop: 16,
    marginBottom: 10,
  },
  progressBar: {
    height: 8, // Make the bar thinner for a more professional look
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 4,
    overflow: 'visible',
    marginBottom: 40, // More space for icons below
    position: 'relative',
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'red',
    borderRadius: 4,
    shadowColor: 'red',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 8,
  },
  milestonesContainer: {
    position: 'absolute',
    top: 20, // Position markers below the bar
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', // Align to top
    width: '100%',
    paddingHorizontal: 0,
  },
  milestoneWrapper: {
    alignItems: 'center',
    position: 'relative',
    top: -10, // Adjust vertical position
  },
  iconBackground: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(151, 71, 255, 0.2)',
    borderColor: '#645774',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  milestone: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  milestonePassed: {
    backgroundColor: colors.purple,
  },
  milestoneLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 4, // More space between icon and label
  },
  statsContainer: {
    paddingHorizontal: 16,
    marginBottom: 16, // Reduced from 24
    padding: 16,
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(151, 71, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  statContent: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginBottom: 8, // Space between rows
  },
  statLabel: {
    fontSize: 15,
    color: colors.white,
    marginBottom: 4,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
  },
  referralContainer: {
    margin: 16,
    backgroundColor: 'rgba(151, 71, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    borderColor: '#645774',
    borderWidth: 2,
  },
  referralHeader: {
    marginBottom: 8,
    paddingHorizontal: 12, // Add horizontal padding
  },
  referralTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    padding: 0,
  },
  referralPoints: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '700',
    flexDirection: 'row',

    padding: 0,
  },
  linkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,

    backgroundColor: 'rgba(151, 71, 255, 0.2)',
    borderColor: '#645774',
    borderWidth: 2,
  },
  linkText: {
    flex: 1,
    color: colors.white,
    fontSize: 14,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  copyText: {
    marginLeft: 6,
    color: colors.purple,
    fontWeight: '500',
  },
  shareButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.purple,
    borderRadius: 8,
    paddingVertical: 14,
  },
  shareText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
});
