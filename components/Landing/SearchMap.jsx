import React, {useRef} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapConfig from '../../mapconf.json';

const SearchMap = ({setInitialLocation}) => {
  const ref = useRef();
  const {be} = MapConfig;

  const handlePlaceSelected = async (data, details = null) => {
    if (details) {
      try {
        const {lat, lng} = details.geometry.location;
        console.log('Latitude:', lat);
        console.log('Longitude:', lng);

        setInitialLocation({
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <View style={styles.searchBarContainer}>
      <GooglePlacesAutocomplete
        ref={ref}
        fetchDetails={true}
        onFail={error => console.log(error)}
        placeholder="Search location"
        onPress={handlePlaceSelected}
        query={{
          key: MapConfig.mapKey,
          language: 'en',
          components: 'country:ca:', // Restrict results to Canada
          location: '51.0447,-114.0719', // Calgary coordinates (latitude,longitude)
          radius: '20000', // 20 kilometers radius
        }}
        renderRightButton={() => (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              ref.current?.clear();
            }}>
            <Image
              source={require('../../assets/delete-sign.png')}
              style={styles.clearIcon}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 15,
    backgroundColor: '#ffffff',
    elevation: 5,
    borderRadius: 20,
    width: '90%',
    alignSelf: 'center',
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    borderRadius: 20,
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearIcon: {
    height: 15,
    width: 15,
  },
});

export default SearchMap;
