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

const LoginSuccess = ({firebaseFname, firebaseLname}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [crimeFeed, setCrimeFeed] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [initialLocation, setInitialLocation] = useState({
    latitude: 51.05011,
    longitude: -114.08529,
    latitudeDelta: 0.0022,
    longitudeDelta: 0.0091,
  });
  const [address, setAddress] = useState(null);

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
    const hasPermission = await requestLocationPermission();
    console.log(hasPermission);
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

  const fetchCrimeFeed = category => {
    // Simulated crime feed data based on category (replace with actual fetching logic)
    let feedData = [];
    if (category === 'All') {
      // Fetch data for all categories
      const allCategories = [
        'Commercial Robbery',
        'Theft FROM Vehicle',
        'Theft OF Vehicle',
      ];
      allCategories.forEach(cat => {
        // Fetch data for each category and concatenate to feedData
        let dataForCategory = [];
        if (cat === 'Commercial Robbery') {
          dataForCategory = [
            {
              date: '2024-03-28',
              category: cat,
              description: 'Shop robbery in downtown',
              location: 'Downtown',
            },
            {
              date: '2024-03-25',
              category: cat,
              description: 'Robbery at convenience store',
              location: 'Main Street',
            },
          ];
        } else if (cat === 'Theft FROM Vehicle') {
          dataForCategory = [
            {
              date: '2024-03-27',
              category: cat,
              description: 'Theft from parked vehicles',
              location: 'Parking Lot',
            },
            {
              date: '2024-03-24',
              category: cat,
              description: 'Car break-ins reported',
              location: 'Residential Area',
            },
          ];
        } else if (cat === 'Theft OF Vehicle') {
          dataForCategory = [
            {
              date: '2024-03-26',
              category: cat,
              description: 'Car stolen from parking lot',
              location: 'Parking Lot',
            },
            {
              date: '2024-03-23',
              category: cat,
              description: 'Vehicle theft reported',
              location: 'Street',
            },
          ];
        }
        feedData = feedData.concat(dataForCategory);
      });
    } else {
      // Fetch data for the selected category
      if (category === 'Commercial Robbery') {
        feedData = [
          {
            date: '2024-03-28',
            category: category,
            description: 'Shop robbery in downtown',
            location: 'Downtown',
          },
          {
            date: '2024-03-25',
            category: category,
            description: 'Robbery at convenience store',
            location: 'Main Street',
          },
        ];
      } else if (category === 'Theft FROM Vehicle') {
        feedData = [
          {
            date: '2024-03-27',
            category: category,
            description: 'Theft from parked vehicles',
            location: 'Parking Lot',
          },
          {
            date: '2024-03-24',
            category: category,
            description: 'Car break-ins reported',
            location: 'Residential Area',
          },
        ];
      } else if (category === 'Theft OF Vehicle') {
        feedData = [
          {
            date: '2024-03-26',
            category: category,
            description: 'Car stolen from parking lot',
            location: 'Parking Lot',
          },
          {
            date: '2024-03-23',
            category: category,
            description: 'Vehicle theft reported',
            location: 'Street',
          },
        ];
      }
    }
    setCrimeFeed(feedData);
  };

  const categories = [
    'All',
    'Commercial Robbery',
    'Theft FROM Vehicle',
    'Theft OF Vehicle',
  ];

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
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>
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
                ? address.length > 20
                  ? `${address.slice(0, 20)}...`
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
        data={crimeFeed}
        renderItem={renderCrimeItem}
        keyExtractor={(item, index) => index.toString()}
        disableRightSwipe={true} // Disable swiping from right to left
        recalculateHiddenLayout={true}
        swipeToOpenPercent={10} // Adjust the threshold for swipe to open
        swipeToClosePercent={10} // Adjust the threshold for swipe to close
        swipeDirection={['down']} // Allow swiping only in the down direction
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2fdff',
  },
  headline: {
    color: 'red',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
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
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 40,
    marginRight: 10,
    backgroundColor: '#fff',
  },

  userInfo: {
    fontSize: 19,
    fontStyle: 'italic',
  },
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
  swiper: {
    height: 50, // Adjust the height of the swiper as needed
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
