// App.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import PushNotification from 'react-native-push-notification';
import AgoraUIKit from 'agora-rn-uikit';
import Timer from './components/Timer';
import Streamer from './components/Streamer';

const App = () => {
  const [isPerformer, setIsPerformer] = useState(true); // Start with performer
  const [performerTimer, setPerformerTimer] = useState(0);
  const [audienceTimer, setAudienceTimer] = useState(120); // Initial value for audience timer

  const agoraAppId = 'baccf761e88b4d16adc966a5fd80dca6';
  const connectionData = {
    appId: 'baccf761e88b4d16adc966a5fd80dca6',
    channel: 'test',
    token: '007eJxTYKjMyP/ZZLdtiYfUrcWT+R/fbZx97eAH/dJ1nIaMizi2tx9SYEhKTE5OMzczTLWwSDJJMTRLTEm2NDNLNE1LsTBISU40K3Kak9oQyMiw63Q2IyMDBIL4LAwlqcUlDAwA0Lkhhw==',
  };

  useEffect(() => {
    let timer;

    if (isPerformer) {
      timer = setInterval(() => {
        setPerformerTimer((prevTime) => prevTime + 1);
        setAudienceTimer((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));

        // Show notification for the performer
        if (performerTimer === 110) {
          showNotificationForPerformer(10);
        }

        // Switch roles after 2 minutes
        if (performerTimer === 120) {
          switchRoles();
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isPerformer, performerTimer]);

  const switchRoles = () => {
    setIsPerformer((prevIsPerformer) => !prevIsPerformer);
    setPerformerTimer(0);
    setAudienceTimer(120); // Reset audience timer
    // Notify the audience about the next performer
    showNotificationForAudience('John Doe'); // Replace with the actual name
  };

  const showNotificationForPerformer = (countdown) => {
    PushNotification.localNotification({
      title: 'Performance Notification',
      message: `Your performance will end in ${countdown} seconds`,
    });
  };

  const showNotificationForAudience = (nextPerformer) => {
    PushNotification.localNotification({
      title: 'Audience Notification',
      message: `Next performer will be Mr. ${nextPerformer}`,
    });
  };

  return (
    <View style={styles.container}>
      {isPerformer ? (
        <Streamer connectionData={connectionData} />
      ) : (
        <AgoraUIKit
          connectionData={connectionData}
          styleProps={{ UIKitContainer: { height: '50%', width: '100%' } }}
        />
      )}

      <View style={styles.overlay}>
        <Text style={styles.timerText}>Performer Timer: {performerTimer} seconds</Text>
        <Text style={styles.timerText}>Audience Timer: {audienceTimer} seconds</Text>
      </View>

      <TouchableOpacity style={styles.switchRoleButton} onPress={
      switchRoles}>
        <Text style={{ color: 'white' }}>
          Switch to {isPerformer ? 'Performer' : 'Audience'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  timerText: {
    color: 'white',
    marginBottom: 10,
  },
  switchRoleButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
});

export default App;