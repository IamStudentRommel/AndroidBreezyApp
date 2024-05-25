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
import LoginSuccess from '../Home/LoginSuccess';
import RegistrationForm from './RegistrationForm';
import SignOptions from './SignOptions';
import AppConfig from '../../app.json';

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
        source={require('../../assets/LogoCapstone1.png')}
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
                source={require('../../assets/Group136.png')}
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
              
              <View style={styles.passwordContainer}>
                <TouchableOpacity style={styles.checkBox}>
                </TouchableOpacity>
              <Text style={styles.option}>Remember me</Text>
              <TouchableOpacity onPress={test} style={styles.fpContainer}>
                <Text style={styles.textLink}>Forgot Password?</Text>
              </TouchableOpacity>
              </View>



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

              {/* <Image source={require('../../assets/Group136.png')} style={styles.topRightImage} /> */}
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
    backgroundColor: '#1E1E1E',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  logo: {
    position: 'absolute',
    top: 1, // Adjust as needed
    right: 1, // Adjust as needed
    height: 290,
    width: 320,
    
  },
  inputContainer: {
    paddingTop: 280,
  },
  

 

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '50%', // Adjust as needed
    marginRight: 30
  },
  textLink: {
    color: '#FFFFFF',
    fontSize: 13,
    marginRight: 25,
    
  },
  option: {
    color: '#FFFFFF',
    fontSize: 13,
    paddingBottom: 18,
    marginLeft: 10,
  },

  
  signUpContainer: {
    flexDirection: 'row', // Ensure text and button are in a row
    alignItems: 'center', // Align items vertically in the center
    fontWeight: '800',
  },
  SignUpText: {
    color: '#C20000',
    fontWeight: 'bold', // Make the text bold to differentiate as a button
    marginLeft: 5, // Adjust margin as needed
  },
  underline: {
    height: 2, // Height of the underline
    width: 50,
    backgroundColor: '#C20000', // Color of the underline
    marginTop: 2,
    marginLeft: 5, // Space between the text and underline
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
    marginBottom: 18,
    marginRight: 70,
  },


  loginBtnTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  button: {
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    width: 300,
    height: 50,
  },

  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
});

export default Login;
