import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const Button = ({ label, onPress, width } : any) => (
  <TouchableOpacity
    style={[styles.button, { width: width || '100%' }]}
    onPress={onPress}
  >
    <Text style={styles.text}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
