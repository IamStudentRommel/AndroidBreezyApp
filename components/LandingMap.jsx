import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import BottomDrawer from 'react-native-animated-bottom-drawer';
import AppConfig from '../app.json';
import testdata from '../data/test.json';
import mapCustomStyle from '../data/mapCustomStyle.json';

const LandingMap = () => {
  const {myMapKey} = AppConfig;
  const [isLoading, setIsLoading] = useState(true);
  //Drawer part start
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const bottomDrawerRef = useRef(null);

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
    bottomDrawerRef.current?.open();
  };
  //Drawer part end
  const [address, setAddress] = useState(null);
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
        setInitialLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        // console.log(initialLocation);
        setIsLoading(false);

        // Perform reverse geocoding to get the address
        const addressResult = await Location.reverseGeocodeAsync({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });

        if (addressResult && addressResult.length > 0) {
          setAddress(formatAddress(addressResult[0]));
        } else {
          setAddress(null);
        }
        console.log(address);
      } catch (error) {
        setIsLoading(false);
        console.error('Error getting location:', error);
        console.log(null);
      }
    }
  };

  const formatAddress = addressObj => {
    const {street, city, region, country} = addressObj;
    return `${street}, ${city}, ${region}, ${country}`;
  };

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
  const mapRef = useRef(null);
  const reCenter = () => {
    getLocation();
    mapRef.current?.animateToRegion(initialLocation, 1000);
  };

  useEffect(() => {
    fetchData();
    getLocation();
  }, []);

  const renderLoadingIndicator = () => (
    <View style={[StyleSheet.absoluteFill, styles.loadingIndicator]}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.loadingText}>Checking your location</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
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
        <TouchableOpacity
          style={styles.fab2}
          onPress={reCenter}
          activeOpacity={0.7}>
          <Image
            source={require('../assets/navigation.png')}
            style={styles.fabIcon}
          />
        </TouchableOpacity>

        {/* SearchBar */}
        <View style={styles.searchBarContainer}>
          <GooglePlacesAutocomplete
            placeholder="Search"
            onPress={(data, details = null) => {
              if (details) {
                const placeId = details.place_id;
                fetch(
                  `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${myMapKey}`,
                )
                  .then(response => response.json())
                  .then(data => {
                    if (
                      data &&
                      data.result &&
                      data.result.geometry &&
                      data.result.geometry.location
                    ) {
                      const {lat, lng} = data.result.geometry.location;
                      console.log('Latitude:', lat);
                      console.log('Longitude:', lng);

                      setInitialLocation({
                        latitude: lat,
                        longitude: lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      });
                    } else {
                      console.log(
                        'Latitude and longitude not available for this place.',
                      );
                    }
                  })
                  .catch(error => {
                    console.error('Error fetching place details:', error);
                  });
              }
            }}
            query={{
              key: myMapKey,
              language: 'en',
            }}
          />
        </View>

        {isLoading && renderLoadingIndicator()}
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
            editable={false}
            value={address}
          />

          <TextInput
            style={[styles.drawerInput, {height: 100}]}
            placeholder="Enter description"
            multiline={true}
            numberOfLines={2} // Adjust as needed
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
  fab2: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 96, // adjust the bottom position as needed
    right: 20, // adjust the right position as needed
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
  loadingIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white background
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
  },
});

export default LandingMap;
