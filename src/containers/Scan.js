import React from 'react';
import {View, Text, StyleSheet,Button, useWindowDimensions} from 'react-native';
import HeaderIndex from 'src/common/HeaderIndex';
import FooterIndex from 'src/common/FooterIndex';

import {componentStyles} from 'src/common/containerStyles';

const Scan = ({navigation}) => {
  return (
     <>
        <HeaderIndex navigation={navigation}/>
        <View style={[componentStyles.container_v2,{alignItems: "center"}]}>
            <Text>Scan</Text>
            <View style={styles.scanContainer}>
                
            </View>
        </View>
    <FooterIndex style={styles.footer} navigation={navigation}/>
    </>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 84,
  },
  scanContainer: {
      borderColor:"white",
      borderWidth:2,
      borderRadius:50,
      height:484,
      marginTop: 50,
      width:270,
      
  }
});
export default Scan;
