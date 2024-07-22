import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

const ChangePassword = ({setShowChangePassword}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = () => {
    if (newPassword === confirmPassword) {
      // Handle save logic here
      console.log('Password changed:', currentPassword, newPassword);
      // Optionally navigate back or to another screen
      navigation.goBack();
    } else {
      alert('New password and confirm password do not match');
    }
  };

  const handleBack = () => {
    console.log('back');
    setShowChangePassword(false);
  };

  const isButtonDisabled =
    currentPassword.trim() === '' ||
    newPassword.trim() === '' ||
    confirmPassword.trim() === '' ||
    newPassword !== confirmPassword;

  // Debugging console logs
  console.log('currentPassword:', currentPassword);
  console.log('newPassword:', newPassword);
  console.log('confirmPassword:', confirmPassword);
  console.log('isButtonDisabled:', isButtonDisabled);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack}>
            <Image
              source={require('../../assets/Backbutton.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Change Password</Text>
        </View>
        <View style={styles.editContainer}>
          <Text style={styles.label}>Current Password</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Current Password"
            placeholderTextColor="#9E9E9E"
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
          <Text style={[styles.label, {marginTop: 10}]}>New Password</Text>
          <TextInput
            style={styles.textInput}
            placeholder="New Password"
            placeholderTextColor="#9E9E9E"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <Text style={[styles.label, {marginTop: 10}]}>Confirm Password</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Confirm Password"
            placeholderTextColor="#9E9E9E"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleSave}
            style={[
              styles.buttonSave,
              isButtonDisabled && styles.buttonDisabled,
            ]}
            disabled={isButtonDisabled}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#1E1E1E',
  },
  scrollViewContainer: {
    flexGrow: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 13,
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
  },
  icon: {
    width: 25,
    height: 25,
    right: 10,
    marginTop: 1,
  },
  editContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  label: {
    color: '#ffffff',
    fontSize: 19,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginLeft: 33,
  },
  textInput: {
    height: 40,
    borderColor: '#FFFFFF',
    borderBottomWidth: 1,
    color: '#FFFFFF',
    marginBottom: 10,
    width: 310,
    paddingHorizontal: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 40,
    paddingHorizontal: 25,
  },
  buttonSave: {
    flex: 1,
    backgroundColor: '#C20000',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#555555',
  },
  buttonText: {
    fontSize: 16, // Adjust the font size
    fontWeight: '600', // Make the text bold
    color: '#FFFFFF', // Text color
  },
});

export default ChangePassword;
