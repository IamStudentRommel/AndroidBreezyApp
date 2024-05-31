import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import 'expo-dev-client';
import auth from '@react-native-firebase/auth';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';

const SignOptions = () => {
  // GoogleSignin.configure({
  //   webClientId:
  //     '651067344773-stidiurnlcpfndbki5mqhol4oflrmfbo.apps.googleusercontent.com',
  // });

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  const test = async () => {
    // console.log('hey');
    alert('Function not yet ready');
  };
  return (
    
    <View style={styles.signInContainer}>
      <View style={styles.titleContainer}>
        <View style={styles.line}></View>
        <Text style={styles.title}>or</Text>
        <View style={styles.line}></View>
      </View>

      <View style={styles.signInOptions}>
        <TouchableOpacity
          style={styles.button}
          // onPress={() =>
          //   onGoogleButtonPress().then(() =>
          //     console.log('Signed in with Google!'),
          //   )
          // }
          onPress={test}>
          <View style={styles.buttonContent}>
            <Image
              source={require('../../assets/google.png')}
              style={styles.googleLogo}
            />
            <Text style={styles.buttonText}>Sign in with Google</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  signInContainer: {
    padding: 5,
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    top: '-10%'
  },
  title: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },

  line: {
    flex: 1,
    height: 2,
    backgroundColor: '#FFFFFF',
  },

  button: {
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '80%',
    alignSelf: 'center',
  },

  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    padding: 13,
    borderRadius: 25,
    width: '100%',
    top: '-17%'
  },

  googleLogo: {
    width: 19,
    height: 19,
    marginRight: 15,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SignOptions;
