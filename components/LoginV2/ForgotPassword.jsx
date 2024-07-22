import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import AppConfig from '../../app.json';

const ForgotPassword = ({setShowForgotPassword}) => {
  const [email, setEmail] = useState('');
  const {be} = AppConfig;

  const handleSendEmail = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }

    const response = await fetch(`${be}/api/usrforgotpwd?email=${email}`);
    const data = await response.json();
    console.log(data.result);

    if (data.result === 'failed') {
      alert(data.msg);
    } else {
      const secret = data.pwd;
      const response = await fetch(
        `${be}/api/send-email-forgotpwd?usermail=${email}&subject=Forgot%20Password&content=${secret}`,
      );
      // const data = await response.json();
      // console.log(data.result);
      if (response.ok) {
        alert('Your password successfully sent to your email!');
        setEmail('');
        setShowForgotPassword(false);
      } else {
        alert('Failed to send email, check api send-email-forgotpwd');
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.inner}>
          <Image
            source={require('../../assets/Group136.png')}
            style={styles.logo}
          />
          <View style={styles.forgotContainer}>
            <Text style={styles.title}>Forgot Password</Text>
            <Text
              style={{
                color: '#FFFFFF',
                marginBottom: 30,
                fontSize: 15,
                paddingHorizontal: 40,
                textAlign: 'center',
              }}>
              Please enter your email address and we will send your password to
              your email.
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={'#8F8F8F'}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => setShowForgotPassword(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#1E1E1E',
  },
  inner: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    position: 'relative',
  },
  logo: {
    position: 'absolute',
    top: 1, // Adjust as needed
    right: 1, // Adjust as needed
    height: 280,
    width: 310,
  },
  forgotContainer: {
    marginTop: '27%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: '50%',
    textAlign: 'center',
    marginBottom: 10,
    color: '#FFFFFF',
  },
  input: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingHorizontal: 20,
    marginBottom: 15,
    width: 300,
    color: '#101935',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#C20000',
    borderRadius: 30,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 13,
    width: 300,
    height: 50,
  },
  cancelButton: {
    backgroundColor: '#626262',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default ForgotPassword;
