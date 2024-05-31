import React, {useState} from 'react';
import {Modal, TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const CrimeModal = ({modalVisible, toggleModal, handleCancelPress}) => {
  const navigation = useNavigation();
  const handleLoginRedirect = () => {
    navigation.navigate('Login');
    toggleModal();
    handleCancelPress();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={toggleModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.shit}>Please login first to report crime</Text>
          <View style={styles.underline} />
          <TouchableOpacity onPress={handleLoginRedirect}>
            <Text>Click here to Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={toggleModal}>
            <Text style={[styles.buttonText, styles.cancelButtonText]}>
              Cancel
            </Text>
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
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  button: {
    height: 35, // Increase the height of the button
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16, // Adjust the font size
    fontWeight: 'bold', // Make the text bold
  },
  cancelButton: {
    backgroundColor: 'gray', // Cancel button color
  },
  cancelButtonText: {
    color: '#fff', // Text color for cancel button
  },
  shit: {
    color: '#C20000',
    fontWeight: 'bold',
    marginLeft: 5,
  },

  underline: {
    height: 2,
    width: 'auto',
    backgroundColor: '#C20000',
    marginTop: 2,
    marginLeft: 5,
    marginBottom: 25,
  },
});

export default CrimeModal;
