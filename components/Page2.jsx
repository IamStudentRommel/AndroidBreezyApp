import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import testdata from '../data/test.json';
import mapCustomStyle from '../data/mapCustomStyle.json';
import * as Location from 'expo-location';

const Page2 = () => {
  const [incidents, setIncidents] = useState([]);
  const [initialLocation, setInitialLocation] = useState({
    latitude: 51.05011,
    longitude: -114.08529,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
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
        console.log('coords');
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
              // console.log(marker.id);
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
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Page2;
