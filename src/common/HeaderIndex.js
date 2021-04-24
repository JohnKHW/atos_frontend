import React ,{useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,

  
} from 'react-native';
import {ComponentStyles} from 'src/common/ContainerStyles';
// this is for the common header
const HeaderIndex = (props) => {
  const app = {
    name: 'Carbonet',
  };

  const Menu = () => {
    props.navigation.openDrawer();
  }
  
  return (
    <>

    <SafeAreaView style={ComponentStyles.header}>
      
      <View style={[styles.container,ComponentStyles.header]}>
        
        <TouchableOpacity style={styles.leading} onPress={Menu}>
          <Image
            source={require('src/assets/images/icon_leading.png')} />
        </TouchableOpacity >
        <TouchableOpacity onPress={()=>props.navigation.navigate("DefaultContainer",{
          helpCount:null,
          hasNext:null,
          countHelp:null
        })}>
            <Text style={styles.title}>{app.name}</Text>
        </TouchableOpacity>
        
        <View style={styles.subcontainer}>

        <TouchableOpacity style={styles.subicon} onPress={()=>props.navigation.navigate("Gift",{
            helpCount:null,
            hasNext:null,
            countHelp:null
          })}>
            <Image
              source={require('src/assets/images/icon_gift.png')}
            />
          </TouchableOpacity>

        <TouchableOpacity style={styles.subicon} onPress={()=>props.navigation.navigate("MyGift")}>
            <Image
              source={require('src/assets/images/icon_mygift.png')}
            />
          </TouchableOpacity>


       
       

          <TouchableOpacity style={[styles.subicon,{bottom:5}]} onPress={()=>props.navigation.navigate("Save",{
            helpCount:null,
            hasNext:null,
            countHelp:null
          })}>
            <Image source={require('src/assets/images/icon_favour.png')} />
          </TouchableOpacity>
        </View>
        
      </View>
      
    </SafeAreaView>
 
    </>
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
    transform : [{translateX:20}],
    borderWidth:1,
    right:25,
  },
  leading: {
    marginTop: 30,
  },
});
export default HeaderIndex;
