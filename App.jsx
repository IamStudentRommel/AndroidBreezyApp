import React, {useState} from 'react';
import Login from './components/Login';
import Page1 from './components/Page1';
import Page2 from './components/Page2';
import About from './components/About';
import TestPage from './components/TestPage';
import DBConTest from './components/DBConTest';
import CustomDrawerContent from './components/CustomDrawerContent';

import {Image, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

const Drawer = createDrawerNavigator();

function App() {
  const [username, setUsername] = useState('Guest');

  const updateUsername = newUsername => {
    setUsername(newUsername);
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Login"
        drawerContent={props => (
          <CustomDrawerContent
            {...props}
            username={username}
            updateUsername={updateUsername}
          />
        )}>
        <Drawer.Screen
          name="Login"
          options={{
            drawerLabel: 'Login',
            title: 'WoW',
            drawerIcon: ({tintColor}) => (
              <Image
                source={require('./assets/user.png')}
                style={{width: 24, height: 24, tintColor: tintColor}}
              />
            ),
          }}>
          {props => <Login {...props} updateUsername={updateUsername} />}
        </Drawer.Screen>
        <Drawer.Screen
          name="Zombie Test"
          component={Page1}
          options={{
            drawerIcon: ({tintColor}) => (
              <Image
                source={require('./assets/map.png')}
                style={{width: 24, height: 24, tintColor: tintColor}}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Zombie Test2"
          component={Page2}
          options={{
            drawerIcon: ({tintColor}) => (
              <Image
                source={require('./assets/map.png')}
                style={{width: 24, height: 24, tintColor: tintColor}}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="About"
          component={About}
          options={{
            drawerIcon: ({tintColor}) => (
              <Image
                source={require('./assets/information.png')}
                style={{width: 24, height: 24, tintColor: tintColor}}
              />
            ),
          }}
        />
        <Drawer.Screen name="Test Page" component={TestPage} options={{}} />
        <Drawer.Screen name="DBConTest" component={DBConTest} options={{}} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
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
