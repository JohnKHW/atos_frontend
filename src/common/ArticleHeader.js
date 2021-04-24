import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { ComponentStyles } from "src/common/ContainerStyles";
// this is for the common header
const ArticleHeader = (props) => {
  const app = {
    name: "Carbonet",
  };

  const Back = () => {
    props.navigation.openDrawer();
  };

  return (
    <>
      <SafeAreaView style={ComponentStyles.header}>
        <View style={[styles.container, ComponentStyles.header]}>
          <View>
            <TouchableOpacity
              style={styles.leading}
              onPress={() => props.navigation.goBack()}
            >
              <Image
                style={styles.icon}
                source={require("src/assets/images/icon_back.png")}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.title}>{props.title}</Text>
          </View>
          <View style={styles.subcontainer}>
            <TouchableOpacity
              style={[styles.subicon, styles.icon]}
              onPress={() => props.navigation.navigate("MyGift")}
            >
              <Image source={require("src/assets/images/icon_mygift.png")} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.subicon, styles.icon]}
              onPress={() => props.navigation.navigate("Save", {})}
            >
              <Image source={require("src/assets/images/icon_favour.png")} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingBottom: 10,
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
  },
  icon: {
    tintColor: "#2d3436",
    borderWidth: 1,
    width: 30,
  },
  subicon: {
    tintColor: "#2d3436",
    transform: [{ translateX: 20 }],
    paddingHorizontal: 5,
    right: 25,
  },
  subcontainer: {
    flexDirection: "row",
  },
});
export default ArticleHeader;
