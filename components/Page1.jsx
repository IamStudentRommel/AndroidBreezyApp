import {Button, StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

function Page2({navigation}) {
  let location = {
    latitude: 51.049999,
    longitude: -114.066666,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  };
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_GOOGLE}
        mapType="hybrid"
        region={location}></MapView>

      {/* <Button onPress={() => navigation.goBack()} title="Go back login" /> */}
    </View>
  );
}

export default Page2;
