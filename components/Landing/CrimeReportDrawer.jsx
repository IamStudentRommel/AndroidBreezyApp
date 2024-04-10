import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import BottomDrawer from 'react-native-animated-bottom-drawer';
import AppConfig from '../../app.json';
// import ImagePicker from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';

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
  const [latNear, setLatNear] = useState(0.001);
  const [LongNear, setLongNear] = useState(0.001);
  const [open, setOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [description, setDescription] = useState('');
  const [imageSource, setImageSource] = useState(null);
  const [crimeID, setCrimeID] = useState(null);
  const {be} = AppConfig;

  const fetchCrimeCategory = async () => {
    try {
      const response = await fetch(`${be}/api/crimecategories`);
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

  const generateRandomUniqueId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let uniqueId = '';

    for (let i = 0; i < 7; i++) {
      uniqueId += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
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
    setCrimeID(generateRandomUniqueId);
    const url = `${be}/trans/addcrime`;
    const data = {
      id: crimeID,
      reporterInfo: [username, email],
      sector: compass,
      category: selectedLabel,
      desc: description,
      images: [],
      date: getCurrentDateTime(),
      coordinates: [
        initialLocation.longitude + LongNear,
        initialLocation.latitude + latNear,
      ],
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
      setLatNear(latNear + 0.001);
      setLongNear(LongNear + 0.001);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancelPress = () => {
    handleCloseDrawer();
    clearFields();
    console.log(initialLocation);
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

  const selectImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImageSource(result.assets[0].uri);
        console.log(imageSource);
      }
    } catch {
      console.log('cancelled');
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
      onChangeVisibility={visible => setIsDrawerOpen(visible)}
      customStyles={{
        container: {
          backgroundColor: '#f2fdff',
          height: '115%', // Set the height to 80% of the screen
        },
      }}>
      <View style={styles.contentContainer}>
        <Text
          style={{
            marginBottom: 20,
            fontSize: 22,
            fontWeight: 'bold',
            color: '#101935',
          }}>
          Report Crime
        </Text>
        <TextInput
          style={[styles.drawerInput, {backgroundColor: '#f2fdff'}]}
          placeholder="This will be your exact location"
          editable={false}
          value={address}
        />

        <View style={styles.imageContainer}>
          {/* {console.log(imageSource)} */}
          {imageSource ? (
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => setImageSource(null)}>
              <Image
                source={require('../../assets/cross.png')}
                style={{width: 24, height: 24}}
              />
            </TouchableOpacity>
          ) : null}
          {imageSource ? (
            <Image
              source={{
                uri: imageSource,
              }}
              style={{width: 150, height: 150}}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.previewPlaceholder}>
              <Text style={styles.previewText}>
                No Image Selected (Optional only)
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.selectImageButton}
            onPress={selectImage}>
            <Image
              source={require('../../assets/photo.png')}
              style={{width: 20, height: 20, tintColor: '#fff'}}
            />
          </TouchableOpacity>
        </View>

        <DropDownPicker
          style={[styles.drawerInput]}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Crime Category"
          onChangeValue={handleValueChange}
          dropDownContainerStyle={{
            backgroundColor: '#f2fdff',
            width: '90%',
            alignSelf: 'center',
          }}
        />

        <TextInput
          style={[styles.drawerInput, {height: 80}, {marginBottom: 20}]}
          placeholder="Enter description"
          multiline={true}
          numberOfLines={2}
          onChangeText={handleDescChangeText}
        />
        <View style={styles.drawerBtn}>
          <Button title="Submit" color="#101935" onPress={handleSubmit} />
        </View>
        <View style={styles.drawerBtn}>
          <Button title="Cancel" onPress={handleCancelPress} color="gray" />
        </View>
      </View>
    </BottomDrawer>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2fdff',
  },
  drawerInput: {
    borderWidth: 1,
    borderColor: '#101935',
    backgroundColor: '#f2fdff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '90%',
    alignSelf: 'center',
  },
  drawerBtn: {
    width: '90%',
    borderRadius: 100,
    overflow: 'hidden',
    marginBottom: 10,
  },

  imageContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  removeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
    marginRight: '8%',
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
  },
  previewPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: '#f2f2f2', // Add a background color for the placeholder
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
  },
  selectImageButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
  selectImageText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CrimeReportDrawer;
