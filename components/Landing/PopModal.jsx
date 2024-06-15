import React, {useState, useEffect} from 'react';

import {Modal, View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import AppConfig from '../../app.json';

const CrimeModal = ({modalVisible, toggleModal, crimeDetails}) => {
  const [imgSrc, setImgSrc] = useState(null);
  const {be} = AppConfig;
  const fetchCrimeImg = async images => {
    try {
      const response = await fetch(`${be}trans/images/${images}`);
      const data = await response.json();
      setImgSrc(data['imageUrl']);
      // console.log(data);
    } catch (error) {
      // console.error('Error fetching images:', error);
      setImgSrc(null);
    }
  };

  useEffect(() => {
    if (crimeDetails) {
      const [id, datetime, details, category, reporter, images] =
        crimeDetails.split('|||');
      fetchCrimeImg(images);
    }
  }, [crimeDetails]);

  const renderCrimeDetails = () => {
    if (!crimeDetails) return null;
    const [id, datetime, details, category, reporter, images] =
      crimeDetails.split('|||');

    return (
      <View style={styles.detailsContainer}>
        {imgSrc && (
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: imgSrc,
              }}
              style={styles.image}
            />
            <View style={styles.overlay} />
            <View style={styles.detailRow}>
              <Text style={styles.category}> {category.replace(' ', '\n')}</Text>
            </View>
          </View>
        )}
        
        <View style={styles.detailRow}>
          <Text style={[styles.report]}>Report by: </Text>
          <Text style={styles.report}>
            {reporter.split(',')[0]}
          </Text>
        </View>

        <View style={styles.datetimeContainer}>
          <Text style={styles.time}>
            {datetime.split('T')[1].split('.')[0]}
          </Text>
          <Text style={styles.date}>
            {datetime.split('T')[0].split('.')[0]}
          </Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.details}>Details: </Text>
        </View>
        <Text style={styles.detailsValue}>
          {details}
        </Text>

        {/* <View style={styles.imageContainer}>
          <Image
            source={{
              uri: imgSrc,
            }}
            style={styles.image}
          />
        </View> */}

        
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={toggleModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {renderCrimeDetails()}
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
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 330,
    height: 300,
    borderRadius: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Adjust the alpha value for desired darkness
    borderRadius: 20,
    height: '99%',
  },
  category: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#FFFFFF',
    position: 'absolute',
    bottom: 20, // Adjust as needed
    left: 10, // Adjust as needed
    textAlign: 'left',
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
  time:{
    color: '#27272a',
    fontWeight: '500',
    fontSize: 12, 
  },
  date:{
    color: '#27272a',
    fontWeight: '500',
    fontSize: 12,
    marginRight: '60%',
  },
  details: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsValue: {
    marginLeft: 20,
    fontSize: 15,
    marginBottom: 20,
  },
  button: {
    borderRadius: 20,

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
});

export default CrimeModal;
