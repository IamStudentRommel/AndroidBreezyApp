import React from 'react';
import { Modal, TouchableOpacity, View, StyleSheet, Text, Image } from 'react-native';

const ThankYouAlert = ({ modalVisible, toggleModal }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={toggleModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image source={require('../../assets/SentIcon.png')} style={styles.logo}/>
          <Text style={styles.title}>Thank You!</Text>
          <Text style={styles.message}>Thank you for reaching us, your feedback was successfully sent!</Text>
          <View style={styles.line}></View>
          <TouchableOpacity onPress={toggleModal} style={styles.button}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '80%',
    height: '35%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 15,
  },
  logo: {
    width: '20%',
    height: '20%',
    marginBottom: 20,
    marginTop: 10,
  },
  message: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000000',
  },
  line: {
    width: '114%',
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 10,
  },
  button: {
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C20000',
    marginTop: 10,
  },
});

export default ThankYouAlert;
