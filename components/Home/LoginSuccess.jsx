import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import * as Location from 'expo-location';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useFocusEffect} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import ToggleSwitch from 'toggle-switch-react-native';
import CrimeModal from './PopModal';
import AppConfig from '../../app.json';

const LoginSuccess = ({firebaseFname, firebaseLname, firebaseEmail}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [crimeData, setCrimeData] = useState([]);
  const [isOn, setIsOn] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [crimeFeed, setCrimeFeed] = useState([]);
  const [displayFeed, SetDisplayFeed] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [initialLocation, setInitialLocation] = useState({
    latitude: 51.05011,
    longitude: -114.08529,
    latitudeDelta: 0.0022,
    longitudeDelta: 0.0091,
  });
  const [address, setAddress] = useState(null);
  const [categories, setCategories] = useState([]);
  const {be} = AppConfig;

  const capitalizeFirstLetter = str => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const toggleModal = data => {
    setCrimeData(data);
    setModalVisible(!modalVisible);
    // console.log(data);
  };

  const handleToggle = isOn => {
    setIsOn(isOn);
    // console.log(selectedCategory);
    // fetchCrimeFeed(selectedCategory);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const refreshPage = () => {
    console.log('Page is refreshed');
    setIsOn(false);
    setSelectedCategory('All');
    fetchRecentCrimes();
    // const navigation = useNavigation();
    // navigation.reset({
    //   index: 0,
    //   routes: [{name: 'Dashboard'}],
    // });
  };

  useFocusEffect(
    React.useCallback(() => {
      refreshPage();
      return () => {
        // Optional cleanup function
      };
    }, []),
  );

  useEffect(() => {
    getLocation();
    fetchCrimeCategories();
    fetchRecentCrimes();
  }, []);

  useEffect(() => {
    // Simulating fetching crime feed for the selected category
    fetchCrimeFeed(selectedCategory);
  }, [selectedCategory, isOn]);

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
      } catch (error) {
        console.error('Error getting location:', error);
        // console.log(null);
      }
    }
  };

  const formatAddress = addressObj => {
    const {street, city, region, country} = addressObj;
    return `${street}, ${city}, ${region}, ${country}`;
  };

  const fetchCrimeCategories = async () => {
    try {
      const response = await fetch(`${be}/api/crimecategories`);
      const data = await response.json();
      // console.log(Object.keys(data));
      setCategories(['All', ...Object.keys(data)].sort());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchRecentCrimes = async () => {
    try {
      const response = await fetch(`${be}/api/recentcrimesv2`);
      const data = await response.json();
      setCrimeFeed(data);
      SetDisplayFeed(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchCrimeFeed = category => {
    // console.log(isOn);
    // console.log(crimeFeed);
    // const feed =
    //   category === 'All'
    //     ? crimeFeed
    //     : crimeFeed.filter(entry => entry.category === category);
    // console.log(crimeFeed.filter(entry => entry.category === category));

    if (isOn) {
      if (category === 'All') {
        SetDisplayFeed(
          crimeFeed.filter(entry => entry.reporterInfo[1] === firebaseEmail),
        );
      } else {
        SetDisplayFeed(
          crimeFeed.filter(
            entry =>
              entry.category === category &&
              entry.reporterInfo[1] === firebaseEmail,
          ),
        );
      }
    } else {
      if (category === 'All') {
        SetDisplayFeed(crimeFeed);
      } else {
        SetDisplayFeed(crimeFeed.filter(entry => entry.category === category));
      }
    }

    // SetDisplayFeed(feed);
  };

  const renderCategory = ({item}) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item && styles.selectedCategoryButton,
      ]}
      onPress={() => setSelectedCategory(item)}>
      <Text
        style={[
          styles.categoryButtonText,
          selectedCategory === item && styles.selectedCategoryButtonText,
        ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const crimeDetails = item => {
    item.reporterInfo[1] === firebaseEmail
      ? toggleModal(item)
      : console.log('unauthorize');
  };

  const renderCrimeItem = ({item}) => (
    <TouchableOpacity
      style={[
        item.reporterInfo[1] === firebaseEmail
          ? styles.customItem
          : styles.crimeItem,
      ]}
      onPress={() => crimeDetails(item)}>
      <View style={styles.crimeItemHeader}>
        <Text style={[styles.categoryTag, item.reporterInfo[1] === firebaseEmail && styles.customTextColor,]}>{item.category}</Text>
        <Text style={[styles.date, item.reporterInfo[1] === firebaseEmail && styles.customTextColor,]}>{item.date.split('T')[0]}</Text>
      </View>
      <Text style={[styles.description, item.reporterInfo[1] === firebaseEmail && styles.customTextColor,]}>{item.desc}</Text>
      <Text style={[styles.location, item.reporterInfo[1] === firebaseEmail && styles.locationTextColor,]}>Calgary - {item.sector}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <Text style={styles.userInfo}>
            Hi, {capitalizeFirstLetter(firebaseFname)}!
          </Text>
          <View style={styles.toggleSwitchContainer}>
            <ToggleSwitch
              isOn={isOn}
              onColor="#00FF19"
              offColor="grey"
              label="My Reports"
              labelStyle={styles.toggleLabelStyle}
              size="medium"
              onToggle={handleToggle}
            />
          </View>
        </View>
        <View style={styles.inlineContainer}>
          <TouchableOpacity
            onPressIn={handleMouseEnter}
            onPressOut={handleMouseLeave}
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              fontWeight: '600',
              marginBottom: 15,
            }}>
            <Image
              source={require('../../assets/Location.png')}
              style={{width: 15, height: 15, marginRight: 5}}
            />

            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.locationText}>
              {address
                ? address.length > 60
                  ? `${address.slice(0, 60)}...`
                  : address
                : '...'}
            </Text>
          </TouchableOpacity>
          {isHovered && (
            <View style={styles.tooltip}>
              <Text style={styles.tooltipText}>{address}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.categoryContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
        />
      </View>

      <SwipeListView
        data={displayFeed}
        renderItem={renderCrimeItem}
        keyExtractor={(item, index) => index.toString()}
        disableRightSwipe={true} // Disable swiping from right to left
        recalculateHiddenLayout={true}
        swipeToOpenPercent={10} // Adjust the threshold for swipe to open
        swipeToClosePercent={10} // Adjust the threshold for swipe to close
        swipeDirection={['down']} // Allow swiping only in the down direction
      />
      <CrimeModal
        modalVisible={modalVisible}
        toggleModal={toggleModal}
        crimeDetails={crimeData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleSwitchContainer: {
    position: 'absolute',
    right: 15,
  },
  toggleLabelStyle: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  customTextColor: {
    color: '#FFFFFF',
  },
  locationTextColor: {
    color: '#FFFFFF',
    fontStyle: 'italic',
  },

  inlineContainer: {
    // backgroundColor: 'black',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  locationText: {
    fontSize: 12,
    color: '#FFFFFF',
  },

  userInfo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  swiper: {
    height: 50,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  categoryButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 0.5,
  },
  categoryButtonText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  selectedCategoryButton: {
    backgroundColor: '#C20000',
  },
  selectedCategoryButtonText: {
    color: '#f2fdff',
  },

  customItem: {
    backgroundColor: '#C20000',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  crimeItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  crimeItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  categoryTag: {
    fontWeight: 'bold',
    color: '#C20000',
    fontSize: 17,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  date: {
    color: '#333',
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 10,
  },
  location: {
    color: '#666',
    marginLeft: 10,
  },

  tooltip: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 5,
    top: '100%',
    left: '30%',
  },
  tooltipText: {
    color: 'white',
  },
});

export default LoginSuccess;
