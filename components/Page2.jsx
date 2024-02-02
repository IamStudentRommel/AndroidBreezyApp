import {Button, View} from 'react-native';
function Page2({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back login" />
    </View>
  );
}

export default Page2;
