// Timer.js
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import PushNotification from 'react-native-push-notification';

const Timer = ({ isPerformer, switchRoles }) => {
  const [streamTime, setStreamTime] = useState(0);

  useEffect(() => {
    let timer;

    if (isPerformer) {
      timer = setInterval(() => {
        setStreamTime((prevTime) => prevTime + 1);

        // Show notification for the performer
        if (streamTime === 110) {
          showNotificationForPerformer(10);
        }

        // Switch roles after 2 minutes
        if (streamTime === 120) {
          switchRoles();
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isPerformer, streamTime]);

  const showNotificationForPerformer = (countdown) => {
    PushNotification.localNotification({
      title: 'Performance Notification',
      message: `Your performance will end in ${countdown} seconds`,
    });
  };

  return (
    <View>
      <Text style={{ color: 'white' }}>Call Time: {streamTime} seconds</Text>
    </View>
  );
};

export default Timer;