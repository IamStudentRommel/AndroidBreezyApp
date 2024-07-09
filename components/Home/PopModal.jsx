import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import AppConfig from '../../app.json';

const CrimeModal = ({modalVisible, toggleModal, crimeDetails}) => {
  const [imgSrc, setImgSrc] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('null');
  const [value, setValue] = useState('');
  const [items, setItems] = useState([]);
  const [mapCat, setMapCat] = useState([]);
  const {be} = AppConfig;

  const fetchCrimeImg = async images => {
    try {
      const response = await fetch(`${be}trans/images/${images}`);
      const data = await response.json();
      setImgSrc(data['imageUrl']);
      // console.log(data);
    } catch (error) {
      // console.error('Error fetching images:', error);
      setImgSrc(null);
    }
  };

  const fetchCrimeCategory = async () => {
    try {
      const response = await fetch(`${be}/api/crimecategories`);
      const data = await response.json();
      setMapCat(data);

      const newDataArray = Object.entries(data).map(([label, value]) => ({
        label,
        value,
      }));
      newDataArray.sort((a, b) => a.label.localeCompare(b.label));
      setItems(newDataArray);
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

  useEffect(() => {
    fetchCrimeCategory();
  }, []);

  useEffect(() => {
    if (crimeDetails.images) {
      fetchCrimeImg(crimeDetails.images);
    }
    setValue(mapCat[crimeDetails.category]);
  }, [crimeDetails]);
  // console.log(crimeDetails);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={toggleModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* <View style={styles.detailsText}>
            <Text style={styles.detailsValue}>{crimeDetails.id}</Text>
          </View> */}

          <DropDownPicker
            style={[styles.drawerInput]}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onChangeValue={handleValueChange}
            placeholder="Crime Category"
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
            defaultValue={crimeDetails.desc}
          />

          <TouchableOpacity onPress={toggleModal} style={styles.button}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    width: '90%',
    height: 'auto',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 10,
  },

  category: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
    textAlign: 'left',
    marginTop: 5,
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

  button: {
    backgroundColor: '#C20000',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CrimeModal;
