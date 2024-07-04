import React, { useState } from 'react';
import { View, 
        Text, 
        TextInput, 
        StyleSheet, 
        KeyboardAvoidingView, 
        ScrollView, 
        TouchableOpacity, 
        Image } from 'react-native';

const EditName = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSave = () => {
    // Handle save logic here
    console.log('New name saved:', firstName, lastName);
    // Optionally navigate back or to another screen
    navigation.goBack();
  };

  const isButtonDisabled = firstName.trim() === '' || lastName.trim() === '';

  return (
    <KeyboardAvoidingView style={styles.container}>
       <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.container}>
            <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('../../assets/Backbutton.png')} style={styles.icon} />
            </TouchableOpacity>
              <Text style={styles.title}>Edit Name</Text>
            </View>
            <View style={styles.editContainer}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
              style={styles.textInput}
              placeholder="First Name"
              placeholderTextColor="#9E9E9E"
              value={firstName}
              onChangeText={setFirstName}/>
              <Text style={[styles.label, {marginTop: 10}]}>Last Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Last Name"
              placeholderTextColor="#9E9E9E"
              value={lastName}
              onChangeText={setLastName}/>
            </View>
            <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSave} 
              style={[styles.buttonSave, isButtonDisabled && styles.buttonDisabled]}
              disabled={isButtonDisabled}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
          </View>
        </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
    backgroundColor: '#1E1E1E',
  },
  header: {
    position: 'relative',
    flexDirection: 'row',
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
  },
  icon: {
    width: 25,
    height: 25,
    right: 10,
    marginTop: 1,
  },
  editContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  label: {
    color: '#ffffff',
    fontSize: 19,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginLeft: 18,
  },
  textInput: {
    height: 40,
    borderColor: '#FFFFFF',
    borderBottomWidth: 1,
    color: '#FFFFFF',
    marginBottom: 10,
    width: 320,
    paddingHorizontal: 3,
  },

  buttonContainer: {
    flexDirection: 'row',
    marginTop: 40,
    paddingHorizontal: 15,
  },
  buttonSave: {
    flex: 1,
    backgroundColor: '#C20000',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#555555',
  },
  buttonText: {
    fontSize: 16, // Adjust the font size
    fontWeight: '600', // Make the text bold
    color: '#FFFFFF', // Text color
  },
});

export default EditName;
