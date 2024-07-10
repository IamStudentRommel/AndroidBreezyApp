import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import AppConfig from '../../app.json';

const CrimeModal = ({modalVisible, toggleModal, crimeDetails}) => {
  const [imgSrc, setImgSrc] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('null');
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [mapCat, setMapCat] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const {be} = AppConfig;

  const fetchCrimeImg = async images => {
    try {
      const response = await fetch(`${be}trans/images/${images}`);
      const data = await response.json();
      setImgSrc(data['imageUrl']);
    } catch (error) {
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
    // setIsEditable(false);
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

  const handleEditSave = () => {
    
    if (isEditable) {
      // Add save functionality here
    }
    setIsEditable(!isEditable);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={toggleModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Image
              source={require('../../assets/Close.png')}
              style={{width: 13, height: 13}}
            />
          </TouchableOpacity>
          <DropDownPicker
            style={[
              styles.drawerInput,
              {borderColor: isEditable ? '#000000' : '#bfbfbf'},
            ]}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onChangeValue={handleValueChange}
            placeholder="Crime Category"
            textStyle={{color: isEditable ? '#000000' : '#808080'}}
            dropDownContainerStyle={{
              backgroundColor: '#FFFFFF',
              width: '90%',
              alignSelf: 'center',
              fontSize: 16,
            }}
            disabled={!isEditable}
          />
          <TextInput
            style={[
              styles.drawerInput,
              {
                height: 130,
                borderColor: isEditable ? '#000000' : '#bfbfbf',
                color: isEditable ? '#000000' : '#808080',
              },
            ]}
            placeholder="Enter description"
            multiline={true}
            numberOfLines={2}
            defaultValue={crimeDetails.desc}
            editable={isEditable}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              onPress={() => {
                // Implement delete functionality
              }}>
              <Image
                source={require('../../assets/deleteicon.png')}
                style={{width: 12, height: 12, marginRight: 5}}
              />
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.editButton]}
              onPress={handleEditSave}>
              <Image
                source={
                  isEditable
                    ? require('../../assets/saveicon.png')
                    : require('../../assets/editicon.png')
                }
                style={{width: 12, height: 12, marginRight: 5}}
              />
              <Text style={styles.buttonText}>
                {isEditable ? 'Save' : 'Edit'}
              </Text>
            </TouchableOpacity>
          </View>
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
  closeButton: {
    marginLeft: 'auto',
    marginRight: 13,
    marginBottom: 10,
  },
  drawerInput: {
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
    marginTop: 10,
    width: '95%',
    alignSelf: 'center',
    textAlignVertical: 'top',
    textAlign: 'left',
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    width: '25%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#C20000',
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: '#007BFF',
    marginRight: 8,
    justifyContent: 'center',
  },
});

export default CrimeModal;
