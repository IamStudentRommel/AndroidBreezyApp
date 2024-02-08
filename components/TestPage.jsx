// import {View, Text} from 'react-native';
// const About = () => {
//   return (
//     <View s>
//       <Text>Shit text</Text>
//     </View>
//   );
// };

// export default About;

import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import * as Location from 'expo-location';

const requestLocationPermission = async () => {
  try {
    const {status} = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  } catch (err) {
    console.error(err);
    return false;
  }
};

const About = () => {
  const [location, setLocation] = useState(null);

  const getLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (hasPermission) {
      try {
        const {coords} = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        setLocation(coords);
      } catch (error) {
        console.error('Error getting location:', error);
        setLocation(null);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
        <Button title="Get Location" onPress={getLocation} />
      </View>
      {location && (
        <>
          <Text>Latitude: {location.latitude}</Text>
          <Text>Longitude: {location.longitude}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default About;
