import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  Image,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';

const CustomDrawerContent = ({
  username,
  updateUsername,
  updateLogDisplay,
  updateLogFlag,
  ...props
}) => {
  const initials = username
    .split(' ')
    .map(name => name.charAt(0).toUpperCase())
    .join('');

  const capitalizeFirstLetter = str => {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const navigation = useNavigation();
  const handleLogout = () => {
    updateLogFlag(false);
    updateUsername('Guest');
    updateLogDisplay('Login');
    Alert.alert('You have successfully logout.');
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.headerContainer}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <Text style={{fontSize: 18, marginBottom: 8, color: '#ffffff'}}>
            {capitalizeFirstLetter(username)}
          </Text>
        </View>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* Logout Button */}

      {username !== 'Guest' && (
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20, // Make it circular
    backgroundColor: '#ffffff', // Set background color
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  logoutButton: {
    backgroundColor: '#C20000',
    borderWidth: 0.5,
    paddingVertical: 8,
    margin: 20,
    alignItems: 'center',
    borderRadius: 20,
    height: 45,
    marginTop: 10,
  },
  logoutText: {
    fontSize: 18,
    color: '#ffffff',
    // fontWeight: 'bold',
  },
});

export default CustomDrawerContent;
