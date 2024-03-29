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
import Banner from './Banner';
import * as Location from 'expo-location';
import {SwipeListView} from 'react-native-swipe-list-view';

const LoginSuccess = ({firebaseFname, firebaseLname, handleLogout}) => {
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

  useEffect(() => {
    getLocation();
    // Simulating fetching crime feed for the selected category
    fetchCrimeFeed(selectedCategory);
  }, [selectedCategory]);

  const getLocation = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setUserLocation(location.coords);
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
      <Text style={styles.location}>Location: {item.location}</Text>
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
          {/* <Image
            source={require('../../assets/pin.png')}
            style={{width: 15, height: 15, marginRight: -10}}
          />
          {userLocation && (
            <Text style={styles.locationText}>
              {userLocation.latitude}, {userLocation.longitude}
            </Text>
          )} */}
          {/* <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity> */}
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#aaa"
          />
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

      {/* <Banner text="Recent Crime Footages" images={images} />
      <Text style={styles.detailsText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac quam
        non lectus condimentum mollis vel id mi. Nulla facilisi. Sed sed
        interdum velit. Duis tristique libero sed eros viverra, euismod auctor
        dui tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Fusce ac quam non lectus condimentum mollis vel id mi. Nulla facilisi.
        Sed sed interdum velit. Duis tristique libero sed eros viverra, euismod
        auctor dui tincidunt. 
      </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2fdff',
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
    // borderRadius: 5,
    // fontWeight: 'bold',
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
});

export default LoginSuccess;
