import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const About = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Zombie App</Text>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac
        feugiat lectus, eget consequat velit. Proin blandit lacus sit amet nunc
        lacinia, non mollis arcu consectetur. Aliquam nec risus eget elit
        interdum mattis.
      </Text>
      <Text style={styles.contact}>Contact us: contact@example.com</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  contact: {
    fontSize: 14,
    color: '#666',
  },
});

export default About;
