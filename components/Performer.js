// Performer.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AgoraUIKit from 'agora-rn-uikit';

const Performer = ({ connectionData }) => {
  const [callTime, setCallTime] = useState(0);
  const [isCallActive, setIsCallActive] = useState(true);

  useEffect(() => {
    let timer;
    if (isCallActive) {
      timer = setInterval(() => {
        setCallTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isCallActive]);

  const endCall = () => {
    // Perform the logic to end the call
    // This is a placeholder. Replace it with the actual method provided by AgoraUIKit
    console.log('Ending the call');
    setIsCallActive(false);
  };

  return (
    <View style={styles.container}>
      <View style={{ position: 'absolute', top: 20, right: 20, zIndex: 999 }}>
        <Text style={{ color: 'white' }}>Call Time: {callTime} seconds</Text>
      </View>
      {isCallActive && (
        <TouchableOpacity style={styles.endCallButton} onPress={endCall}>
          <Text style={{ color: 'white' }}>End Call</Text>
        </TouchableOpacity>
      )}
      <AgoraUIKit
        connectionData={connectionData}
        styleProps={{ UIKitContainer: { height: '50%', width: '100%' } }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  endCallButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
});

export default Performer;