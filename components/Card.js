import React from 'react';
import { StyleSheet, View } from 'react-native';

const Card = ({ children }) => {
  return (
    <View style={styles.card}>
      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 16,
    
    
    elevation: 2,
  },
});


