import React from 'react';
import {View, Text, StyleSheet,Button, useWindowDimensions} from 'react-native';
import HeaderIndex from 'src/common/HeaderIndex';
import FooterIndex from 'src/common/FooterIndex';

import {componentStyles} from 'src/common/containerStyles';

const Rank = ({navigation}) => {
  return (
    <View style={componentStyles.container_v2}>
      <HeaderIndex navigation={navigation}/>
        <Text>Rank</Text>
      <FooterIndex style={styles.footer} navigation={navigation}/>

    </View>
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
export default Rank;
