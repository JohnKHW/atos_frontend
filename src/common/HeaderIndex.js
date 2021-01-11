import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const HeaderIndex = () => {
  const app = {
    name: 'Carbonet',
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity>
          <Image source={require('src/assets/images/icon_leading.png')} />
        </TouchableOpacity>
        <Text style={styles.title}>{app.name}</Text>
        <View style={styles.subcontainer}>
          <TouchableOpacity style={styles.subicon}>
            <Image
              source={require('src/assets/images/icon_notification.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.subicon}>
            <Image source={require('src/assets/images/icon_sharing.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.subicon}>
            <Image source={require('src/assets/images/icon_searching.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e514a',
  },
  subcontainer: {
    flexDirection: 'row',
  },
  subicon: {
    marginLeft: 25,
  },
});
export default HeaderIndex;
