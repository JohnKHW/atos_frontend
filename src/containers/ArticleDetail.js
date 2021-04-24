import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Animated,
  SafeAreaView,
} from "react-native";
import HeaderIndex from "src/common/HeaderIndex";
import FooterIndex from "src/common/FooterIndex";
import { ComponentStyles } from "src/common/ContainerStyles";
import api from "../api";
import ArticleFooter from "../common/ArticleFooter";
import ArticleHeader from "../common/ArticleHeader";

export default class ArticleDetail extends React.Component {
  state = {
    id: 0,
    details: {},
    author: {},
    page: 1,
    next_page_url: "",
    hasNext: undefined,
  };

  constructor(props) {
    super(props);
    this.setState({ id: props.route.params.id });

    this.fetchData();
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      // Update your state here
      const id = this.props.route.params.id;
      this.state.id = id;

      this.fetchData();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }
  fetchData() {
    api
      .get(`/api/articles/${this.state.id}`)
      .then((response) => {
        console.log("data", response.data);
        const details = response.data;
        const author = response.data.owner;
        this.setState({ details, author });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <>
        <ArticleHeader
          title={this.state.details.title}
          navigation={this.props.navigation}
        />
        <View style={[ComponentStyles.container_v2, { alignItems: "center" }]}>
          <View style={styles.authorContainer}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Author: </Text>
            <Text style={{ fontSize: 20 }}>{this.state.author.name}</Text>
          </View>
          <SafeAreaView style={{ height: "60%" }}>
            <Animated.ScrollView style={styles.contentContainer}>
              <Text style={styles.content}>{this.state.details.content}</Text>
            </Animated.ScrollView>
          </SafeAreaView>
        </View>
        <ArticleFooter
          style={styles.footer}
          navigation={this.props.navigation}
        />
      </>
    );
  }
}
/* const ArticleDetail = (props) => {
  //article feilds
  const [id, setId] = useState(props.route.params.id);
  const [title, setTitle] = useState(props.route.params.title);
  const [content, setContent] = useState(props.route.params.content);
  const [author, setAuthor] = useState(props.route.params.author);
  console.log("passed title ", props.route.params.title);
  console.log("passed content ", props.route.params.content);

  // get params pass from article page
  useEffect(() => {
    setId(props.route.params.id);
    setTitle(props.route.params.title);
    setContent(props.route.params.content);
    setAuthor(props.route.params.author);
    console.log("focus");
    console.log("now title ", title);
    console.log("now content ", content);
  });
  //clear data when go to next page
  useEffect(() => {
    const unsubscribe = props.navigation.addListener("blur", () => {
      setTitle("");
      setContent("");
      setAuthor("");
    });
    return () => {
      unsubscribe;
    };
  }, [props.navigation]);

  return (
    <>
      <HeaderIndex navigation={props.navigation} />
      <View style={[ComponentStyles.container_v2, { alignItems: "center" }]}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.authorContainer}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>Author: </Text>
          <Text style={{ fontSize: 20 }}>{author}</Text>
        </View>
        <SafeAreaView style={{ height: "60%" }}>
          <Animated.ScrollView style={styles.contentContainer}>
            <Text style={styles.content}>{content}</Text>
          </Animated.ScrollView>
        </SafeAreaView>
      </View>
      <FooterIndex style={styles.footer} navigation={props.navigation} />
    </>
  );
}; */

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 84,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
  content: {
    fontSize: 25,
  },
  contentContainer: {
    padding: 5,
  },
  authorContainer: {
    flexDirection: "row",
    padding: 10,
  },
});

//export default ArticleDetail;
