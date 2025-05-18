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
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation/types';

const Profile = () => {
  const [totalCoins, setCoins] = useState(2000);
  const [phonenumber, setPhoneNumber] = useState(983737373);
  const [totalcontact, setTotalcontact] = useState(500);
  const [spamdetected, setSpamDetected] = useState(80);
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
            <Octicons name="verified" size={16} color={colors.purple} />
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
            <Entypo name="edit" size={18} color={colors.purple} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Connect Wallet Button */}
      <TouchableOpacity style={styles.connectButton}>
        <FontAwesome6 name="wallet" size={16} color={colors.white} />
        <Text style={styles.connectButtonText}>Connect Wallet</Text>
      </TouchableOpacity>

      {/* Points Section */}
      <View style={styles.pointsSection}>
        <Text style={styles.sectionTitle}>Contact Points</Text>

        {/* Coin with Points Display */}
        <View style={styles.coinContainer}>
          <Coin width={80} height={80} />
          <View style={styles.pointsDetails}>
            <Text style={styles.coinText}>
              <Text style={styles.currentPoints}>500</Text>
              <Text style={styles.totalPoints}>/{totalCoins}</Text>
            </Text>

            {/* Progress Bar with Milestones */}
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {width: `${(500 / totalCoins) * 100}%`},
                  ]}
                />
              </View>

              {/* Milestone Markers */}
              <View style={styles.milestonesContainer}>
                <View style={styles.milestoneWrapper}>
                  <View
                    style={[
                      styles.milestone,
                      500 <= 500 && styles.milestonePassed,
                    ]}
                  />
                  <Text style={styles.milestoneLabel}>500</Text>
                </View>

                <View style={styles.milestoneWrapper}>
                  <View
                    style={[
                      styles.milestone,
                      500 >= 1000 && styles.milestonePassed,
                    ]}
                  />
                  <Text style={styles.milestoneLabel}>1000</Text>
                </View>

                <View style={styles.milestoneWrapper}>
                  <View
                    style={[
                      styles.milestone,
                      500 >= 1500 && styles.milestonePassed,
                    ]}
                  />
                  <Text style={styles.milestoneLabel}>1500</Text>
                </View>

                <View style={styles.milestoneWrapper}>
                  <View
                    style={[
                      styles.milestone,
                      500 >= 2000 && styles.milestonePassed,
                    ]}
                  />
                  <Text style={styles.milestoneLabel}>2000</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Stats Cards - Vertical Layout */}
      <View style={styles.statsContainer}>
        {/* Call Points Card */}
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Feather name="phone-call" size={24} color={colors.purple} />
          </View>
          <View style={styles.statContent}>
            <Text style={styles.statLabel}>Call Points</Text>
            <Text style={styles.statValue}>25</Text>
          </View>
        </View>

        {/* Total Contacts Card */}
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Feather name="users" size={24} color={colors.purple} />
          </View>
          <View style={styles.statContent}>
            <Text style={styles.statLabel}>Total Contacts</Text>
            <Text style={styles.statValue}>{totalcontact}</Text>
          </View>
        </View>

        {/* Spam Detected Card */}
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Feather name="alert-triangle" size={24} color={colors.purple} />
          </View>
          <View style={styles.statContent}>
            <Text style={styles.statLabel}>Spam Detected</Text>
            <Text style={styles.statValue}>{spamdetected}</Text>
          </View>
        </View>
      </View>

      {/* Referral Section */}
      <View style={styles.referralContainer}>
        <View style={styles.referralHeader}>
          <Text style={styles.referralTitle}>Refer your friend & earn</Text>
          <Text style={styles.referralPoints}>100 points</Text>
        </View>

        {/* Referral Link */}
        <View style={styles.linkBox}>
          <Text style={styles.linkText}>{link}</Text>
          <TouchableOpacity style={styles.copyButton}>
            <Feather name="copy" size={16} color={colors.purple} />
            <Text style={styles.copyText}>Copy</Text>
          </TouchableOpacity>
        </View>

        {/* Share Button */}
        <TouchableOpacity style={styles.shareButton}>
          <Feather name="share-2" size={18} color="white" />
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
    backgroundColor: colors.black,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  settingButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  profileImageWrapper: {
    padding: 3,
    borderRadius: 53,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.purple,
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
    marginBottom: 8,
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
    color: '#aaa',
    marginBottom: 16,
  },
  accountTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  tagContainer: {
    backgroundColor: colors.purple,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginRight: 12,
    opacity: 0.3,
  },
  tagText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  editButton: {
    backgroundColor: 'rgba(151, 71, 255, 0.2)',
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
    color: colors.white,
    marginBottom: 16,
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(151, 71, 255, 0.2)',
    borderRadius: 16,
    padding: 20,
  },
  pointsDetails: {
    flex: 1,
    marginLeft: 16,
  },
  coinText: {
    marginBottom: 12,
  },
  currentPoints: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
  },
  totalPoints: {
    fontSize: 18,
    fontWeight: '500',
    color: '#aaa',
  },
  progressBarContainer: {
    marginTop: 6,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.purple,
    borderRadius: 4,
  },
  milestonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 2,
  },
  milestoneWrapper: {
    alignItems: 'center',
  },
  milestone: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 4,
  },
  milestonePassed: {
    backgroundColor: colors.purple,
  },
  milestoneLabel: {
    fontSize: 10,
    color: '#aaa',
  },
  statsContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
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
  },
  statLabel: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 4,
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
  },
  referralHeader: {
    marginBottom: 16,
  },
  referralTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  referralPoints: {
    color: colors.purple,
    fontSize: 22,
    fontWeight: '700',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  linkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  linkText: {
    flex: 1,
    color: colors.white,
    fontSize: 14,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(151, 71, 255, 0.2)',
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
