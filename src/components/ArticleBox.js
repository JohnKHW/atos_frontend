import { CommonActions } from "@react-navigation/routers";
import React, { useState } from "react";

import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { NavigationActions } from "react-navigation";

const ArticleBox = (props) => {
  const [id] = useState(props.id);
  const [title] = useState(props.title);
  const [owner] = useState(props.owner);
  const [date] = useState(props.date);

  const deltaDate = () => {
    const create_date = new Date(date);
    const delta = Date.now() - new Date(date);
    const second = Math.round(delta / 1000);
    // delta time is seond
    if (second < 60) {
      return "now";
    } else if (second < 3600) {
      return Math.round(second / 60) + "m";
    } else if (second < 86400) {
      return Math.round(second / 3600) + "h";
    } else if (second < 604800) {
      return Math.round(second / 86400) + "d";
    } else if (second < 31556926) {
      return create_date.getMonth() + "-" + create_date.getDate();
    }
    return (
      create_date.getFullYear() +
      "-" +
      create_date.getMonth() +
      "-" +
      create_date.getDate()
    );
  };
  const navAction = CommonActions.navigate({
    name: "ArticleDetail",
    params: {
      id: id,
    },
  });
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("ArticleDetail", {
          id: id,
        });
      }}
    >
      <View style={styles.article}>
        <View style={styles.information}>
          <Text style={[styles.text, styles.author]}>{owner}</Text>
          <Text style={[styles.text, styles.date]}>{deltaDate()}</Text>
        </View>
        <View>
          <Text style={[styles.title, styles.text]}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  article: {
    borderBottomWidth: 2,
    width: wp("90%"),
    height: hp("7%"),
    borderColor: "#FF6319",
    flexDirection: "column",
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  rankNo: {
    borderWidth: 2,
    borderRadius: 20,
    width: 30,
    height: 30,
    marginVertical: hp("5%"),
    marginHorizontal: 20,
    borderColor: "#FF6319",
  },
  rankNoText: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    color: "#FF6319",
  },
  rankUserRing: {
    borderWidth: 2,
    borderRadius: 50,
    padding: 19,
    marginVertical: hp("1%"),
    alignItems: "center",
    justifyContent: "center",
  },
  information: {
    flexDirection: "row",
  },
  text: {
    color: "#FF6319",
    fontWeight: "bold",
  },
  title: {
    fontSize: 25,
  },
  date: {
    color: "#FF9319",
    paddingLeft: 25,
  },
  author: {
    fontSize: 17,
    color: "#FF9319",
  },
});
export default ArticleBox;
