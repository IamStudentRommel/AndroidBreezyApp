import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';
import BottomDrawer from 'react-native-animated-bottom-drawer';
import testdata from '../data/test.json';
import mapCustomStyle from '../data/mapCustomStyle.json';

const LandingMap = () => {
  //Drawer part start
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const bottomDrawerRef = useRef(null);

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
    bottomDrawerRef.current?.open();
  };
  //Drawer part end

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

  const handleCrime = () => {
    // Do something when FAB is pressed
    console.log('Crime pressed');
  };

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
        <TouchableOpacity
          style={styles.fab}
          onPress={handleOpenDrawer}
          activeOpacity={0.7}>
          <Image
            source={require('../assets/plus.png')}
            style={styles.fabIcon}
          />
        </TouchableOpacity>
      </View>
      <BottomDrawer
        ref={bottomDrawerRef}
        openOnMount={false}
        startUp={false}
        onChangeVisibility={visible => setIsDrawerOpen(visible)}>
        <View style={styles.contentContainer}>
          <Text style={{marginBottom: 30, fontWeight: 'bold'}}>
            Report Crime
          </Text>
          <TextInput
            style={styles.drawerInput}
            placeholder="This will be your exact location"
            value={''}
          />
          <TextInput
            style={[styles.drawerInput, {height: 200}]}
            placeholder="Enter description"
            multiline={true}
            numberOfLines={4} // Adjust as needed
          />
          <Button title="Submit" />
        </View>
      </BottomDrawer>
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

  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#e60000',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    bottom: 26,
    elevation: 8,
  },
  fabIcon: {
    width: 24,
    height: 24,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
});

export default LandingMap;
