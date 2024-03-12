import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const About = ({username}) => {
  const [feedback, setFeedback] = useState('');
  const [sending, setSending] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const capitalizeFirstLetter = str => {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // console.log(capitalizeFirstLetter(username));
  const handleFeedbackSubmit = async () => {
    const subject = encodeURIComponent(
      'Amazing Crime App User Feedback - ' + capitalizeFirstLetter(username),
    );
    const text = encodeURIComponent(feedback);

    try {
      if (username === 'Guest') {
        alert('Please login first to make some feedback to the developers');
        return;
      }
      if (text.length < 10) {
        alert('Please input a valid feedback (at least 10 characters)');
        return;
      }
      setShowAnimation(true);
      setSending(true);
      const response = await fetch(
        `https://breezy-app-be.vercel.app/util/send-email?subject=${subject}&text=${text}`,
      );

      if (response.ok) {
        alert('Your feedback was successfully sent!');
      } else {
        alert('Failed to send feedback');
      }
      setFeedback('');
      setSending(false);
      setShowAnimation(false);
    } catch (error) {
      alert('Error sending feedback:', error);
    } finally {
      setSending(false);
      setShowAnimation(false);
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
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
          {showAnimation ? (
            <ActivityIndicator size="large" color="blue" />
          ) : (
            <Button
              title="Submit Feedback"
              onPress={handleFeedbackSubmit}
              color="blue"
              disabled={sending || showAnimation}
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#00001a',
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
