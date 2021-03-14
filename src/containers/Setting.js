import React from 'react';
import {View, Text, Image,StyleSheet, TouchableOpacity} from 'react-native';
import HeaderIndex from 'src/common/HeaderIndex';
import FooterIndex from 'src/common/FooterIndex';

import {componentStyles} from 'src/common/containerStyles';

const Setting = ({navigation}) => {
   
    return (
     <>
        <HeaderIndex navigation={navigation}/>
        <View style={[componentStyles.container_v2,{alignItems: "center"}]}>
            <Text>Setting</Text>
            <View>
                
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

});
export default Setting;
