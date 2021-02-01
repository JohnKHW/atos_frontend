import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const Profile = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profileCont}>
        <Image
          style={styles.profile}
          source={require('src/assets/images/icon_icon.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.contry}>
        <Image source={require('src/assets/images/icon_hongkongFlag.png')} />
        <Text style={styles.loca}>{props.contry}</Text>
      </TouchableOpacity>
      <View style={styles.welcome}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.welcomeText}>{props.username}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  welcome: {
    marginTop: 24,
  },
  welcomeText: {
    //color: '#1E514A',
    color:"white",
    fontSize: 24,
    fontWeight: 'bold',
    shadowRadius: 6,
    shadowOpacity: 0.52,
    shadowOffset: {
      height: 4,
    },
    shadowColor: '#9A9A9A',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  loca: {
    fontSize: 14,
    alignSelf: 'center',
    color: '#676767',
  },
  container: {
    //backgroundColor: '#def113',
    marginBottom: 16,
  },
  profile: {
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 500,
  },
  contry: {
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: 174,
    fontSize: 14,
    paddingHorizontal: 25,
    paddingVertical: 5,
    transform: [{translateY: -10}],
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    shadowRadius: 6,
    shadowOpacity: 0.52,
    shadowOffset: {
      height: 4,
    },
    shadowColor: '#9A9A9A',
  },
  profileCont: {
    margin: 6,
    alignSelf: 'center',
    width: 200,
    height: 200,
    backgroundColor: '#EFEFEF',
    borderRadius: 500,
    shadowRadius: 6,
    shadowOpacity: 0.52,
    shadowOffset: {
      height: 1,
    },
    shadowColor: '#9A9A9A',
  },
});
export default Profile;
