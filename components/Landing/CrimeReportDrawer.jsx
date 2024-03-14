import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import BottomDrawer from 'react-native-animated-bottom-drawer';

const CrimeReportDrawer = ({bottomDrawerRef, setIsDrawerOpen, address}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const fetchCrimeCategory = async () => {
    try {
      const response = await fetch(
        'https://breezy-app-be.vercel.app/api/crimecategories',
      );
      const data = await response.json();
      const newDataArray = Object.entries(data).map(([label, value]) => ({
        label,
        value,
      }));
      newDataArray.sort((a, b) => a.label.localeCompare(b.label));
      setItems(newDataArray);
      // console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchCrimeCategory();
  }, []);

  return (
    <BottomDrawer
      ref={bottomDrawerRef}
      openOnMount={false}
      startUp={false}
      onChangeVisibility={visible => setIsDrawerOpen(visible)}>
      <View style={styles.contentContainer}>
        <Text style={{marginBottom: 30, fontSize: 20, fontWeight: 'bold'}}>
          - Report Crime -
        </Text>
        <TextInput
          style={[styles.drawerInput, {backgroundColor: '#f2f2f2'}]}
          placeholder="This will be your exact location"
          editable={false}
          value={address}
        />
        <DropDownPicker
          style={styles.drawerInput}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Crime Category" // Set your desired initial value here
        />
        <TextInput
          style={[styles.drawerInput, {height: 100}]}
          placeholder="Enter description"
          multiline={true}
          numberOfLines={2}
        />
        <Button title="Submit" color="blue" />
      </View>
    </BottomDrawer>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
});

export default CrimeReportDrawer;
