import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, Button, SafeAreaView} from 'react-native';
import BottomDrawer from 'react-native-animated-bottom-drawer';

const TestPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const bottomDrawerRef = useRef(null);

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
    bottomDrawerRef.current?.open();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Open" onPress={handleOpenDrawer} />
      <BottomDrawer
        ref={bottomDrawerRef}
        openOnMount
        startUp={false} // Disable start up animation for better customization
        onChangeVisibility={visible => setIsDrawerOpen(visible)}>
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomDrawer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TestPage;
