import React , {useState}from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image,Alert} from 'react-native';
import Profile from 'src/components/Profile';
import NavButton from 'src/components/NavButton';

const version = '1.0.0';
const contry = 'Hong Kong';
//const username = 'John Wong';

// here is the drawer part
const icon = {
  setting: {
    title: 'Setting',
    img: require('src/assets/images/icon_setting.png'),
  },
  history: {
    title: 'History',
    img: require('src/assets/images/icon_history.png'),
  },
  help: {
    title: 'Help',
    img: require('src/assets/images/icon_help.png'),
  },
  about: {
    title: 'About Us',
    img: require('src/assets/images/icon_about.png'),
  },
  logout: {
    title: 'Logout',
    img: require('src/assets/images/icon_logout.png'),
  },
};
const NavContainer = ({navigation}) => {
  const [username , setUsername] = useState(username);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeBtn} onPress={()=>navigation.closeDrawer()}>
        <Image style={{tintColor:"white"}} source={require('src/assets/images/icon_close.png')} />
      </TouchableOpacity>
      <Profile contry={contry} username={username} />
      <View style={styles.btn_list}>
        <NavButton img={icon.setting.img} title={icon.setting.title} navigation={navigation}/>
        <NavButton img={icon.history.img} title={icon.history.title} navigation={navigation}/>
        <NavButton img={icon.help.img} title={icon.help.title}  navigation={navigation}/>
        <NavButton img={icon.about.img} title={icon.about.title} navigation={navigation}/>
        <NavButton img={icon.logout.img} title={icon.logout.title} navigation={navigation} />
      </View>
     
    </View>
      
  );
};

const styles = StyleSheet.create({
  container: {
    //backgroundColor: '#defe13',
    paddingHorizontal: 25,
    position: 'relative',
    height: '100%',
  },
  systemInfo: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 40,
  },
  btn_list: {
    paddingVertical: 25,
    alignItems: 'center',
    flexDirection: 'column',
  },
  closeBtn: {
    paddingVertical: 40,
    alignSelf: 'flex-end',
    marginRight: 10,
  },
});
export default NavContainer;
