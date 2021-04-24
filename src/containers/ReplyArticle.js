import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import { ComponentStyles } from "src/common/ContainerStyles";
import api from "../api";
// to write some article
export default class ReplyArticle extends React.Component {
  state = {
    id: 0,
    title: "",
    content: "",
  };

  constructor(props) {
    super(props);
    this.setState({
      id: props.route.params.id,
      title: props.route.params.title,
    });
  }

  send() {
    const formData = new FormData();
    formData.append("article_id", this.state.id);
    formData.append("content", this.state.content);
    api
      .post("/api/comments", formData, {})
      .then((response) => {
        console.log("data", response);
        alert("Sended");
        this.props.navigation.goBack();
      })
      .catch((error) => {
        console.log("Send article ", error);
      });
  }

  getTitle() {
    const title = this.state.title;
    if (typeof title !== "string") {
      return "";
    }
    if (title.length > 7) {
      const text = title.substring(0, 7);
      return text + "...";
    }
    return title;
  }
  updateState(id, title, content) {
    this.setState({ id, title, content });
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
                style={[styles.subicon]}
                onPress={() => {
                  this.send();
                }}
              >
                <Text style={styles.sendText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={ComponentStyles.container_v2}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputContent}
                multiline={true}
                numberOfLines={10}
                placeholder="Content"
                autoCapitalize="none"
                onChangeText={(content) => this.setState({ content })}
                value={this.state.content}
              ></TextInput>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </>
    );
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      // Update your state here
      const id = this.props.route.params.id;
      const title = this.props.route.params.title;
      const content = "";
      this.updateState(id, title, content);
      console.log(this.getTitle());
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
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
  writeTitle: {
    fontSize: 20,
    textAlign: "center",
    bottom: 25,
  },
  inputTitle: {
    fontSize: 20,
  },
  header: {
    backgroundColor: "grey",
    paddingTop: 80,
  },
  titleContainer: {
    borderBottomWidth: 1,
    padding: 10,
  },
  inputContent: {
    fontSize: 20,
  },
  inputContainer: {
    borderBottomWidth: 1,
    height: "75%",
    padding: 10,
    flex: 1,
  },
});
