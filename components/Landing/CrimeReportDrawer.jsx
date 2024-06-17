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
import LoginModal from './PopLogin';

const CrimeReportDrawer = ({
  bottomDrawerRef,
  setIsDrawerOpen,
  username,
  email,
  initialLocation,
  address,
  compass,
  handleCloseDrawer,
  fetchRecentIncidents,
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
  const [imgFileName, setImgFileName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const {be} = AppConfig;

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

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
    return uniqueId;
  };

  const handleSubmit = async () => {
    console.log(generateRandomUniqueId());
    if (username === 'Guest') {
      // alert('Please login first to report a crime.');
      toggleModal();
      return;
    }
    if (selectedLabel === null) {
      alert('Please select crime category.');
      return;
    }
    if (description.length < 10) {
      alert('Please provide more details about the crime.');
      return;
    }
    setCrimeID(generateRandomUniqueId());
    console.log(generateRandomUniqueId());
    const url = `${be}trans/addcrime`;
    const data = {
      id: generateRandomUniqueId(),
      reporterInfo: [username, email],
      sector: compass,
      category: selectedLabel,
      desc: description,
      images: [imgFileName],
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
      } else {
        const responseData = await response.json();
        console.log('Response:', responseData);
        alert('New crime successfully reported.');
        fetchRecentIncidents();
        handleCancelPress();
        setLatNear(latNear + 0.001);
        setLongNear(LongNear + 0.001);

        // Create a new FormData object to upload images
        const formData = new FormData();
        formData.append('image', {
          uri: imageSource,
          name: imgFileName,
          type: 'image/jpg',
        });
        console.log(formData);
        const url = `${be}trans/upload`;

        if (imgFileName.length > 1) {
          try {
            const response = await fetch(url, {
              method: 'POST',
              body: formData,
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
          } catch (error) {
            console.error('Error uploading image:', error);
          }
        }
      }
    } catch (error) {
      console.error('Error post data:', error);
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
        const fullPath = result.assets[0].uri.split('/');
        const exactFile = fullPath[fullPath.length - 1];
        setImgFileName(exactFile);
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
          height: '120%', // Set the height to 80% of the screen
        },
      }}>
      <View style={styles.contentContainer}>
        <Image
          source={require('../../assets/ReportCrimeLogo.png')}
          style={{width: '23%', height: '10%', bottom: 20}}
        />
        <Text
          style={{
            textAlign: 'center',
            marginBottom: 3,
            fontStyle: 'italic',
            color: '#101935',
            bottom: 13,
          }}>
          Stay Aware, Stay Safe: Your Guardian Against Crime
        </Text>
        <Text
          style={{
            marginBottom: 20,
            fontSize: 24,
            fontWeight: 'bold',
            color: '#101935',
          }}>
          Report Crime
        </Text>
        <View style={styles.locationContainer}>
          <Image
            source={require('../../assets/Location.png')}
            style={[
              styles.image,
              {bottom: 15, marginRight: 6, height: 16.5, width: 16},
            ]}
          />
          <TextInput
            style={[
              styles.location,
              {color: '#C20000', fontWeight: '500', bottom: 15},
            ]}
            placeholder="This will be your exact location"
            editable={false}
            value={address}
          />
        </View>
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
              style={{width: 25, height: 25, tintColor: '#fff'}}
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
          textStyle={{color: '#808080'}}
          dropDownContainerStyle={{
            backgroundColor: '#FFFFFF',
            width: '90%',
            alignSelf: 'center',
            fontSize: 16,
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
          <TouchableOpacity
            style={[styles.button, styles.submitButton]}
            onPress={handleSubmit}>
            <Text style={[styles.buttonText, styles.submitButtonText]}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.drawerBtn}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={handleCancelPress}>
            <Text style={[styles.buttonText, styles.cancelButtonText]}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
        <LoginModal
          modalVisible={modalVisible}
          toggleModal={toggleModal}
          handleCancelPress={handleCancelPress}
        />
      </View>
    </BottomDrawer>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  drawerInput: {
    borderWidth: 1.3,
    borderColor: '#bfbfbf',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '75%',
    alignSelf: 'center',
    textAlignVertical: 'top', // Align text to the top
    textAlign: 'left',
    fontSize: 15,
  },
  drawerBtn: {
    width: '75%',
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
    width: 140,
    height: 120,
    borderRadius: 5,
    marginRight: 30,
    backgroundColor: '#EEEEEE', // Add a background color for the placeholder
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#888',
  },
  selectImageButton: {
    backgroundColor: '#C20000',
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderRadius: 13,
  },
  selectImageText: {
    color: '#fff',
    fontSize: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  button: {
    height: 45, // Increase the height of the button
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5, // Optional: Add border radius for rounded corners
  },
  buttonText: {
    fontSize: 16, // Adjust the font size
    fontWeight: 'bold', // Make the text bold
  },
  submitButton: {
    backgroundColor: '#C20000', // Submit button color
  },
  submitButtonText: {
    color: '#fff', // Text color for submit button
  },
  cancelButton: {
    backgroundColor: 'gray', // Cancel button color
  },
  cancelButtonText: {
    color: '#fff', // Text color for cancel button
  },
});

export default CrimeReportDrawer;
