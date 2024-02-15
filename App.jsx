import React, {useState} from 'react';
import Login from './components/Login';
import Report from './components/Report';
import LandingMap from './components/LandingMap';
import About from './components/About';
import TestPage from './components/TestPage';
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
        initialRouteName="Live Crime Monitoring"
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
          name="Report"
          component={Report}
          options={{
            drawerIcon: ({tintColor}) => (
              <Image
                source={require('./assets/report.png')}
                style={{width: 24, height: 24, tintColor: tintColor}}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Live Crime Monitoring"
          component={LandingMap}
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
        {/* <Drawer.Screen name="Test Page" component={TestPage} options={{}} /> */}
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
