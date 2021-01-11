import React from 'react';
import {Image, Text, TouchableOpacity, StyleSheet} from 'react-native';

const NavButton = (props) => {
  return (
    <TouchableOpacity style={[styles.icon, props.style]}>
      <Image style={styles.image} source={props.img} />
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    flexDirection: 'row',
    width: 130,
    shadowRadius: 6,
    shadowOpacity: 0.52,
    shadowOffset: {
      height: 3,
    },
    shadowColor: '#9A9A9A',
  },
  title: {
    fontSize: 17,
    marginLeft: 20,
    fontWeight: 'bold',
    color: '#1E514A',
    alignSelf: 'center',
  },
});
export default NavButton;
