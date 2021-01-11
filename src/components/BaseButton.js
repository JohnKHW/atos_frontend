import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const BaseButton = (props) => {
  return (
    <SafeAreaView>
      <TouchableOpacity style={[styles.icon, props.style]}>
        <Image style={styles.image} source={props.img} />
        <Text style={styles.title}>{props.title}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  icon: {
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    color: '#F5F5F5',
  },
});
export default BaseButton;
