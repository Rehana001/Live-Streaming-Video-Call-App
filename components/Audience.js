// Audience.js
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AgoraUIKit from 'agora-rn-uikit';

const Audience = ({ connectionData }) => {
  return (
    <View style={styles.container}>
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
});

export default Audience;