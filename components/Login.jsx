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
import {db, collection, addDoc, getDocs, query, where} from '../firebase/conf';

const Login = ({updateUsername}) => {
  // console.log(typeof updateUsername); // Should output "function"

  const [inputEmail, setInputEmail] = useState('');
  const [inputPwd, setInputPwd] = useState('');

  const test = () => {
    Alert.alert('feature not yet implemented');
  };

  const validateUser = async (email, pwd) => {
    try {
      const q = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        if (userData.pwd === pwd) {
          updateUsername(`${userData.fname} ${userData.lname}`);
          alert(`Welcome, ${userData.fname} ${userData.lname}`);
        } else {
          updateUsername(`Guest`);
          alert(`User not found`);
        }
      } else {
        updateUsername(`Guest`);
        alert(`User not found`);
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
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
            <Text style={styles.textLink} onPress={test}>
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
});

export default Login;

// OtherComponent.js
// import React from 'react';
// import { Button } from 'react-native';

// const OtherComponent = ({ updateUsername }) => {
//   const handleUpdateUsername = () => {
//     updateUsername('New Username');
//   };

//   return (
//     <Button title="Update Username" onPress={handleUpdateUsername} />
//   );
// };

// export default OtherComponent;
