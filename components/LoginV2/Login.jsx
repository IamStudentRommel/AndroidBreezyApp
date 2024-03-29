import React, {useState, useEffect} from 'react';
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
  ActivityIndicator,
} from 'react-native';
// import 'expo-dev-client';
import {db, collection, getDocs, query, where} from '../../firebase/conf';
import LoginSuccess from '../Home/LoginSuccess';
import RegistrationForm from './RegistrationForm';
import SignOptions from './SignOptions';

const LoadingComponent = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2FDFF',
      }}>
      <Image
        source={require('../../assets/crimehate3.png')}
        style={{
          width: '70%',
          height: '70%',
          resizeMode: 'contain',
          backgroundColor: '#F2FDFF',
        }}
      />
      <ActivityIndicator size="large" color="#ffffff" />
      <Text style={{color: '#101935', marginTop: 10}}>Loading...</Text>
    </View>
  );
};

const Login = ({
  updateLogEmail,
  updateUsername,
  updateLogDisplay,
  updateLogFlag,
  isLoggedIn,
}) => {
  // console.log(typeof updateUsername); // Should output "function"
  const [isLoading, setIsLoading] = useState(true);

  const [inputEmail, setInputEmail] = useState('');
  const [inputPwd, setInputPwd] = useState('');
  const [user, setUser] = useState('Guest');
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
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
          // console.log(userData.email);
          updateLogEmail(userData.email);
          updateUsername(`${userData.fname} ${userData.lname}`);
          updateLogDisplay('Home');
          setFirebaseFname(userData.fname);
          setFirebaseLname(userData.lname);
          updateLogFlag(true);
          Alert.alert(`Welcome, ${userData.fname} ${userData.lname}`);
          setInputEmail('');
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
    // validateUser('asshole', 'freak');
    validateUser(inputEmail, inputPwd);
    // console.log(inputEmail, inputPwd);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleEmailChange = newText => {
    setInputEmail(newText);
  };
  const handlePwdChange = newText => {
    setInputPwd(newText);
  };

  const handleLogout = () => {
    updateLogFlag(false);
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

  // console.log(isLoggedIn);
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
  }

  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <Image
                source={require('../../assets/crimehate3.png')}
                style={styles.logo}
              />
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor={'#101935'}
                  style={styles.textInput}
                  onChangeText={handleEmailChange}
                />
                <TextInput
                  placeholder="Password"
                  placeholderTextColor={'#101935'}
                  style={styles.textInput}
                  secureTextEntry
                  onChangeText={handlePwdChange}
                />
              </View>
              <TouchableOpacity onPress={test} style={styles.fpContainer}>
                <Text style={styles.textLink}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, {backgroundColor: '#101935'}]}
                  onPress={handleValidateUser}>
                  <Text style={styles.loginBtnTitle}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, {backgroundColor: 'gray'}]}
                  onPress={redirectReg}>
                  <Text style={styles.loginBtnTitle}>Create Account</Text>
                </TouchableOpacity>
              </View>
              <SignOptions />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2fdff',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 200,
    height: 98,
    marginBottom: 50,
  },

  inputContainer: {
    marginBottom: 20,
  },

  textInput: {
    height: 40,
    borderColor: '#101935',
    borderBottomWidth: 1,
    color: '#101935',
    marginBottom: 10,
    width: 300,
    paddingHorizontal: 10,
  },

  fpContainer: {
    width: '90%',
    alignItems: 'flex-end',
    marginBottom: 20,
    marginRight: 70,
  },

  textLink: {
    color: '#564787',
    fontSize: 15,
    textAlign: 'right',
    marginBottom: 10,
    width: '90%',
  },

  loginBtnTitle: {
    color: '#f2fdff',
    fontSize: 15,
    alignSelf: 'center',
  },
  
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    width: 300,
  },
  
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
  },

  
});

export default Login;
