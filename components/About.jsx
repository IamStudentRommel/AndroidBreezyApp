import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';

const About = () => {
  const [feedback, setFeedback] = useState('');

  const handleFeedbackSubmit = () => {
    console.log('Feedback submitted:', feedback);
    setFeedback('');
    alert('Thank you for your feedback!');
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Amazing Crime App</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text>
          This app is all about crime monitoring using map functionality. The
          app allows users to view and report crimes in their area, as well as
          provide relevant information about crime statistics and safety
          measures.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Developers</Text>
        <Text>Aivee Mae Madrelejos</Text>
        <Text>Ko Kawaguchi</Text>
        <Text>Romeo Costillas</Text>
        <Text>SyntaxMel Sakalam</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Version</Text>
        <Text>1.6.9</Text>
      </View>
      <View style={styles.feedbackSection}>
        <Text style={styles.sectionTitle}>Contact Us for Feedback</Text>
        <TextInput
          style={styles.feedbackInput}
          placeholder="Enter your feedback"
          multiline
          value={feedback}
          onChangeText={text => setFeedback(text)}
        />
        <Button title="Submit Feedback" onPress={handleFeedbackSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  feedbackSection: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
  },
  feedbackInput: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default About;
