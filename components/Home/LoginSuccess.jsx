import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  FlatList,
} from 'react-native';
import * as Location from 'expo-location';
import {SwipeListView} from 'react-native-swipe-list-view';

const LoginSuccess = ({firebaseFname, firebaseLname}) => {
  const images = [
    // require('../../assets/z.jpg'),
    require('../../assets/logo.png'),
    require('../../assets/angel.png'),
    require('../../assets/angel.png'),
  ];

  const capitalizeFirstLetter = str => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const [userLocation, setUserLocation] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [crimeFeed, setCrimeFeed] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

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

  const getLocation = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();

    let location = await Location.getCurrentPositionAsync({});

    // console.log(location.coords.latitude, location.coords.longitude);

    const addressResult = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    // console.log(addressResult[0].formattedAddress);
    setUserLocation(addressResult[0].formattedAddress);
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
              {userLocation
                ? userLocation.length > 20
                  ? `${userLocation.slice(0, 20)}...`
                  : userLocation
                : '...'}
            </Text>
          </TouchableOpacity>
          {isHovered && (
            <View style={styles.tooltip}>
              <Text style={styles.tooltipText}>{userLocation}</Text>
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

      <FlatList
          data={crimeFeed}
          renderItem={renderCrimeItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={false}
          contentContainerStyle={{ flexGrow: 1 }}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2fdff',
    flex: 1,
  },
  inlineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30,
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
