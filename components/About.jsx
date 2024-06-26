import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Button,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import AppConfig from '../app.json';

const About = ({username, email}) => {
  const [feedback, setFeedback] = useState('');
  const [sending, setSending] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const {be} = AppConfig;

  const capitalizeFirstLetter = str => {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const handleFeedbackSubmit = async () => {
    // console.log(email);
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
        `${be}/api/send-email?from=${email}&subject=${subject}&text=${text}`,
      );
      // console.log(response);

      if (response.ok) {
        alert(
          'Thank you for reaching us, your feedback was successfully sent!',
        );
      } else {
        alert('Failed to send feedback check api send-email');
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
        <Image
          source={require('../assets/AboutLogo.png')} // Adjust the path to your logo image
          style={styles.logo}
        />
        <Text
          style={{
            textAlign: 'center',
            marginBottom: 30,
            fontStyle: 'italic',
            color: '#FFFFFF',
          }}>
          Stay Aware, Stay Safe: Your Guardian Against Crime
        </Text>
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
          <Text style={styles.textContent}>Jacob Jingco</Text>
          <Text style={styles.textContent}>Jhomer Clemente</Text>
          <Text style={styles.textContent}>Ko Kawaguchi</Text>
          <Text style={styles.textContent}>Romeo Costillas</Text>
          <Text style={styles.textContent}>Rommel Hipos</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Version</Text>
          <Text style={styles.textContent}>1.7.0</Text>
        </View>
        {/* <View style={styles.feedbackSection}>
          <Text style={styles.sectionTitle}>Contact Us for Feedback</Text>
          <TextInput
            style={styles.feedbackInput}
            placeholder="Enter your feedback"
            multiline
            value={feedback}
            onChangeText={text => setFeedback(text)}
          />
          {showAnimation ? (
            <ActivityIndicator size="large" color="#101935" />
          ) : (
            <Button
              title="Submit Feedback"
              onPress={handleFeedbackSubmit}
              color="#101935"
              disabled={sending || showAnimation}
            />
          )}
        </View> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#1E1E1E',
  },

  logo: {
    alignSelf: 'center',
    height: 90,
    width: 150,
    marginBottom: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: '#101935',
  },
  section: {
    marginBottom: 20,
    alignItems: 'center',
  },
  textContent: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
  },
  feedbackSection: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
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
    color: '#101935',
  },
});

export default About;
