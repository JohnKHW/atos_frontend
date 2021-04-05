import React ,{useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  
} from 'react-native';
import {componentStyles} from 'src/common/containerStyles';

const HeaderIndex = ({navigation}) => {
  const app = {
    name: 'Carbonet',
  };

  const Menu = () => {
    navigation.openDrawer();
  }

  
  return (
    <SafeAreaView style={componentStyles.header}>
      <View style={[styles.container,componentStyles.header]}>
        <TouchableOpacity style={styles.leading} onPress={Menu}>
          <Image
          source={require('src/assets/images/icon_leading.png')} />
        </TouchableOpacity >
        <TouchableOpacity onPress={()=>navigation.navigate("DefaultContainer")}>
            <Text style={styles.title}>{app.name}</Text>
        </TouchableOpacity>
        
        <View style={styles.subcontainer}>
          <TouchableOpacity style={styles.subicon}>
            <Image
              source={require('src/assets/images/icon_notification.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.subicon,{bottom:5}]} onPress={()=>navigation.navigate("Save")}>
            <Image source={require('src/assets/images/icon_favour.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.subicon}
           
          >
            {
              //<Image  source={require('src/assets/images/icon_searching.png')} />
            }
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
    paddingBottom:10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
  },
  subcontainer: {
    flexDirection: 'row',
  },
  subicon: {
    marginLeft: 25,
    marginTop: 30,
    tintColor:"#2d3436",
    transform : [{translateX:20}]
  },
  leading: {
    marginTop: 30,
  },
});
export default HeaderIndex;
