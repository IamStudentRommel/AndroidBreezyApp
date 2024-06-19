import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  ImageBackground,
} from 'react-native';

import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import ClusteredMapView from 'react-native-map-clustering';
import * as Location from 'expo-location';
import mapCustomStyle from '../../data/mapCustomStyle.json';
import CustomDrawerButtom from './CrimeReportDrawer';
import SearchMap from './SearchMap';
import CrimeModal from './PopModal';
import AppConfig from '../../app.json';

const LandingMap = ({username, email}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [crimeDetails, setCrimeDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const bottomDrawerRef = useRef(null);
  const {be} = AppConfig;

  const selectCrime = data => {
    setCrimeDetails(data);
    toggleModal();
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
    bottomDrawerRef.current?.open();
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    bottomDrawerRef.current?.close();
  };

  const clearSearchText = () => {
    setClearSearch(prevState => !prevState);
  };
  //Drawer part end
  const [compass, setCompass] = useState(null);
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

  const getDirection = (latitude, longitude) => {
    const centerLat = 51.0486;
    const centerLng = -114.0708;

    if (latitude > centerLat) {
      if (longitude > centerLng) {
        return 'North East';
      } else if (longitude < centerLng) {
        return 'North West';
      } else {
        return 'North';
      }
    } else if (latitude < centerLat) {
      if (longitude > centerLng) {
        return 'South East';
      } else if (longitude < centerLng) {
        return 'South West';
      } else {
        return 'South';
      }
    } else {
      if (longitude > centerLng) {
        return 'East';
      } else if (longitude < centerLng) {
        return 'West';
      } else {
        return 'Centre';
      }
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

          // console.log(addressResult);

          // const direction = getDirection(51.118811, -114.043859);
          const direction = getDirection(coords.latitude, coords.longitude);
          setCompass(direction);
        } else {
          setAddress(null);
          setCompass(null);
        }
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
      const response = await fetch(`${be}/api/recentcrimesv2`);
      const data = await response.json();
      // const data = Test;
      setIncidents(data);
      // console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const mapRef = useRef(null);
  const reCenter = () => {
    console.log('reCenter');
    getLocation();
    mapRef.current?.animateToRegion(initialLocation, 100);
    // console.log(compass);
  };

  useEffect(() => {
    fetchRecentIncidents();
    console.log('x');
  }, []);

  useEffect(() => {
    getLocation();
  }, []);

  const renderLoadingIndicator = () => (
    // <View style={[StyleSheet.absoluteFill, styles.loadingIndicator]}>
    //   <ActivityIndicator size="large" color="#0000ff" />
    //   <Text style={styles.loadingText}>Checking your location</Text>
    // </View>
    <ImageBackground
      source={require('../../assets/IntroBackground.png')}
      style={styles.background}>
      <View style={styles.overlay}>
        <Image
          source={require('../../assets/IntroLogo.png')}
          style={styles.logo}
        />
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>L O A D I N G . . .</Text>
      </View>
    </ImageBackground>
  );

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <ClusteredMapView
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
          {incidents.length > 0 &&
            incidents.map(marker => {
              // console.log(incidents);
              try {
                const coordinates = {
                  latitude: marker.coordinates[1],
                  longitude: marker.coordinates[0],
                };
                const desc = `${marker.date.split('T')[0]} ${marker.category}`;
                const crimeInfo = `${marker.id}|||${marker.date}|||${marker.desc}|||${marker.category}|||${marker.reporterInfo}|||${marker.images}`;
                return (
                  <Marker
                    key={marker.id}
                    coordinate={coordinates}
                    title={marker.sector}
                    onPress={() => selectCrime(crimeInfo)} // Pass crime details as argument
                    description={desc}>
                    <Image
                      source={require('../../assets/Crime.png')}
                      style={{width: 30, height: 30}}
                    />
                  </Marker>
                );
              } catch (error) {
                console.log(error);
                return null;
              }
            })}
        </ClusteredMapView>

        <TouchableOpacity
          style={styles.fab}
          onPress={handleOpenDrawer}
          activeOpacity={0.7}>
          <Image
            source={require('../../assets/reportButton.png')}
            style={styles.fabIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.fab2}
          onPress={reCenter}
          activeOpacity={0.7}>
          <Image
            source={require('../../assets/Direction.png')}
            style={styles.fabIcon}
          />
        </TouchableOpacity>
        {/* <Button title="Open Modal" onPress={toggleModal} /> */}

        {/* SearchBar */}
        <SearchMap setInitialLocation={setInitialLocation} />
      </View>
      {isLoading && renderLoadingIndicator()}
      <CustomDrawerButtom
        bottomDrawerRef={bottomDrawerRef}
        setIsDrawerOpen={setIsDrawerOpen}
        username={username}
        email={email}
        initialLocation={initialLocation}
        address={address}
        compass={compass}
        handleCloseDrawer={handleCloseDrawer}
        fetchRecentIncidents={fetchRecentIncidents}
      />
      <CrimeModal
        modalVisible={modalVisible}
        toggleModal={toggleModal}
        crimeDetails={crimeDetails}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)', // Transparent black
    width: '100%',
    height: '100%',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  logo: {
    resizeMode: 'contain',
  },
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
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 96,
    right: 20,
    elevation: 8,
  },
  fabIcon: {
    width: 56,
    height: 56,
  },
});

export default LandingMap;
