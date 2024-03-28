import {View, Text, StyleSheet} from 'react-native';
import Banner from './Banner';
import TrendCrime from '../../data/homeCrimeData';

const LoginSuccess = ({firebaseFname, firebaseLname}) => {
  const capitalizeFirstLetter = str => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.inlineContainer}>
          {/* <Text style={styles.userInfo}>
            Welcome, {capitalizeFirstLetter(firebaseFname)},{' '}
            {capitalizeFirstLetter(firebaseLname)}
          </Text> */}
          <Text style={styles.headline}>Crimes Headline</Text>

          {/* <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity> */}
        </View>
      </View>
      <Banner data={TrendCrime} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#00001a',
  },
  headline: {
    color: 'red',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
  },
  inlineContainer: {
    // backgroundColor: 'black',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  userInfo: {
    fontSize: 19,
    fontStyle: 'italic',
  },
});

export default LoginSuccess;
