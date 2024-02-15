import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, Button, TouchableOpacity} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';
// import {Ionicons} from '@expo/vector-icons';
import testdata from '../data/test.json';
import mapCustomStyle from '../data/mapCustomStyle.json';

const Page2 = () => {
  const [incidents, setIncidents] = useState([]);
  const [initialLocation, setInitialLocation] = useState({
    latitude: 51.05011,
    longitude: -114.08529,
    latitudeDelta: 0.0022,
    longitudeDelta: 0.0091,
  });

  const requestLocationPermission = async () => {
    try {
      const {status} = await Location.requestForegroundPermissionsAsync();
      return status === 'granted';
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const getLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (hasPermission) {
      try {
        const {coords} = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        // console.log('coords');
        setInitialLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (error) {
        console.error('Error getting location:', error);
        console.log(null);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://data.calgary.ca/resource/78gh-n26t.json',
        );
        const data = await response.json();
        setIncidents(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getLocation();
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={initialLocation}
          customMapStyle={mapCustomStyle}>
          <Marker coordinate={initialLocation} title="Your Initial Location">
            <Image
              source={require('../assets/angel.png')}
              style={{width: 32, height: 32}}
            />
          </Marker>
          {testdata.map(marker => {
            if (marker.year === '2023') {
              try {
                const coordinates = {
                  latitude: marker.community_center_point.coordinates[1],
                  longitude: marker.community_center_point.coordinates[0],
                };
                return (
                  <Marker
                    key={marker.id}
                    coordinate={coordinates}
                    title={marker.category}
                    x
                    description={marker.id}>
                    <Image
                      source={require('../assets/zombie.png')}
                      style={{width: 32, height: 32}}
                    />
                  </Marker>
                );
              } catch (error) {
                return null;
              }
            }
          })}
        </MapView>
      </View>
      {/* <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title="Button 1"
            onPress={() => console.log('Button 1 pressed')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Button 2"
            onPress={() => console.log('Button 2 pressed')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Button 3"
            onPress={() => console.log('Button 3 pressed')}
          />
        </View>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'lightgray',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default Page2;
