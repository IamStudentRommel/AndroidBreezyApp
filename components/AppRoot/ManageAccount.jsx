import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import EditName from './EditName';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';

const ManageAccount = ({route}) => {
  const navigation = useNavigation();
  const [showEditName, setShowEditName] = useState(false);
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  if (showEditName) {
    return <EditName setShowEditName={setShowEditName} />;
  }

  if (showChangeEmail) {
    return <ChangeEmail setShowChangeEmail={setShowChangeEmail} />;
  }

  if (showChangePassword) {
    return <ChangePassword setShowChangePassword={setShowChangePassword} />;
  }

  const editName = () => {
    // updateLogDisplay('');
    setShowEditName(true);
  };

  const changeEmail = () => {
    // updateLogDisplay('');
    setShowChangeEmail(true);
  };

  const changePassword = () => {
    // updateLogDisplay('');
    setShowChangePassword(true);
  };

  const handleDeleteAccount = () => {
    // Show confirmation alert before deleting account
    Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete your account?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Delete', onPress: () => confirmDelete()},
      ],
      {cancelable: false},
    );
  };

  const confirmDelete = () => {
    // Perform actual delete logic here
    console.log('Deleting account...');
    // Navigate to logout or home screen after deleting account
    navigation.navigate('Login'); // Replace with appropriate screen
  };

  const generateInitials = name => {
    if (!name) return '';
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('');
  };

  // Example user data (replace with actual data or state)
  console.log(route.params[0]);
  const z = 'John Doe'; // Replace with actual username or fetch from state

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
          <View style={styles.avatar}>
            <View style={styles.logo}>
              <Text style={styles.initial}>
                {generateInitials(route.params[0])}
              </Text>
            </View>
          </View>
          <View style={styles.manage}>
            <TouchableOpacity style={styles.manageName} onPress={editName}>
              <Image
                source={require('../../assets/Managename.png')}
                style={styles.icon}
              />
              <Text style={styles.text}>Name</Text>
              <Image
                source={require('../../assets/Proceed.png')}
                style={styles.proceed}
              />
            </TouchableOpacity>
            <View style={styles.line}></View>

            <TouchableOpacity style={styles.manageEmail} onPress={changeEmail}>
              <View style={styles.manageEmail}>
                <Image
                  source={require('../../assets/Manageemail.png')}
                  style={styles.icon}
                />
                <Text style={styles.text}>Email</Text>
                <Image
                  source={require('../../assets/Proceed.png')}
                  style={{left: 220, width: 15, height: 15, marginTop: 35}}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.line}></View>

            <TouchableOpacity
              style={styles.managePassword}
              onPress={changePassword}>
              <View style={styles.managePassword}>
                <Image
                  source={require('../../assets/Managepassword.png')}
                  style={styles.icon}
                />
                <Text style={styles.text}>Password</Text>
                <Image
                  source={require('../../assets/Proceed.png')}
                  style={{left: 180, width: 15, height: 15, marginTop: 35}}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.line}></View>
          </View>

          <View style={styles.delete}>
            <TouchableOpacity
              style={styles.delete}
              onPress={handleDeleteAccount}>
              <Text style={styles.textDelete}>Delete Account</Text>
              <View style={styles.underline}></View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 15,
    backgroundColor: '#1E1E1E',
  },
  avatar: {
    alignItems: 'center',
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center', // Center vertically as well
    backgroundColor: '#ffffff',
    borderRadius: 60,
    marginBottom: 60,
    marginTop: 20,
    width: 100,
    height: 100,
  },

  initial: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: '#000000',
  },

  icon: {
    width: 20,
    height: 20,
    marginRight: 11,
    marginTop: 33,
  },
  manageName: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginLeft: 10,
  },
  manageEmail: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginLeft: 5,
  },
  managePassword: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginLeft: 5,
  },
  text: {
    marginTop: 35,
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '600',
  },
  proceed: {
    left: 215,
    width: 15,
    height: 15,
    marginTop: 35,
  },
  line: {
    marginTop: 15,
    height: 2,
    backgroundColor: '#FFFFFF',
  },

  delete: {
    marginTop: '30%',
    alignItems: 'center',
  },
  textDelete: {
    color: '#FF0000',
    fontSize: 20,
    fontWeight: '600',
  },
  underline: {
    height: 2, // Height of the underline
    width: 138,
    backgroundColor: '#C20000', // Color of the underline
    marginTop: 2,
  },
});

export default ManageAccount;
