import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Text} from 'react-native';
import {
  db,
  collection,
  getDocs,
  query,
  where,
  addDoc,
} from '../../firebase/conf';

const RegistrationForm = ({setShowRegistrationForm, updateLogDisplay}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');

  const capitalizeFirstLetter = str => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const validateUser = async email => {
    const q = query(collection(db, 'users'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
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
      <Text style={styles.title}>Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={'#ffffff'}
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={'#ffffff'}
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="First Name"
        placeholderTextColor={'#ffffff'}
        value={fname}
        onChangeText={text => setFname(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        placeholderTextColor={'#ffffff'}
        value={lname}
        onChangeText={text => setLname(text)}
      />

      <View style={styles.button}>
        <Button title="Register" onPress={handleRegister} color="blue" />
      </View>
      <View style={styles.button}>
        <Button title="Cancel" onPress={handleCancel} color="blue" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#00001a',
  },
  title: {
    marginTop: 50,
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#ffffff',
  },
  input: {
    color: '#ffffff',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },

  button: {
    margin: 20,
  },
});

export default RegistrationForm;
