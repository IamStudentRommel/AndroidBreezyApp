import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import testdata from '../data/test.json';

const Page1 = () => {
  const [incidents, setIncidents] = useState([]);
  const [initialLocation, setInitialLocation] = useState({
    latitude: 51.05011,
    longitude: -114.08529,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://data.calgary.ca/resource/78gh-n26t.json',
        );
        const data = await response.json();
        setIncidents(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_GOOGLE}
        mapType="hybrid"
        region={initialLocation}>
        {/* Markers */}
        {testdata.map(marker => {
          if (marker.year === '2023') {
            try {
              const coordinates = {
                latitude: marker.community_center_point.coordinates[1],
                longitude: marker.community_center_point.coordinates[0],
              };
              // console.log(coordinates);
              return (
                <Marker
                  key={marker.id}
                  coordinate={coordinates}
                  title={marker.category}
                  description={marker.id}>
                  <Image
                    source={require('../assets/zombie.png')}
                    style={{width: 32, height: 32}}
                  />
                </Marker>
              );
            } catch (error) {
              return null;
            }
          }
        })}
      </MapView>
    </View>
  );
};

export default Page1;
