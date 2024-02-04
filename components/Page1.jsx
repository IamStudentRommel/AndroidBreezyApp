import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Zombies from '../data/locations.json';

function Page1({navigation}) {
  const initialLocation = {
    latitude: 51.059086,
    longitude: -113.981448,
    latitudeDelta: 0.003,
    longitudeDelta: 0.003,
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_GOOGLE}
        mapType="hybrid"
        region={initialLocation}>
        {/* Markers */}
        {Zombies.map(marker => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}>
            <Image
              source={require('../assets/zombie.png')}
              style={{width: 32, height: 32}}
            />
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

export default Page1;
