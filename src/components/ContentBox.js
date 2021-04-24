import React, { useState } from "react";

import { View, Text, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ContentBox = (props) => {
  const id = props.id;
  const position = props.position;
  const content = props.content;
  const owner = props.owner;
  const point = props.point;
  const date = props.date;

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
  const pointStr = () => {
    return `(Points: ${point})`;
  };
  const posString = () => {
    return position === 0 ? "#-" : "#" + position + "-";
  };
  return (
    <View style={styles.article}>
      <View style={styles.information}>
        <Text
          style={[
            styles.text,
            position === 0 ? styles.articlePos : styles.commentPos,
          ]}
        >
          {posString()}
        </Text>
        <Text style={[styles.text, styles.author]}>{owner}</Text>
        <Text style={[styles.text]}>{pointStr()}</Text>
        <Text style={[styles.text, styles.date]}>{deltaDate()}</Text>
      </View>
      <View>
        <Text style={[styles.text, styles.content]}>{content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  article: {
    width: wp("100%"),
    minHeight: hp("1%"),
    borderColor: "#FF6319",
    flexDirection: "column",
    backgroundColor: "rgba(255, 180, 80, 0.59)",
    marginVertical: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  articlePos: {
    color: "#FFFFFF",
  },
  information: {
    flexDirection: "row",
  },
  text: {
    color: "#FF9319",
    fontWeight: "bold",
    fontSize: 17,
  },
  content: {
    color: "#FF6319",
    fontSize: 20,
    paddingHorizontal: 10,
  },
  date: {
    paddingLeft: 25,
  },
});
export default ContentBox;
