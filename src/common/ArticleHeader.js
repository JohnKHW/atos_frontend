import React, { useEffect, useState } from "react";
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
export default class ArticleHeader extends React.Component {
  state = {
    title: "",
    id: 1,
  };

  constructor(props) {
    super(props);
  }
  getTitle() {
    if (typeof this.props.title !== "string") {
      return "";
    }
    if (this.props.title.length > 7) {
      const text = this.props.title.substring(0, 7);
      return text + "...";
    }
    return this.props.title;
  }
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      // Update your state here
      this.state.id = this.props.id;
      this.state.title = this.props.title;
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }
  render() {
    return (
      <>
        <SafeAreaView style={ComponentStyles.header}>
          <View style={[styles.container, ComponentStyles.header]}>
            <View>
              <TouchableOpacity
                style={[styles.icon]}
                onPress={() => this.props.navigation.goBack()}
              >
                <Image source={require("src/assets/images/icon_back.png")} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.title}>{this.getTitle()}</Text>
            </View>
            <View style={styles.subcontainer}>
              <TouchableOpacity
                style={[styles.subicon, styles.icon]}
                onPress={() => this.props.navigation.navigate("MyGift")}
              >
                <Image source={require("src/assets/images/icon_star.png")} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.subicon, styles.icon]}
                onPress={() =>
                  this.props.navigation.navigate("Reply", {
                    id: this.props.id,
                    title: this.props.title,
                  })
                }
              >
                <Image source={require("src/assets/images/icon_reply.png")} />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingBottom: 10,
    marginTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
  icon: {
    tintColor: "#2d3436",
    width: 35,
  },
  subicon: {
    tintColor: "#2d3436",
    transform: [{ translateX: 20 }],
    marginHorizontal: 5,
  },
  subcontainer: {
    flexDirection: "row",
  },
});
