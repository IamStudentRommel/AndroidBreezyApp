import React from 'react';
import {View, StyleSheet} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const SearchMap = ({setInitialLocation}) => {
  const handlePlaceSelected = async (data, details = null) => {
    console.log('Selected Place:', data);
    console.log('Selected Place Details:', details);

    if (details) {
      const placeId = details.place_id;

      try {
        const response = await fetch(
          'http://localhost:3000/api/getmapcoordinate',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              placeId: placeId,
            }),
          },
        );

        const responseData = await response.json();
        if (responseData.success) {
          const {latitude, longitude} = responseData;
          console.log('Latitude:', latitude);
          console.log('Longitude:', longitude);

          setInitialLocation({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        } else {
          console.log('Error:', responseData.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <View style={styles.searchBarContainer}>
      <GooglePlacesAutocomplete
        fetchDetails={true}
        onFail={error => console.log(error)}
        placeholder="Search location"
        onPress={handlePlaceSelected}
        query={{
          key: 'AIzaSyBwT5NQwXBdsuGkTsJdcd8hnYhAXt4zkCc',
          language: 'en',
          region: 'CA',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: 15,
    backgroundColor: '#ffffff',
    elevation: 5,
    borderRadius: 20,
    width: '70%',
    alignSelf: 'center',
  },
});

export default SearchMap;
