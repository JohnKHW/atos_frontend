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
import TutorBox from "src/components/TutorBox";
import api from "../api";
// to write some article
const WriteArticle = (props) => {
  // fields
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [hasNext, setHasNext] = useState(undefined);
  // fetching data and send
  const send = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    api
      .post("/api/articles", formData, {})
      .then((response) => {
        console.log("data", response);
        alert("Sended");
        props.navigation.navigate("Article");
      })
      .catch((error) => {
        console.log("Send article ", error);
      });
  };
  useEffect(() => {
    const clearData = props.navigation.addListener("focus", () => {
      setContent("");
      setTitle("");
      send();
    });

    return () => {
      clearData;
    };
  }, [props.navigation]);

  useEffect(() => {
    const clear = props.navigation.addListener("blur", () => {
      props.navigation.setParams({
        helpCount: null,
        hasNext: null,
        countHelp: null,
      });
    });
    return clear;
  }, [props.navigation]);

  useEffect(() => {
    if (props.route.params) {
      if (props.route.params.countHelp) {
        setHasNext(parseInt(JSON.stringify(props.route.params.countHelp)));
      } else {
        setHasNext(0);
      }
    }
  });
  return (
    <>
      <SafeAreaView style={ComponentStyles.header}>
        <View style={[styles.container, ComponentStyles.header]}>
          <View>
            <TouchableOpacity
              style={[styles.icon]}
              onPress={() => props.navigation.goBack()}
            >
              <Image source={require("src/assets/images/icon_back.png")} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.writeTitle}>Write Your Artile</Text>
          </View>
          <View style={styles.subcontainer}>
            <TouchableOpacity
              style={[styles.subicon]}
              onPress={() => {
                send();
              }}
            >
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={ComponentStyles.container_v2}>
          <View style={styles.titleContainer}>
            <TextInput
              style={styles.inputTitle}
              placeholder="Title"
              autoCapitalize="none"
              onChangeText={(title) => setTitle(title)}
              value={title}
            ></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputContent}
              multiline={true}
              numberOfLines={10}
              placeholder="Content"
              autoCapitalize="none"
              onChangeText={(content) => setContent(content)}
              value={content}
            ></TextInput>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {hasNext === 1 && (
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.7)",
            position: "absolute",
          }}
        ></View>
      )}
      {hasNext === 1 && (
        <TutorBox
          mouseNum={1}
          text={"You can write your article and send to us here."}
          mouse1left={200}
          mouse1top={200}
          circle={0}
          navigation={props.navigation}
          isPlace={1}
          place={"Transport"}
          boxtop={100}
          haveCount={0}
          hasNext={1}
        />
      )}
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

export default WriteArticle;
