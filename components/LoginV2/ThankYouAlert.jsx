// ThankYouAlert.js
import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';

const ThankYouAlert = ({ onClose }) => {
  return (
    <Modal transparent={true} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          <Text style={styles.alertText}>Thank you for using our app!</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertBox: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  alertText: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#C20000',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ThankYouAlert;
