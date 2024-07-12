import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const WelcomeAlert = ({ userName, onClose }) => {
  return (
    <View style={styles.alertContainer}>
    <Image source={require('../../assets/ReportCrimeLogo.png')}
        style={styles.logo}
    />
      <Text style={styles.welcomeText}>Welcome to CrimeHe8ers</Text>
      <Text style={styles.userText}>{userName}</Text>
    <View style={styles.section}>
      <Text style={styles.bodyText}>
        You have successfully logged in,
        Enjoy using the app!
      </Text>
    </View>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  alertContainer: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 150, // Adjust as needed
    left: '2%', // Adjust as needed
    right: '2%', // Adjust as needed
    zIndex: 1000, // Ensure it is on top
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  welcomeText: {
    color: '#000000',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  userText: {
    color: '#000000',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  section: {
    paddingHorizontal: 50,
    marginBottom: 20
  },
  bodyText: {
    textAlign: 'center',
    color: '#595959',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#C20000',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 60,
    marginBottom: 20,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomeAlert;
