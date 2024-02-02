import React, {useState} from 'react';
import Login from './components/Login';
import Page1 from './components/Page1';
import Page2 from './components/Page2';

import {View, Text, StyleSheet} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {
  const [username, setUsername] = useState('Rommel Hipos');
  // const username = '';
  const initials = username
    .split(' ')
    .map(name => name.charAt(0))
    .join('');

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.headerContainer}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <Text style={{fontSize: 18, marginBottom: 8}}>{username}</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Login"
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="Login"
          options={{drawerLabel: 'Home', title: 'WoW'}}
          component={Login}
        />
        <Drawer.Screen name="Zombie Report" component={Page1} />
        <Drawer.Screen name="Zombie Locations" component={Page2} />
        <Drawer.Screen name="Zombie Tsunami" component={Page2} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: '#0000e6', // Set background color
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutContainer: {
    borderTopWidth: 1,
    borderTopColor: 'gray',
    padding: 16,
    marginTop: 'auto', // Push the logout button to the bottom
  },
  logoutText: {
    color: 'red',
    fontSize: 16,
  },
});

export default App;
