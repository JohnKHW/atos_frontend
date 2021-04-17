import React from 'react';
import {View, StyleSheet} from 'react-native';

import BaseButton from 'src/components/BaseButton';
//this is for the common footer
const FooterIndex = (props) => {
  const icon = {
    article: {
      title: 'Articles',
      img: require('src/assets/images/icon_article.png'),
    },
    transport: {
      title: 'Transport',
      img: require('src/assets/images/icon_transport.png'),
    },
    scan: {
      title: 'Scan',
      img: require('src/assets/images/Icon_foodScan.png'),
    },
    rank: {
      title: 'Rank',
      img: require('src/assets/images/icon_rank.png'),
    },
  };

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.content}>
        <BaseButton title={icon.article.title} img={icon.article.img} navigation={props.navigation}/>
        <BaseButton title={icon.transport.title} img={icon.transport.img} navigation={props.navigation}/>
        <BaseButton title={icon.scan.title} img={icon.scan.img} navigation={props.navigation}/>
        <BaseButton title={icon.rank.title} img={icon.rank.img} navigation={props.navigation}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFC650',
  },
  content: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    backgroundColor: '#FFC650',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingTop: 13,
  },

  subcontainer: {
    flexDirection: 'row',
  },
  subicon: {
    marginLeft: 25,
  },
  'subicon .Text': {
    alignItems: 'center',
    fontSize: 24,
  },
});
export default FooterIndex;
