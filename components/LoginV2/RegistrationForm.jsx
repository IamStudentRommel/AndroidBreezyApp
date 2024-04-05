import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  db,
  collection,
  getDocs,
  query,
  where,
  addDoc,
} from '../../firebase/conf';
import AppConfig from '../../app.json';

const RegistrationForm = ({setShowRegistrationForm, updateLogDisplay}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
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

  const handleRegister = async () => {
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
        try {
          await addDoc(collection(db, 'users'), {
            email: email,
            pwd: password,
            fname: capitalizeFirstLetter(fname),
            lname: capitalizeFirstLetter(lname),
            role: 1,
            status: true,
          });
          alert('New user successfully registered!');
          setEmail('');
          setPassword('');
          setFname('');
          setLname('');
          setShowRegistrationForm(false);
          updateLogDisplay('Login');
        } catch (error) {
          console.error('Error adding document: ', error);
          alert('Error: Failed to register user. Please try again later.');
        }
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

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/crimehate3.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={'#101935'}
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={'#101935'}
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="First Name"
        placeholderTextColor={'#101935'}
        value={fname}
        onChangeText={text => setFname(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        placeholderTextColor={'#101935'}
        value={lname}
        onChangeText={text => setLname(text)}
      />

      <TouchableOpacity
        style={[styles.button, {backgroundColor: '#101935'}]}
        onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: 'gray'}]}
        onPress={handleCancel}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
      {/* <View style={styles.button}>
        <Button
          title="Cancel"
          onPress={handleCancel}
          color="#393939"
          style={{borderRadius: 50}}
        />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#F2FDFF',
  },
  logo: {
    width: 200,
    height: 98,
    marginBottom: 10,
    marginTop: 50,
    alignSelf: 'center',
  },
  title: {
    marginTop: 50,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#101935',
  },
  input: {
    color: '#101935',
    height: 40,
    width: '93%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 10,
    alignSelf: 'center',
  },

  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  buttonText: {
    color: '#f2fdff',
    fontSize: 15,
  },
});

export default RegistrationForm;
