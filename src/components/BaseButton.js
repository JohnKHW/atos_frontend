import React ,{useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const BaseButton = (props) => {
  const [click, setClick] = useState(false);

  const goToScreen = () => {
    switch(props.title) {
      case "Articles": 
        return props.navigation.navigate("Article");
      case "Transport":
        return props.navigation.navigate("Transport");
      case "Scan":
        return props.navigation.navigate("Scan");
      case "Rank":
        return props.navigation.navigate("Rank");
    }
  }


  return (
    <SafeAreaView>
      <TouchableOpacity onPress={goToScreen} style={[styles.icon, props.style]}>
        <Image /*style={[styles.image,{tintColor: click===true? "#FF6319" : null}]}*/ source={props.img} />
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
    fontSize: 15,
    color: '#F5F5F5',
  },
});
export default BaseButton;
