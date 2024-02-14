import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {db, collection, addDoc, getDocs, query, where} from '../firebase/conf';

const DBConTest = () => {
  const testRead = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      querySnapshot.forEach(doc => {
        // Access the individual fields of each document's data
        const {email, pwd, lname, fname, role, status} = doc.data();
        console.log(doc.id, email, pwd, lname, fname, role, status);
      });
    } catch (e) {
      console.error('Error reading document: ', e);
    }
  };

  const checkIfExistsAndAdd = async email => {
    try {
      const q = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        console.log('Document with email already exists');
        return; // Exit the function if a document with the same email already exists
      }

      const docRef = await addDoc(collection(db, 'users'), {
        email: email,
        fname: 'yow',
        lname: 'yowee',
        pwd: 'abc',
        role: 1,
        status: 1,
      });

      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error checking or adding document: ', e);
    }
  };

  testRead();

  const handleButtonPress = () => {
    // Call the function with the desired email
    checkIfExistsAndAdd('zzzz.xyz');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleButtonPress}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DBConTest;
