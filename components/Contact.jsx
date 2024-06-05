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
  TouchableOpacity
} from 'react-native';
import AppConfig from '../app.json';

const Contact = ({username, email}) => {
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
            marginBottom: 10,
            fontSize: 13,
            fontStyle: 'italic',
            color: '#FFFFFF',
          }}>
          Stay Aware, Stay Safe: Your Guardian Against Crime
        </Text>

        <View style={styles.section}>
          <Text style={styles.title}>Let's get in touch.</Text>
          <Text style={styles.textContent}>
            How we can help you?</Text>
        </View>
      
        <View style={styles.feedbackSection}>
          <View style={styles.feedbackTitle}>
          <Text style={styles.sectionTitle}>Send us a message!</Text>
          <Text style={{color: '#000000', fontWeight:'bold', fontSize: 21, marginBottom: 15}}>Message</Text>
          
          <TextInput
            style={styles.feedbackInput}
            placeholder="Enter your message here"
            multiline
            value={feedback}
            onChangeText={text => setFeedback(text)}
          />
          {showAnimation ? (
            <ActivityIndicator size="large" color="#101935" />
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={handleFeedbackSubmit}>
              <Text style={styles.btnSubmit}>
                Submit
              </Text>
            </TouchableOpacity>
          )}
          </View>
        </View>
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
    height: 80,
    width: 130,
    marginTop: 15,
    marginBottom: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 20,
    alignItems: 'center',
  },
  textContent: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '400',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 17,
    color: '#000000',
  },
  feedbackSection: {
    alignSelf: 'center',
    height: '55%',
    width: '110%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
    color: '#ffffff',
    backgroundColor: '#FFFFFF',
  },
  feedbackInput: {
    height: '50%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10, 
    color: '#000000',
    textAlignVertical: 'top', // Align text to the top
    textAlign: 'left', // Align text to the left
    fontSize: 17,
  },
  contactInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    color: '#000000',
  },
  placeholder: {
    fontWeight: 'bold',
  },
  feedbackTitle: {
    margin: 10,
  },
  button: {
    backgroundColor: '#C20000',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  btnSubmit: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Contact;
