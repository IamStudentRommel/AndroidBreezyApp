import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const Filter = ({options, onSelect}) => {
  const [selectedOption, setSelectedOption] = useState(options[3]);

  const handleOptionSelect = option => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.button,
            selectedOption === option ? styles.selectedButton : null,
          ]}
          onPress={() => handleOptionSelect(option)}>
          <Text style={styles.buttonText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    backgroundColor: '#f2fdff',
    padding: 5,
    margin: 3,
    borderRadius: 15,
    minWidth: 50,
    alignItems: 'center',
    borderWidth: 0.5,
  },

  selectedButton: {
    backgroundColor: '#9AD4D6',
  },

  buttonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Filter;
