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
        backgroundColor: '#00001a',
      }}>
      <Image
        source={require('../../assets/crimehate.png')}
        style={{
          width: '80%',
          height: '80%',
          resizeMode: 'contain',
          backgroundColor: '#00001a',
        }}
      />
      <ActivityIndicator size="large" color="#ffffff" />
      <Text style={{color: '#ffffff', marginTop: 10}}>Loading...</Text>
    </View>
  );
};

const Login = ({updateUsername, updateLogDisplay}) => {
  // console.log(typeof updateUsername); // Should output "function"
  const [isLoading, setIsLoading] = useState(true);

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
                source={require('../../assets/crimehate.png')}
                style={styles.logo}
              />

              <TextInput
                placeholder="Email"
                placeholderTextColor={'#ffffff'}
                style={styles.textInput}
                onChangeText={handleEmailChange}
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor={'#ffffff'}
                style={styles.textInput}
                secureTextEntry
                onChangeText={handlePwdChange}
              />
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={handleValidateUser}>
                <View style={styles.loginBtnContent}>
                  <Text style={styles.loginBtnTitle}>LOGIN</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.textLink} onPress={test}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.textLink} onPress={redirectReg}>
                  Signup
                </Text>
              </TouchableOpacity>
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
    backgroundColor: '#00001a',
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  logo: {
    width: '100%',
    height: '50%',
    marginTop: -50,
  },

  textInput: {
    height: 40,
    borderColor: '#ffffff',
    borderBottomWidth: 1,
    color: '#ffffff',
  },
  loginBtnTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  loginBtn: {
    backgroundColor: 'blue',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '100%',
    alignSelf: 'center',
  },
  loginBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLink: {
    color: '#3333ff',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default Login;
