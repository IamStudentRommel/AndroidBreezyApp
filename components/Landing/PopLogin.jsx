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
          <Text style={styles.shit}>Oops!</Text>
          <Text style={styles.message}>You need to login first.</Text>
          <View style={styles.underline} />
          <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLoginRedirect}>
            <Text style={[styles.buttonText,{marginLeft: 50, marginTop: 5,}]}>Login</Text>
          </TouchableOpacity>
          <View style={styles.verticalLine} />
          <TouchableOpacity onPress={toggleModal}>
          <Text style={[styles.buttonText,{marginRight: 50}]}>Cancel</Text>
          </TouchableOpacity>
          </View>
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
    height: '21%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16, // Adjust the font size
    fontWeight: 'bold', // Make the text bold
    color: '#C20000', // Text color

  },
  cancelButton: {
    backgroundColor: 'gray', // Cancel button color
  },
  cancelButtonText: {
    color: '#fff', // Text color for cancel button
  },
  shit: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 20,
    padding: 20,
    alignSelf: 'center',
  },
  message:{
    paddingLeft: 20,
    fontSize: 17,
    alignSelf: 'center',
  },

  underline: {
    height: 1,
    backgroundColor: '#000000',
    marginTop: 25,
  },

  verticalLine: {
    alignSelf: 'center',
    width: 1,
    backgroundColor: '#000000',
    bottom: '-1%',
    height: '200%',
    marginHorizontal: 10,
  },
});

export default CrimeModal;
