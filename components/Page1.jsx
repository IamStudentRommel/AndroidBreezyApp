import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Zombies from '../data/locations.json';
import Test from '../data/test.json';

function Page1({navigation}) {
  const initialLocation = {
    latitude: 51.07421633024228,
    longitude: -114.11512839716917,
    latitudeDelta: 0.003,
    longitudeDelta: 0.003,
  };

  // Zombies.forEach(marker => {
  //   console.log('Marker Coordinate:', marker.coordinate);
  // });

  // Test.forEach(marker => {
  //   const shit = {};
  //   shit['latitude'] = marker.community_center_point.coordinates[1];
  //   shit['longitude'] = marker.community_center_point.coordinates[0];
  //   console.log(shit);
  // });

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_GOOGLE}
        mapType="hybrid"
        region={initialLocation}>
        {/* Markers */}
        {Test.map(marker => {
          const shit = {};
          shit['latitude'] = marker.community_center_point.coordinates[1];
          shit['longitude'] = marker.community_center_point.coordinates[0];

          return (
            <Marker
              key={marker.id}
              coordinate={shit}
              title={marker.category}
              description={marker.id}>
              <Image
                source={require('../assets/zombie.png')}
                style={{width: 32, height: 32}}
              />
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
}

export default Page1;
