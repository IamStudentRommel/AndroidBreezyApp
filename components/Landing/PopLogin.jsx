import React, {useState} from 'react';
import {Modal, TouchableOpacity, View, StyleSheet, Text, Image} from 'react-native';
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
          <Image source={require('../../assets/RequiredIcon.png')} style={styles.logo}/>
          <Text style={styles.message}>You need to login first.</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleLoginRedirect} style={styles.buttonLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal} style={styles.buttonCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
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
    height: '35%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16, // Adjust the font size
    fontWeight: 'bold', // Make the text bold
    color: '#FFFFFF', // Text color
  },
  buttonLogin: {
    flex: 1,
    backgroundColor: '#C20000',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 30,
  },
  buttonCancel: {
    flex: 1,
    backgroundColor: '#626262',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 30,
  },
  shit: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 30,
    padding: 20,
    alignSelf: 'center',
  },
  logo: {
    alignSelf: 'center',
    width: '20%',
    height: '27%',
    marginBottom: 15,
  },
  message:{
    paddingLeft: 20,
    fontSize: 19,
    alignSelf: 'center',
    fontWeight: '500',
  },
});

export default CrimeModal;
