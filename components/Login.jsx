import React from 'react';
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

const Login = () => {
  const test = () => {
    // Handle the click for "Forgot Password?"
    Alert.alert('feature not yet implemented');
    // You can implement the logic for handling the forgot password functionality here
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <Text style={styles.appName}>Str8Watch</Text>
          {/* <Text style={styles.subAppName}>"All is Well"</Text> */}
          <TextInput placeholder="Username" style={styles.textInput} />
          <TextInput
            placeholder="Password"
            style={styles.textInput}
            secureTextEntry
          />
          <Text style={styles.textLink} onPress={test}>
            Forgot Password?
          </Text>
          <View style={styles.btnContainer}>
            <Button title="Login" onPress={test} />
          </View>
          <Text style={styles.textLink} onPress={test}>
            Signup
          </Text>
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
