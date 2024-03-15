import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import BottomDrawer from 'react-native-animated-bottom-drawer';

const CrimeReportDrawer = ({
  bottomDrawerRef,
  setIsDrawerOpen,
  address,
  handleCloseDrawer,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [description, setDescription] = useState('');

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

  const handleCancelPress = () => {
    handleCloseDrawer();
    clearFields();
  };

  const clearFields = () => {
    setOpen(false);
    setValue(null);
    setItems([]);
    setDescription('');
  };

  return (
    <BottomDrawer
      ref={bottomDrawerRef}
      openOnMount={false}
      startUp={false}
      onChangeVisibility={visible => setIsDrawerOpen(visible)}>
      <View style={styles.contentContainer}>
        <Text style={{marginBottom: 20, fontSize: 22, fontWeight: 'bold'}}>
          Report Crime
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
          placeholder="Crime Category"
        />
        <TextInput
          style={[styles.drawerInput, {height: 100}]}
          placeholder="Enter description"
          multiline={true}
          numberOfLines={2}
        />
        <View style={styles.drawerBtn}>
          <Button title="Submit" color="blue" />
        </View>
        <View style={styles.drawerBtn}>
          <Button title="Cancel" onPress={handleCancelPress} color="#e60000" />
        </View>
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
    borderColor: '#333333',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  drawerBtn: {
    width: '80%',
    borderRadius: 100,
    overflow: 'hidden',
    marginBottom: 10,
  },
});

export default CrimeReportDrawer;
