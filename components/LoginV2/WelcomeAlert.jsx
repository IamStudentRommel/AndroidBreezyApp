import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const WelcomeAlert = ({ userName, onClose }) => {
  return (
    <View style={styles.container}>
    <View style={styles.alertContainer}>
    <Image source={require('../../assets/ReportCrimeLogo.png')}
        style={styles.logo}
    />
      <Text style={styles.welcomeText}>Welcome to CrimeH8ers</Text>
      <Text style={styles.userText}>{userName}</Text>
    <View style={styles.section}>
      <Text style={styles.bodyText}>
        You have successfully logged in.
        Enjoy using the app!
      </Text>
    </View>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '-10%',
  },

  alertContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 30,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  section: {
    paddingHorizontal: 50,
    marginBottom: 20
  },
  bodyText: {
    textAlign: 'center',
    color: '#3F3F3F',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#960303',
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