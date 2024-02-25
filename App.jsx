import React, {useState} from 'react';
import Login from './components/Login/Login';
import Report from './components/Report';
import LandingMap from './components/Landing/LandingMap';
import About from './components/About';
import Test from './components/Test';
import CustomDrawerContent from './components/AppRoot/CustomDrawerContent';

import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

const Drawer = createDrawerNavigator();

function App() {
  const [username, setUsername] = useState('Guest');
  const [logDisplay, setLogDisplay] = useState('Login');

  const updateLogDisplay = newLogDisplay => {
    setLogDisplay(newLogDisplay);
  };

  const updateUsername = newUsername => {
    setUsername(newUsername);
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        // initialRouteName="Live Crime Monitoring"
        initialRouteName="Test"
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
            drawerLabel: logDisplay,
            title: logDisplay,
            drawerIcon: ({tintColor}) => (
              <Image
                source={require('./assets/user.png')}
                style={{width: 24, height: 24, tintColor: tintColor}}
              />
            ),
          }}>
          {props => (
            <Login
              {...props}
              updateUsername={updateUsername}
              updateLogDisplay={updateLogDisplay}
            />
          )}
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
        <Drawer.Screen name="Test" component={Test} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
