import React, {useState, useEffect} from 'react';

import {Modal, Button, View, Text, Image, StyleSheet} from 'react-native';
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
        <View style={styles.detailRow}>
          <Text style={[styles.label, styles.bold]}>Date: </Text>
          <Text style={[styles.value, styles.italic]}>
            {datetime.split('T')[0].split('.')[0]}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={[styles.label, styles.bold]}>Time: </Text>
          <Text style={[styles.value, styles.italic]}>
            {datetime.split('T')[1].split('.')[0]}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={[styles.label, styles.bold]}>Category: </Text>
          <Text style={[styles.value, styles.italic]}>{category}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={[styles.label, styles.bold]}>Reporter: </Text>
          <Text style={[styles.value, styles.italic]}>
            {reporter.split(',')[0]}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={[styles.label, styles.bold]}>Details: </Text>
        </View>
        <Text style={[styles.value, styles.italic, styles.detailsValue]}>
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

        {imgSrc && (
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: imgSrc,
              }}
              style={styles.image}
            />
          </View>
        )}
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
          <Button title="OK" onPress={toggleModal} color="#101935" />
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
  detailsContainer: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    fontStyle: 'italic',
    marginLeft: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
  detailsValue: {
    marginLeft: 20,
    fontStyle: 'italic',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    width: 300,
    height: 300,
  },
});

export default CrimeModal;
