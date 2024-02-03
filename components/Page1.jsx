import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

function Page1({navigation}) {
  const initialLocation = {
    latitude: 51.059086,
    longitude: -113.981448,
    latitudeDelta: 0.003,
    longitudeDelta: 0.003,
  };

  const markerLocations = [
    {
      id: 1,
      title: 'Zombie-XXW133',
      description: 'Semi Normal',
      coordinate: {latitude: 51.059086, longitude: -113.981148},
      icon: require('../assets/zombie.png'),
    },
    {
      id: 2,
      title: 'Zombie-GDS235',
      description: 'Fake Soldier',
      coordinate: {latitude: 51.059086, longitude: -113.981248},
      icon: require('../assets/zombie.png'),
    },
    {
      id: 3,
      title: 'Zombie-ZSX125',
      description: 'Grand Fleet',
      coordinate: {latitude: 51.059086, longitude: -113.181148},
      icon: require('../assets/zombie.png'),
    },
    {
      id: 4,
      title: 'Zombie-ABC123',
      description: 'Drunken Master',
      coordinate: {latitude: 51.059133, longitude: -113.982038},
      icon: require('../assets/zombie.png'),
    },
  ];

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_GOOGLE}
        mapType="hybrid"
        region={initialLocation}>
        {/* Markers */}
        {markerLocations.map(marker => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}>
            {marker.icon && (
              <Image source={marker.icon} style={{width: 32, height: 32}} />
            )}
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

export default Page1;
