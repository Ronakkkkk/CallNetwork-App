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

const EditProfile = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [phone, setPhone] = useState('983737373');
  const [accountType, setAccountType] = useState('personal'); // 'personal' or 'professional'

  const navigation = useNavigation();

  const handleSave = () => {
    // Save profile data logic here
    // Then navigate back
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{width: 24}} />
      </View>

      <View style={styles.profileImageSection}>
        <View style={styles.profileImageContainer}>
          <Image
            source={require('../../../assets/images/profile.png')}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editImageButton}>
            <Feather name="camera" size={16} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholderTextColor="#999"
            placeholder="Enter your name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#999"
            placeholder="Enter your email"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholderTextColor="#999"
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />
        </View>

        <Text style={styles.sectionTitle}>Account Type</Text>
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
                accountType === 'professional' && styles.activeAccountTypeText,
              ]}>
              Professional
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditProfile;

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
    backgroundColor: colors.purple,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    color: colors.white,
    marginBottom: 8,
    fontWeight: '500',
    fontSize: 14,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    color: colors.white,
    fontSize: 16,
  },
  sectionTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    marginTop: 8,
  },
  accountTypeContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  accountTypeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 12,
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
  saveButton: {
    backgroundColor: colors.purple,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  saveButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
});
