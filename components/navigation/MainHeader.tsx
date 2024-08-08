import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function MainHeader() {
  return (
    <View style={styles.header}>
      <Text>Sociolla</Text>
      {/* <Image src='/images/Sociolla.svg' /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 68,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  }
});

export default MainHeader;

