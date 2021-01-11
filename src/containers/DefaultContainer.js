import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import HeaderIndex from 'src/common/HeaderIndex';
import FooterIndex from 'src/common/FooterIndex';
import NavContainer from 'src/containers/NavContainer';

const DefaultContainer = () => {
  return (
    <View style={styles.container}>
      <HeaderIndex />
      <NavContainer />
      <FooterIndex style={styles.footer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#defef3',
    height: '100%',
  },
  footer: {
    //backgroundColor: '#defef3',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 84,
  },
});
export default DefaultContainer;
