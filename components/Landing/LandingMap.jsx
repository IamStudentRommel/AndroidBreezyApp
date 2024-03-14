import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';
import testdata from '../../data/test.json';
import mapCustomStyle from '../../data/mapCustomStyle.json';
import CustomDrawerButtom from './CrimeReportDrawer';
import SearchMap from './SearchMap';

const LandingMap = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const bottomDrawerRef = useRef(null);

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
    bottomDrawerRef.current?.open();
  };

  const clearSearchText = () => {
    setClearSearch(prevState => !prevState);
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
        // console.log(address);
      } catch (error) {
        setIsLoading(false);
        console.error('Error getting location:', error);
        // console.log(null);
      }
    }
  };

  const formatAddress = addressObj => {
    const {street, city, region, country} = addressObj;
    return `${street}, ${city}, ${region}, ${country}`;
  };

  const fetchRecentIncidents = async () => {
    try {
      const response = await fetch(
        'https://breezy-app-be.vercel.app/api/recentcrimes',
      );
      const data = await response.json();
      setIncidents(data);
      // console.log(data);
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
    fetchRecentIncidents();
    getLocation();
  }, [incidents]);

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
              source={require('../../assets/angel.png')}
              style={{width: 30, height: 30}}
            />
          </Marker>

          {incidents.map(marker => {
            // if (marker.year === '2023') {
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
                    source={require('../../assets/zombie.png')}
                    style={{width: 30, height: 30}}
                  />
                </Marker>
              );
            } catch (error) {
              return null;
            }
            // }
          })}
        </MapView>

        <TouchableOpacity
          style={styles.fab}
          onPress={handleOpenDrawer}
          activeOpacity={0.7}>
          <Image
            source={require('../../assets/plus.png')}
            style={styles.fabIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.fab2}
          onPress={reCenter}
          activeOpacity={0.7}>
          <Image
            source={require('../../assets/navigation.png')}
            style={styles.fabIcon}
          />
        </TouchableOpacity>

        {/* SearchBar */}
        <SearchMap setInitialLocation={setInitialLocation} />
      </View>
      {isLoading && renderLoadingIndicator()}
      <CustomDrawerButtom
        bottomDrawerRef={bottomDrawerRef}
        setIsDrawerOpen={setIsDrawerOpen}
        address={address}
      />
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
    bottom: 96,
    right: 20,
    elevation: 8,
  },
  fabIcon: {
    width: 24,
    height: 24,
  },
  loadingIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LandingMap;
