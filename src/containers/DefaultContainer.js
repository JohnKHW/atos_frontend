import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import HeaderIndex from "src/common/HeaderIndex";
import FooterIndex from "src/common/FooterIndex";

import { ComponentStyles } from "src/common/ContainerStyles";
import NetPoint from "src/components/NetPoint";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SavePost from "src/common/SavePost";
import TutorBox from "src/components/TutorBox";
import SaveHistory from "src/common/SaveHistory";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import api from "../api";
export default class DefaultContainer extends React.Component {
  state = {
    userData: {},
    countryData: {},
    countHelp: undefined,
    countSave: 0,
  };
  constructor(props) {
    super(props);
    this.fetchData();
    
  }
  fetchData() {
    api
      .get("/api/user")
      .then((response) => {

        const userData = response.data;
        const countryData = response.data.country;
        this.setState({ userData, countryData });
        
        console.log("name" , userData.name);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  updateSavedPost = async () => {
    if(this.countSave === 0){
      if (SavePost.get().length === 0) {
        console.log("it is null");
        const savedPost = JSON.parse(await AsyncStorage.getItem("SavedPost"));
        console.log(
          "Saved post in storage",
          JSON.parse(await AsyncStorage.getItem("SavedPost"))
        );
        SavePost.setSave(savedPost);
        console.log("done");
        console.log("Saved post ", SavePost.get());
        this.setState({countSave: this.state.countSave++});
      } else {
        console.log("nothing happened ", SavePost.get());
      }
   }
  };
  updateHistory = async () => {
    if(countSave===0){
      if (SaveHistory.get().length === 0) {
        console.log("it is null");
        const savedHistory = JSON.parse(await AsyncStorage.getItem("SavedPost"));
        console.log(
          "Saved post in storage",
          JSON.parse(await AsyncStorage.getItem("SavedPost"))
        );
        SaveHistory.setSave(savedHistory);
        console.log("done");
        console.log("Saved post ", SaveHistory.get());
        this.setState({countSave: this.state.countSave++});
      } else {
        console.log("nothing happened ", SaveHistory.get());
      }
   }
  };
  
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("blur",() => {
        this.props.navigation.setParams({
          helpCount:null,
          hasNext:null,
          countHelp:null
        })
    })
    this.add = this.props.navigation.addListener('focus', () => {
        this.updateSavedPost();
        this.updateHistory();
    })
  }

  componentWillUnmount(){
    this._unsubscribe();
    this.add();
  }

  render() {
    
    const {navigation} = this.props;
    const {route} = this.props;
    if(route.params){
      this.countHelp = route.params.countHelp;

      console.log("props route", route);
    }
    return (
      <View style={ComponentStyles.container_v2}>
        <HeaderIndex navigation={navigation} />

        <View>
          <Text style={[styles.welcomeText, { marginTop: 50 }]}>
            Welcome Back!
          </Text>
          <Text style={styles.welcomeText}>{this.state.userData.name}</Text>
          <View style={styles.iconContain}>
            <Image
              style={styles.icon}
              source={require("src/assets/images/icon_icon.png")}
            ></Image>
            <View style={styles.contry}>
              <Image
                source={require("src/assets/images/icon_hongkongFlag.png")}
              />
              <Text style={styles.loca}>{this.state.countryData.name}</Text>
            </View>
          </View>
          <NetPoint
            netpoint={this.state.userData.net_points}
            text="you now have earned"
          />
        </View>
        <FooterIndex style={styles.footer} navigation={navigation} />
        {this.countHelp === 1 && (
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.7)",
            position: "absolute",
          }}
        ></View>
      )}
      {this.countHelp === 1 && (
        <TutorBox
          mouseNum={2}
          text={
            "You can set your information and see the current net points here!"
          }
          mouse1left={wp("15%")}
          mouse1top={hp("4%")}
          mouse2left={wp("70%")}
          mouse2top={hp("55%")}
          circle={0}
          navigation={navigation}
          isPlace={1}
          place={"Article"}
          haveCount={0}
          boxtop={0}
          hasNext={this.countHelp}
        />
      )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //alignSelf: 'center',
  },
  footer: {
    //backgroundColor: '#defef3',
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: hp("10%"),
  },
  loca: {
    fontSize: hp("1.8%"),
    alignSelf: "center",
    color: "#676767",
  },
  iconContain: {
    margin: 6,
    alignSelf: "center",
    width: wp("45%"),
    height: hp("21.5%"),
    backgroundColor: "#EFEFEF",
    borderRadius: 500,
    shadowRadius: 6,
    shadowOpacity: 0.52,
    shadowOffset: {
      height: 1,
    },
    shadowColor: "#9A9A9A",
  },
  icon: {
    alignSelf: "center",
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  contry: {
    alignSelf: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: wp("45%"),
    fontSize: 14,
    paddingHorizontal: 25,
    paddingVertical: 5,
    marginTop: 25,
    marginBottom: 25,
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    shadowRadius: 6,
    shadowOpacity: 0.52,
    shadowOffset: {
      height: 4,
    },
    shadowColor: "#9A9A9A",
  },
  welcomeText: {
    color: "#f5f5f5",
    fontSize: 24,
    fontWeight: "bold",
    shadowRadius: 6,
    shadowOpacity: 0.52,
    shadowOffset: {
      height: 4,
    },
    shadowColor: "#9A9A9A",
    justifyContent: "center",
    alignSelf: "center",
    transform: [{ translateY: -15 }],
  },
});
/* 
const Drawer = createDrawerNavigator();
//this is the main page
const DefaultContainer = (props) => {
  // fields
  const [username, setUsername] = useState("Brian Wong");
  const [countSave, setCountSave] = useState(0);
  const [countHelp, setCountHelp] = useState(0);

  // get the username from local storage
  const getUserName = async () => {
    try {
      setUsername(await AsyncStorage.getItem("username"));
    } catch (e) {
      console.error(e);
    }
  };
  // update post data
  const updateSavedPost = async () => {
    if (SavePost.get().length === 0) {
      console.log("it is null");
      const savedPost = JSON.parse(await AsyncStorage.getItem("SavedPost"));
      console.log(
        "Saved post in storage",
        JSON.parse(await AsyncStorage.getItem("SavedPost"))
      );
      SavePost.setSave(savedPost);
      console.log("done");
      console.log("Saved post ", SavePost.get());
      setCountSave((countSave) => countSave++);
    } else {
      console.log("nothing happened ", SavePost.get());
    }
  };
  // enter page then update save post
  useEffect(() => {
    const add = props.navigation.addListener("focus", () => {
      if (countSave === 0) {
        updateSavedPost();
      }
      getUserName();
    });
    return () => {
      add;
    };
  }, [props.navigation]);
  useEffect(() => {
    if (props.route.params) {
      setCountHelp(parseInt(JSON.stringify(props.route.params.countHelp)));
    } else {
      //Alert.alert("nothing");
      setCountHelp(0);
    }
  });
  return (
    <View style={ComponentStyles.container_v2}>
      <HeaderIndex navigation={props.navigation} />

      <View>
        <Text style={[styles.welcomeText, { marginTop: 50 }]}>
          Welcome Back!
        </Text>
        <Text style={styles.welcomeText}>{username}</Text>
        <View style={styles.iconContain}>
          <Image
            style={styles.icon}
            source={require("src/assets/images/icon_icon.png")}
          ></Image>
          <View style={styles.contry}>
            <Image
              source={require("src/assets/images/icon_hongkongFlag.png")}
            />
            <Text style={styles.loca}>Hong Kong</Text>
          </View>
        </View>
        <NetPoint netpoint="00000" text="you now have earned" />
      </View>
      <FooterIndex style={styles.footer} navigation={props.navigation} />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //alignSelf: 'center',
  },
  footer: {
    //backgroundColor: '#defef3',
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: hp("10%"),
  },
  loca: {
    fontSize: hp("1.8%"),
    alignSelf: "center",
    color: "#676767",
  },
  iconContain: {
    margin: 6,
    alignSelf: "center",
    width: wp("45%"),
    height: hp("21.5%"),
    backgroundColor: "#EFEFEF",
    borderRadius: 500,
    shadowRadius: 6,
    shadowOpacity: 0.52,
    shadowOffset: {
      height: 1,
    },
    shadowColor: "#9A9A9A",
  },
  icon: {
    alignSelf: "center",
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  contry: {
    alignSelf: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: wp("45%"),
    fontSize: 14,
    paddingHorizontal: 25,
    paddingVertical: 5,
    marginTop: 25,
    marginBottom: 25,
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    shadowRadius: 6,
    shadowOpacity: 0.52,
    shadowOffset: {
      height: 4,
    },
    shadowColor: "#9A9A9A",
  },
  welcomeText: {
    color: "#f5f5f5",
    fontSize: 24,
    fontWeight: "bold",
    shadowRadius: 6,
    shadowOpacity: 0.52,
    shadowOffset: {
      height: 4,
    },
    shadowColor: "#9A9A9A",
    justifyContent: "center",
    alignSelf: "center",
    transform: [{ translateY: -15 }],
  },
});
export default DefaultContainer;
 */
