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
import {db, collection, getDocs, query, where} from '../../firebase/conf';
import LoginSuccess from './LoginSuccess';
import RegistrationForm from './RegistrationForm';
import {FontAwesome5} from '@expo/vector-icons';

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
              {/* <Text style={styles.appName}>CrimeH8rs</Text> */}
              {/* <Text style={styles.subAppName}>"All is Well"</Text> */}
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

              <View style={styles.btnContainer}>
                <Button
                  title="Login"
                  onPress={handleValidateUser}
                  color="blue"
                />
              </View>
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
              <View style={styles.signInContainer}>
                <View style={styles.line}></View>
                <Text style={styles.signInText}>Or connect with</Text>
                <View style={styles.line}></View>

                <View style={styles.signInOptions}>
                  <TouchableOpacity style={styles.signInButton}>
                    <Image
                      source={require('../../assets/crimehate.png')}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.signInButton}>
                    <Image
                      source={require('../../assets/crimehate.png')}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.signInButton}>
                    <Image
                      source={require('../../assets/crimehate.png')}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
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
  appName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 40,
    color: '#ffffff',
  },
  subAppName: {
    fontSize: 10,
    fontSize: 15,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  textInput: {
    height: 40,
    borderColor: '#ffffff',
    borderBottomWidth: 1,
    color: '#ffffff',
  },
  // btnContainer: {
  //   backgroundColor: '#3333ff',
  // },
  textLink: {
    color: '#3333ff',
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
  signInContainer: {
    padding: 5,
  },
  signInText: {
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  signInOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  signInButton: {
    marginVertical: 10,
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default Login;
