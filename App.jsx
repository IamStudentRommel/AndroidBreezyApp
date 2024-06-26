import React, {useState} from 'react';
import Login from './components/LoginV2/Login';
import Report from './components/Dashboard/Dashboard';
import LandingMap from './components/Landing/LandingMap';
import About from './components/About';
// import Test from './components/Test';
import CustomDrawerContent from './components/AppRoot/CustomDrawerContent';

import {Image} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

const Drawer = createDrawerNavigator();

function App() {
  const [username, setUsername] = useState('Guest');
  const [logDisplay, setLogDisplay] = useState('Login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('test@gmail.com');

  const updateLogEmail = newLogEmail => {
    setEmail(newLogEmail);
  };

  const updateLogDisplay = newLogDisplay => {
    setLogDisplay(newLogDisplay);
  };

  const updateUsername = newUsername => {
    setUsername(newUsername);
  };

  const updateLogFlag = newLogFlag => {
    setIsLoggedIn(newLogFlag);
  };

  const testTheme = {
    colors: {
      ...DefaultTheme.colors,
      primary: '#9AD4D6',
      card: '#101935',
      text: '#F2FDFF',
    },
  };

  return (
    <NavigationContainer
      theme={testTheme}
      drawerContentOptions={{
        activeTintColor: '#F2FDFF', // Change the color when the item is active
        itemStyle: {marginVertical: 5},
        inactiveTintColor: '#F2FDFF', // Change the color when the item is inactive
      }}>
      <Drawer.Navigator
        // initialRouteName="Live Crime Monitoring"
        initialRouteName="Login"
        screenOptions={{
          headerTintColor: '#F2FDFF',
          headerStyle: {
            backgroundColor: '#101935',
          },
        }}
        drawerContent={props => (
          <CustomDrawerContent
            {...props}
            username={username}
            updateUsername={updateUsername}
            updateLogDisplay={updateLogDisplay}
            updateLogFlag={updateLogFlag}
          />
        )}>
        <Drawer.Screen
          name="Login"
          options={{
            drawerLabel: logDisplay,
            title: logDisplay,

            drawerIcon: ({tintColor}) => (
              <Image
                source={require('./assets/home.png')}
                style={{width: 24, height: 24, tintColor: tintColor}}
              />
            ),
          }}>
          {props => (
            <Login
              {...props}
              updateLogEmail={updateLogEmail}
              updateUsername={updateUsername}
              updateLogDisplay={updateLogDisplay}
              updateLogFlag={updateLogFlag}
              isLoggedIn={isLoggedIn}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Dashboard"
          component={Report}
          options={{
            drawerIcon: ({tintColor}) => (
              <Image
                source={require('./assets/db.png')}
                style={{width: 24, height: 24, tintColor: tintColor}}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Live Crime Monitoring"
          // component={LandingMap}
          options={{
            drawerIcon: ({tintColor}) => (
              <Image
                source={require('./assets/mapIcon.png')}
                style={{width: 24, height: 24, tintColor: tintColor}}
              />
            ),
          }}>
          {props => <LandingMap {...props} username={username} email={email} />}
        </Drawer.Screen>
        <Drawer.Screen
          name="About"
          component={React.memo(() => (
            <About username={username} email={email} />
          ))}
          options={{
            drawerIcon: ({tintColor}) => (
              <Image
                source={require('./assets/about1.png')}
                style={{width: 24, height: 24, tintColor: tintColor}}
              />
            ),
          }}
        />

        {/* <Drawer.Screen name="Test" component={Test} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {

//   }
// });

export default App;
