import React, {useRef, useState} from 'react';
import {View, Text} from 'react-native';
import BottomDrawer from 'react-native-animated-bottom-drawer';

const CustomDrawerButtom = ({isOpen, onChangeVisibility}) => {
  const bottomDrawerRef = useRef(null);
  console.log('fuck buttom here');

  return (
    <BottomDrawer
      ref={bottomDrawerRef}
      openOnMount={isOpen}
      startUp={false}
      onChangeVisibility={onChangeVisibility}>
      <View style={{padding: 20}}>
        <Text>Awesome</Text>
      </View>
    </BottomDrawer>
  );
};

export default CustomDrawerButtom;
