import React, {useState, useRef} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import AppConfig from '../../app.json';

const RegistrationForm = ({setShowRegistrationForm, updateLogDisplay}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [isAuth, SetAuth] = useState(false);
  const [authCode, setAuthCode] = useState(0);
  const {be} = AppConfig;

  const capitalizeFirstLetter = str => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const validateUser = async email => {
    // const q = query(collection(db, 'users'), where('email', '==', email));
    // const querySnapshot = await getDocs(q);
    // return !querySnapshot.empty;
    try {
      const response = await fetch(`${be}/api/validateemail?email=${email}`);
      const data = await response.json();
      if (Object.keys(data).length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error fetching data: api/validateemail', error);
      Alert.alert('Error fetching data api/validateemail:', error);
    }
  };

  const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const generateRandomCode = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const handleAuth = async () => {
    if (!email || !password || !fname || !lname) {
      alert('Error: Please fill in all fields');
      return;
    } else if (!isValidEmail(email)) {
      alert('Error: Invalid Email');
      return;
    } else {
      const userExists = await validateUser(email);
      // console.log(userExists);
      if (userExists) {
        alert('Error: This user is already registered in the system');
        return;
      } else {
        // console.log(generateRandomCode());
        const genCode = generateRandomCode();
        const response = await fetch(
          `${be}/api/send-email-verification?usermail=${email}&subject=Verification%20Code&content=${genCode}`,
        );
        // console.log(response);
        if (response.ok) {
          console.log('Verification sent!');
          setAuthCode(genCode);
        } else {
          alert('Failed to send verification send-email-verification api');
        }
        SetAuth(true);
      }
    }
  };

  const handleCancel = () => {
    setEmail('');
    setPassword('');
    setFname('');
    setLname('');
    setShowRegistrationForm(false);
    updateLogDisplay('Login');
  };

  const VerificationForm = () => {
    const [code, setCode] = useState(['', '', '', '']);
    const inputs = useRef([]);

    const handleChange = async (text, index) => {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      // Move to next input if a digit is entered
      if (text && index < code.length - 1) {
        inputs.current[index + 1].focus();
      }

      if (newCode.join('').length > 3) {
        const enteredCode = newCode.join('');
        console.log(enteredCode);
        console.log(authCode);
        if (enteredCode === authCode) {
          console.log('success');
          const url = `${be}/api/adduser`;
          const data = {
            email: email,
            pwd: password,
            fname: capitalizeFirstLetter(fname),
            lname: capitalizeFirstLetter(lname),
            role: 1,
            status: true,
          };
          try {
            const response = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });

            if (!response.ok) {
              throw new Error('Network response was not ok');
            } else {
              alert('New user successfully registered!');
              setEmail('');
              setPassword('');
              setFname('');
              setLname('');
              setShowRegistrationForm(false);
              updateLogDisplay('Login');
            }
          } catch (error) {
            console.error('Error adding user: ', error);
            alert('Error: Failed to register user. Please try again later.');
          }
        } else {
          console.log('failed');
        }
      }
    };

    const handleKeyPress = (e, index) => {
      if (
        e.nativeEvent.key === 'Backspace' &&
        code[index] === '' &&
        index > 0
      ) {
        inputs.current[index - 1].focus();
      }
    };
    return (
      <>
        <View>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.inner}>
            <Image source={require('../../assets/Group136.png')} style={styles.logo}/>
              <View style={styles.verificationContainer}>
                <Text style={styles.titleVerification}>Verify Your Email</Text>
                  <Text style={{color: '#FFFFFF', fontSize: 17, textAlign: 'center', marginBottom: 20}}>
                    Thank you for registering an account with us!
                  </Text>
                  <Text style={{color: '#FFFFFF', fontSize: 17, textAlign: 'center', marginBottom: 25, paddingHorizontal: 30}}>
                    To complete your registration, please enter the
                    4-digit verification code we've sent to your
                    email address.
                  </Text>
                  <View style={styles.codeContainer}>
                    {code.map((digit, index) => (
                      <TextInput
                        key={index}
                        style={[styles.input, styles.codeInput]}
                        keyboardType="numeric"
                        maxLength={1}
                        onChangeText={text => handleChange(text, index)}
                        onKeyPress={e => handleKeyPress(e, index)}
                        value={digit}
                        ref={input => (inputs.current[index] = input)}
                      />
                    ))}
                  </View>
                  <TouchableOpacity
                    style={{backgroundColor: '#626262', width: 300, height: 50, 
                      borderRadius: 30, alignItems: 'center', justifyContent: 'center',
                      marginTop: 20}}
                    onPress={handleCancel}>
                    <Text style={{color: '#FFFFFF', fontSize: 15, fontWeight: 'bold'}}>Cancel</Text>
                  </TouchableOpacity>
                </View>
            </View>
          </ScrollView>
        </View>            
      </>
    );
  };

  return (
    <>
      {isAuth ? (
        <View style={styles.container}>
          <VerificationForm />
        </View>
      ) : (
        <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.inner}>
            <Image
              source={require('../../assets/Group137.png')}
              style={styles.regLogo}
            />
            <View style={styles.inputContainer}>
            <Text style={styles.title}>Welcome!</Text>
              <Text style={styles.textContent}>
                Create an account to start reporting incidents
                and help us keep our neighborhood safe.
              </Text>
              <TextInput
                style={styles.input}
                placeholder="First Name"
                placeholderTextColor={'#8F8F8F'}
                value={fname}
                onChangeText={text => setFname(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                placeholderTextColor={'#8F8F8F'}
                value={lname}
                onChangeText={text => setLname(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={'#8F8F8F'}
                value={email}
                onChangeText={text => setEmail(text)}
                keyboardType="email-address"
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={'#8F8F8F'}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
              />
              <TouchableOpacity
                style={[styles.button, {backgroundColor: '#C20000'}]}
                onPress={handleAuth}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: '#626262'}]}
                onPress={handleCancel}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // paddingHorizontal: 16,
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
    height: 280,
    width: 310,
  },
  titleVerification: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#FFFFFF',
  },
  verificationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '70%',

  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeInput: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    textAlign: 'center',
    marginHorizontal: 5, // This controls the space between the input boxes
    fontSize: 18,
    color: '#101935',
  },
  inputContainer: {
    marginTop: '50%',
    alignItems: 'center',
  },
  regLogo: {
    position: 'absolute',
    top: 1, // Adjust as needed
    right: 1, // Adjust as needed
    height: 280,
    width: 270,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    marginBottom: 10,
    color: '#FFFFFF',
  },
  textContent: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 15,
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingHorizontal: 20,
    marginBottom: 15,
    width: 320,
    color: '#101935',
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 30,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    width: 320,
    height: 45,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  
});

export default RegistrationForm;