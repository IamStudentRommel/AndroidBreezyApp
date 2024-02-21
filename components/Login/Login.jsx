import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Image,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {db, collection, getDocs, query, where} from '../../firebase/conf';
import LoginSuccess from './LoginSuccess';
import RegistrationForm from './RegistrationForm';

const Login = ({updateUsername, updateLogDisplay}) => {
  // console.log(typeof updateUsername); // Should output "function"

  const [inputEmail, setInputEmail] = useState('');
  const [inputPwd, setInputPwd] = useState('');
  const [user, setUser] = useState('Guest');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firebaseFname, setFirebaseFname] = useState('');
  const [firebaseLname, setFirebaseLname] = useState('');
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const validateUser = async (email, pwd) => {
    try {
      const q = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        if (userData.pwd === pwd) {
          updateUsername(`${userData.fname} ${userData.lname}`);
          updateLogDisplay('Home');
          setFirebaseFname(userData.fname);
          setFirebaseLname(userData.lname);
          setIsLoggedIn(true);
          Alert.alert(`Welcome, ${userData.fname} ${userData.lname}`);
        } else {
          updateUsername(user);
          updateLogDisplay('Login');
          Alert.alert(`User not found`);
        }
      } else {
        updateUsername(user);
        updateLogDisplay('Login');
        Alert.alert(`User not found`);
      }
    } catch (e) {
      console.error('Error validating user: ', e);
    }
  };

  const handleValidateUser = () => {
    // validateUser('qweqwe.xyz', 'abc');
    validateUser(inputEmail, inputPwd);
    // console.log(inputEmail, inputPwd);
  };

  const handleEmailChange = newText => {
    setInputEmail(newText);
  };
  const handlePwdChange = newText => {
    setInputPwd(newText);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    updateUsername(user);
    updateLogDisplay('Login');
    Alert.alert('You have successfully logout.');
  };

  const test = () => {
    Alert.alert('feature not yet implemented');
  };

  const redirectReg = () => {
    updateLogDisplay('');
    setShowRegistrationForm(true);
  };

  if (isLoggedIn) {
    return (
      <LoginSuccess
        firebaseFname={firebaseFname}
        firebaseLname={firebaseLname}
        handleLogout={handleLogout}
      />
    );
  }
  if (showRegistrationForm) {
    return (
      <RegistrationForm
        setShowRegistrationForm={setShowRegistrationForm}
        updateLogDisplay={updateLogDisplay}
      />
    );
    // Show RegistrationForm component if showRegistrationForm state is true
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.appName}>CrimeH8rs</Text>
          {/* <Text style={styles.subAppName}>"All is Well"</Text> */}
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            onChangeText={handleEmailChange}
          />
          <TextInput
            placeholder="Password"
            style={styles.textInput}
            secureTextEntry
            onChangeText={handlePwdChange}
          />
          <Text style={styles.textLink} onPress={test}>
            Forgot Password?
          </Text>
          <View style={styles.btnContainer}>
            <Button title="Login" onPress={handleValidateUser} />
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.textLink} onPress={redirectReg}>
              Signup
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  logo: {
    width: 300,
    height: 240,
  },
  appName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 40,
  },
  subAppName: {
    fontSize: 10,
    fontSize: 15,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
  },
  btnContainer: {
    backgroundColor: '#0000b3',
  },
  textLink: {
    color: '#000099',
    fontSize: 15,
    textAlign: 'center',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#FF5733',
    padding: 10,
    borderRadius: 5,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
