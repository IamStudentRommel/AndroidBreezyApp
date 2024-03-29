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
        <Text style={styles.title}>Or connect with</Text>
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
        {/* <TouchableOpacity style={styles.signInButton}>
          <Image
            source={require('../../assets/facebook.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.signInButton}>
          <Image
            source={require('../../assets/instagram.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.signInButton} onPress={handleGoogle}>
          <Image
            source={require('../../assets/google.png')}
            onpre
            style={styles.icon}
          />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  signInContainer: {
    padding: 5,
  },
  // signInText: {
  //   color: '#ffffff',
  //   textAlign: 'center',
  // },
  // signInOptions: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  // },
  // signInButton: {
  //   marginVertical: 10,
  // },
  // icon: {
  //   width: 35,
  //   height: 35,
  //   margin: 10,
  //   marginBottom: -10,
  // },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: '#101935',
    fontSize: 15,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#101935',
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
    borderColor: '#101935',
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 25,
  },

  googleLogo: {
    width: 24,
    height: 24,
    marginRight: 10,
  },

  buttonText: {
    color: '#101935',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignOptions;
