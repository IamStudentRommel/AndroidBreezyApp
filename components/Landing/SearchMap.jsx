import {View, StyleSheet} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import AppConfig from '../../app.json';

const SearchMap = ({setInitialLocation, clearSearch}) => {
  const {myMapKey} = AppConfig;
  // console.log(myMapKey);
  return (
    <View style={styles.searchBarContainer}>
      <GooglePlacesAutocomplete
        placeholder="Search location"
        onPress={(data, details = null) => {
          console.log('press!');
          console.log('Selected Place:', data);
          console.log('Selected Place Details:', details);
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
