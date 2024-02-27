import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Amazing Crime App</Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.textContent}>
            This app is all about crime monitoring using map functionality. The
            app allows users to view and report crimes in their area, as well as
            provide relevant information about crime statistics and safety
            measures.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Developers</Text>
          <Text style={styles.textContent}>Aivee Mae Madrelejos</Text>
          <Text style={styles.textContent}>Ko Kawaguchi</Text>
          <Text style={styles.textContent}>Romeo Costillas</Text>
          <Text style={styles.textContent}>SyntaxMel Sakalam</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Version</Text>
          <Text style={styles.textContent}>1.6.9</Text>
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#000000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#ffffff',
  },
  section: {
    marginBottom: 20,
  },
  textContent: {
    color: '#ffffff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff',
  },
  feedbackSection: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    color: '#ffffff',
  },
  feedbackInput: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: '#ffffff',
  },
});

export default About;
