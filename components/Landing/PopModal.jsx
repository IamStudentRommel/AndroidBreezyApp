import React from 'react';
import {Modal, Button, View, Text, Image, StyleSheet} from 'react-native';

const CrimeModal = ({modalVisible, toggleModal, crimeDetails}) => {
  const renderCrimeDetails = () => {
    if (!crimeDetails) return null;
    const [id, datetime, details, category, reporter] =
      crimeDetails.split('|||');
    const isDateMatch = datetime.split('T')[0].split('.')[0] === '2024-04-16';

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

        {isDateMatch && (
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/robbery.jpg')}
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
          <Button title="OK" onPress={toggleModal} />
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
    width: 200,
    height: 200,
  },
});

export default CrimeModal;
