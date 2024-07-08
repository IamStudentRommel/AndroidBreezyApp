import React, {useState, useEffect} from 'react';

import {Modal, View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const CrimeModal = ({modalVisible, toggleModal, crimeDetails}) => {
  // useEffect(() => {
  //   if (crimeDetails) {
  //     const [id, datetime, details, category, reporter, images] =
  //       crimeDetails.split('|||');
  //     fetchCrimeImg(images);
  //   }
  // }, [crimeDetails]);
  // console.log(crimeDetails);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={toggleModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.detailsText}>
            <Text style={styles.detailsValue}>{crimeDetails.id}</Text>
          </View>
          <View style={styles.detailsText}>
            <Text style={styles.detailsValue}>{crimeDetails.category}</Text>
          </View>
          <View style={styles.detailsText}>
            <Text style={styles.detailsValue}>{crimeDetails.desc}</Text>
          </View>
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
    padding: 20,
    borderRadius: 20,
    width: '90%',
    height: 'auto',
  },
  detailsContainer: {
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Adjust the alpha value for desired darkness
    borderRadius: 20,
    height: '100%',
  },
  category: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
    textAlign: 'left',
    marginTop: 5,
  },
  report: {
    fontSize: 14,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  datetimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  time: {
    color: '#27272a',
    fontWeight: '500',
    fontSize: 12,
  },
  date: {
    color: '#27272a',
    fontWeight: '500',
    fontSize: 12,
    marginRight: '60%',
  },
  details: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  detailsText: {
    marginBottom: 10,
  },
  detailsValue: {
    marginLeft: 20,
    fontSize: 15,
    marginBottom: 30,
  },
  button: {
    borderRadius: 20,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#C20000',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  detailsValue: {
    marginLeft: 10,
  },
});

export default CrimeModal;
