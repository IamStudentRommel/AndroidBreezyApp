import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import BottomDrawer from 'react-native-animated-bottom-drawer';

const CrimeReportDrawer = ({
  bottomDrawerRef,
  setIsDrawerOpen,
  username,
  email,
  initialLocation,
  address,
  compass,
  handleCloseDrawer,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(null);
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

  const handleValueChange = itemValue => {
    setValue(itemValue);
    try {
      const selected = items.find(item => item.value === itemValue);
      if (selected) {
        setSelectedLabel(selected.label);
      } else {
        console.log('Selected item not found in items array.');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleDescChangeText = text => {
    setDescription(text);
  };

  const handleSubmit = async () => {
    // console.log(description.length);
    if (selectedLabel === null) {
      alert('Please select crime category.');
      return;
    }
    if (username === 'Guest') {
      alert('Please login first to report a crime.');
      return;
    }
    if (description.length < 10) {
      alert('Please provide more details about the crime.');
      return;
    }

    const url = 'https://breezy-app-be.vercel.app//trans/addcrime';
    const data = {
      reporterInfo: [username, email],
      sector: compass,
      category: selectedLabel,
      desc: description,
      images: [],
      date: getCurrentDateTime(),
      coordinates: [initialLocation.longitude, initialLocation.latitude],
    };
    // console.log(data);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Response:', responseData);
      alert('New crime successfully reported.');
      handleCancelPress();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancelPress = () => {
    handleCloseDrawer();
    clearFields();
  };

  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  const clearFields = () => {
    setOpen(false);
    setValue(null);
    setDescription('');
    setSelectedLabel(null);
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
          onChangeValue={handleValueChange}
        />
        <TextInput
          style={[styles.drawerInput, {height: 100}]}
          placeholder="Enter description"
          multiline={true}
          numberOfLines={2}
          onChangeText={handleDescChangeText}
        />
        <View style={styles.drawerBtn}>
          <Button title="Submit" color="blue" onPress={handleSubmit} />
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
