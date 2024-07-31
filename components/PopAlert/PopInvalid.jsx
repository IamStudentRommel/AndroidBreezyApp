import React from 'react';
import { Modal, TouchableOpacity, View, StyleSheet, Text, Image } from 'react-native';

const InvalidFeedbackAlert = ({ modalVisible, toggleModal }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={toggleModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        <Image source={require('../../assets/RequiredIcon.png')} style={styles.logo}/>
          <Text style={styles.title}>Oops!</Text>
          <Text style={styles.message}>Please input a valid feedback (at least 10 characters).</Text>
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
    padding: 10,
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
    height: '27%',
    marginBottom: 10,
    marginTop: 10,
  },
  message: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 15,
    color: '#000000',
  },
  line: {
    width: '106%',
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 1,

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

export default InvalidFeedbackAlert;
