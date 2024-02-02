import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.appName}>Str8Watch</Text>
        <Text style={styles.subAppName}>"All is Well"</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email..."
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({email: text})}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({password: text})}
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.signUp}>Signup</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 280,
    height: 250,
  },
  appName: {
    fontWeight: 'bold',
    justifyContent: 'center',
    fontSize: 40,
    color: '#ffffff',
    // marginBottom: 40,
  },
  subAppName: {
    fontSize: 10,
    marginBottom: 40,
    fontSize: 15,
    color: '#ffffff',
    fontStyle: 'italic',
  },
  inputView: {
    width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: '#003f5c',
  },
  forgot: {
    color: '#3333ff',
    fontSize: 15,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#0000e6',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: '#ffffff',
  },
  signUp: {
    color: '#3333ff',
    fontSize: 15,
  },
});
