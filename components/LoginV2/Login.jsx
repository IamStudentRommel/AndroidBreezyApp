import React, {useState, useEffect} from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import LoginSuccess from '../Home/LoginSuccess';
import RegistrationForm from './RegistrationForm';
import SignOptions from './SignOptions';
import AppConfig from '../../app.json';

const LoadingComponent = () => {
  return (
    <ImageBackground
      source={require('../../assets/IntroBackground.png')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Image
          source={require('../../assets/IntroLogo.png')}
          style={styles.logo}
        />
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>L O A D I N G . . .</Text>
      </View>
    </ImageBackground>
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
  const {be} = AppConfig;

  const validateUser = async (email, pwd) => {
    try {
      const response = await fetch(
        `${be}/api/validateuser?email=${email}&pwd=${pwd}`,
      );
      const data = await response.json();
      if (Object.keys(data).length > 1) {
        updateLogEmail(data.email);
        updateUsername(`${data.fname} ${data.lname}`);
        updateLogDisplay('Home');
        setFirebaseFname(data.fname);
        setFirebaseLname(data.lname);
        updateLogFlag(true);
        Alert.alert(`Welcome, ${data.fname} ${data.lname}`);
        setInputEmail('');
      } else {
        updateUsername(user);
        updateLogDisplay('Login');
        Alert.alert(`User not found`);
      }
    } catch (error) {
      updateUsername(user);
      updateLogDisplay('Login');
      console.error('Error fetching data: api/validateuser', error);
      Alert.alert('Error fetching data api/validateuser:', error);
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
                source={require('../../assets/LoginLogo.png')}
                style={styles.loginLogo}
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
                <Text style={styles.textLink}>Forgot Password?</Text>
              </TouchableOpacity>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, {backgroundColor: '#C20000'}]}
                  onPress={handleValidateUser}>
                  <Text style={styles.loginBtnTitle}>Log In</Text>
                </TouchableOpacity>
              </View>
                <SignOptions />
              <View style={styles.signUpContainer}>
                    <Text style={{color: '#9B9B9B'}}>Don't have an account?</Text>
                    <TouchableOpacity onPress={redirectReg}>
                      <Text style={styles.SignUpText}>Sign Up</Text>
                      <View style={styles.underline} />
                    </TouchableOpacity>
                  </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)', // Transparent black
    width: '100%',
    height: '100%',
  },

  logo: {
    resizeMode: 'contain',
  },
  
  loadingText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },

  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },

 
  inputContainer: {
    marginTop: '25%',
  },

  textInput: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingHorizontal: 20,
    marginBottom: 15,
    width: 300,
    color: '#101935',
    fontWeight: 'bold',
  },

  fpContainer: {
    width: '90%',
    alignItems: 'flex-end',
    marginBottom: 20,
    marginRight: 70,
  },

  textLink: {
    color: '#FFFFFF',
    fontSize: 15,
    textAlign: 'right',
    right: 10,
    width: '90%',
  },

  loginBtnTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  button: {
    borderRadius: 30,
    justifyContent: 'center',
    width: 300,
    height: 50,
  },

  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
  },

  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: '800',
  },

  SignUpText: {
    color: '#C20000',
    fontWeight: 'bold',
    marginLeft: 5,
  },

  underline: {
    height: 2,
    width: 50,
    backgroundColor: '#C20000',
    marginTop: 2,
    marginLeft: 5,
  },
});

export default Login;