import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Banner from './Banner';

const LoginSuccess = ({firebaseFname, firebaseLname, handleLogout}) => {
  const images = [
    require('../../assets/z.jpg'),
    require('../../assets/logo.png'),
    require('../../assets/angel.png'),
    require('../../assets/angel.png'),
  ];
  const capitalizeFirstLetter = str => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.inlineContainer}>
          <Text style={styles.userInfo}>
            Welcome, {capitalizeFirstLetter(firebaseFname)},{' '}
            {capitalizeFirstLetter(firebaseLname)}
          </Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Banner text="Recent Crime Footages" images={images} />
      <Text style={styles.detailsText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac quam
        non lectus condimentum mollis vel id mi. Nulla facilisi. Sed sed
        interdum velit. Duis tristique libero sed eros viverra, euismod auctor
        dui tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Fusce ac quam non lectus condimentum mollis vel id mi. Nulla facilisi.
        Sed sed interdum velit. Duis tristique libero sed eros viverra, euismod
        auctor dui tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Fusce ac quam non lectus condimentum mollis vel id mi. Nulla
        facilisi. Sed sed interdum velit. Duis tristique libero sed eros
        viverra, euismod auctor dui tincidunt. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Fusce ac quam non lectus condimentum mollis
        vel id mi. Nulla facilisi. Sed sed interdum velit. Duis tristique libero
        sed eros viverra, euismod auctor dui tincidunt.
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  inlineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30,
    paddingHorizontal: 20, // Adjust spacing
    // backgroundColor: 'red',
  },
  userInfo: {
    fontSize: 19,
    fontStyle: 'italic',
  },
  logoutButton: {
    backgroundColor: '#FF5733',
    padding: 10,
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LoginSuccess;
