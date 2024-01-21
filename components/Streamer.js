// Streamer.js
import React from 'react';
import { View } from 'react-native';
import AgoraUIKit from 'agora-rn-uikit';

const Streamer = ({ connectionData }) => {
  return (
    <View>
      <AgoraUIKit
        connectionData={connectionData}
        styleProps={{ UIKitContainer: { height: '50%', width: '100%' } }}
      />
    </View>
  );
};

export default Streamer;