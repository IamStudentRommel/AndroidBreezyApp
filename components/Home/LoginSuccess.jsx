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
import AppConfig from '../../app.json';

const LoginSuccess = ({firebaseFname, firebaseLname}) => {
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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    getLocation();
    fetchCrimeCategories();
    fetchRecentCrimes();
  }, []);

  useEffect(() => {
    // Simulating fetching crime feed for the selected category
    fetchCrimeFeed(selectedCategory);
  }, [selectedCategory]);

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
<<<<<<< HEAD
    let {status} = await Location.requestForegroundPermissionsAsync();
=======
    const hasPermission = await requestLocationPermission();
>>>>>>> main

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

<<<<<<< HEAD
    // console.log(location.coords.latitude, location.coords.longitude);
=======
        // Perform reverse geocoding to get the address
        const addressResult = await Location.reverseGeocodeAsync({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
>>>>>>> main

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
    console.log(category);
    // console.log(crimeFeed);
    const feed =
      category === 'All'
        ? crimeFeed
        : crimeFeed.filter(entry => entry.category === category);
    // console.log(feed);
    SetDisplayFeed(feed);
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

  const renderCrimeItem = ({item}) => (
    <View style={styles.crimeItem}>
      <View style={styles.crimeItemHeader}>
        <Text style={styles.categoryTag}>{item.category}</Text>
        <Text style={styles.date}>{item.date.split('T')[0]}</Text>
      </View>
      <Text style={styles.description}>{item.desc}</Text>
      <Text style={styles.location}>{item.location}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.inlineContainer}>
          <Text style={styles.userInfo}>
            Welcome, {capitalizeFirstLetter(firebaseFname)}{' '}
            {capitalizeFirstLetter(firebaseLname)}
          </Text>
          <TouchableOpacity
            onPressIn={handleMouseEnter}
            onPressOut={handleMouseLeave}
            activeOpacity={0.8}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../assets/pin.png')}
              style={{width: 15, height: 15}}
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

<<<<<<< HEAD
      <FlatList
          data={crimeFeed}
          renderItem={renderCrimeItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={false}
          contentContainerStyle={{ flexGrow: 1 }}
        />
=======
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
>>>>>>> main
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2fdff',
    flex: 1,
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
    color: '#1D4275',
  },
  // searchContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   marginBottom: 15,
  //   paddingHorizontal: 20,
  // },
  // searchInput: {
  //   flex: 1,
  //   height: 40,
  //   borderWidth: 1,
  //   borderColor: '#ccc',
  //   borderRadius: 5,
  //   paddingHorizontal: 40,
  //   marginRight: 10,
  //   backgroundColor: '#fff',
  // },

  userInfo: {
    fontSize: 19,
    fontStyle: 'italic',
  },
<<<<<<< HEAD
  logoutButton: {
    backgroundColor: '#f2fdff',
    padding: 10,
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  detailsText: {
    fontSize: 14,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  
=======
  swiper: {
    height: 50, // Adjust the height of the swiper as needed
  },
>>>>>>> main
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
    color: '#101935',
    fontWeight: 'bold',
  },
  selectedCategoryButton: {
    backgroundColor: '#564787',
  },
  selectedCategoryButtonText: {
    color: '#f2fdff',
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
    backgroundColor: '#DBCBD8',
    color: '#101935',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  date: {
    color: '#333',
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
  },
  location: {
    color: '#666',
  },

  tooltip: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 5,
    top: '100%',
    left: '30%', // Adjust as needed
  },
  tooltipText: {
    color: 'white',
  },
});

export default LoginSuccess;
