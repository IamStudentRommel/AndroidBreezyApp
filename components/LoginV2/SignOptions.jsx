import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';

const SignOptions = () => {
  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId:
  //       '651067344773-stidiurnlcpfndbki5mqhol4oflrmfbo.apps.googleusercontent.com',
  //   });
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
    console.log('hey');
    // try {
    //   await GoogleSignin.hasPlayServices();
    //   const userInfo = await GoogleSignin.signIn();
    //   const googleCredential = auth.GoogleAuthProvider.credential(
    //     userInfo.idToken,
    //   );
    //   await auth().signInWithCredential(googleCredential);
    // } catch (error) {
    //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //     console.log('User cancelled the sign-in process');
    //   } else if (error.code === statusCodes.IN_PROGRESS) {
    //     console.log('Sign-in is already in progress');
    //   } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //     console.log('Play services not available or outdated');
    //   } else {
    //     console.error(
    //       'Error occurred while trying to sign in with Google',
    //       error,
    //     );
    //   }
    // }
  };
  return (
    <View style={styles.signInContainer}>
      <View style={styles.titleContainer}>
        <View style={styles.line}></View>
        <Text style={styles.title}>Or connect with</Text>
        <View style={styles.line}></View>
      </View>

      <View style={styles.signInOptions}>
        <TouchableOpacity style={styles.button} onPress={test}>
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
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ffffff',
  },

  button: {
    backgroundColor: 'blue',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '60%',
    alignSelf: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleLogo: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignOptions;
