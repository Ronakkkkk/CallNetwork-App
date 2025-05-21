import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../../../config/color';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import Edit from '../../../assets/svg/Edit.svg';

const EditProfile = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [accountType, setAccountType] = useState('personal'); // 'personal' or 'professional'

  const navigation = useNavigation();

  const handleSave = () => {
    // Save profile data logic here
    // Then navigate back
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.header}>
          {/* <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Feather name="chevron-left" size={24} color={colors.white} />
          </TouchableOpacity> */}
          <View style={{flex: 1}} />
          <TouchableOpacity style={styles.settingButton}>
            <Feather name="settings" size={24} color={colors.purple} />
          </TouchableOpacity>
        </View>
        <View style={styles.profileImageSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={require('../../../assets/images/profile.png')}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editImageButton}>
              <Edit width={18} height={18} style={{}} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholderTextColor="#999"
                placeholder="Name here.."
              />
              {name && (
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={() => setName('')}>
                  <Feather name="x" size={16} color="#999" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholderTextColor="#999"
                placeholder="Mobile No."
                keyboardType="phone-pad"
              />
              {phone && (
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={() => setPhone('')}>
                  <Feather name="x" size={16} color="#999" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#999"
                placeholder="Email.."
                keyboardType="email-address"
              />
              {email && (
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={() => setEmail('')}>
                  <Feather name="x" size={16} color="#999" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.accountTypeContainer}>
            <TouchableOpacity
              style={[
                styles.accountTypeButton,
                accountType === 'personal' && styles.activeAccountType,
              ]}
              onPress={() => setAccountType('personal')}>
              <Text
                style={[
                  styles.accountTypeText,
                  accountType === 'personal' && styles.activeAccountTypeText,
                ]}>
                Personal
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.accountTypeButton,
                accountType === 'professional' && styles.activeAccountType,
              ]}
              onPress={() => setAccountType('professional')}>
              <Text
                style={[
                  styles.accountTypeText,
                  accountType === 'professional' &&
                    styles.activeAccountTypeText,
                ]}>
                Professional
              </Text>
            </TouchableOpacity>
          </View>

          {/* Add padding at bottom to ensure content isn't hidden behind the fixed button */}
          <View style={styles.bottomPadding} />
        </View>
      </ScrollView>

      {/* Fixed Save Button at bottom */}
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.8}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
  },
  profileImageSection: {
    alignItems: 'center',
    padding: 24,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.purple,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#785981',
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#390083',
    borderWidth: 1,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#645774',
    backgroundColor: '#22103a',
    borderRadius: 8,
  },
  bottomPadding: {
    height: 80, // Add padding to ensure content isn't hidden behind the fixed button
  },
  inputLabel: {
    color: colors.white,
    marginBottom: 8,
    fontWeight: '500',
    fontSize: 14,
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 12,
    color: colors.white,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearButton: {
    padding: 8,
    marginRight: 4,
  },
  sectionTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    marginTop: 8,
  },
  accountTypeContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    width: '80%',
    borderRadius: 8,
    padding: 4,
    borderWidth: 2,
    borderColor: '#645774',
    marginBottom: 20,
  },
  accountTypeButton: {
    flex: 1,
    paddingVertical: 4,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  accountTypeText: {
    color: '#ccc',
    fontWeight: '500',
  },
  activeAccountType: {
    backgroundColor: colors.purple,
  },
  activeAccountTypeText: {
    color: colors.white,
  },
  saveButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  saveButton: {
    backgroundColor: colors.purple,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
  settingButton: {
    padding: 12,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: '#301D45',
    borderWidth: 1,
  },
});
