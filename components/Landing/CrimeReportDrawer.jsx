import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import BottomDrawer from 'react-native-animated-bottom-drawer';

const CrimeReportDrawer = ({bottomDrawerRef, setIsDrawerOpen, address}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Accident', value: 'accident'},
    {label: 'Murder', value: 'murder'},
  ]);

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
        <Button title="Submit" />
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
