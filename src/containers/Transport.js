import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  Animated,
  Easing,
} from "react-native";
import HeaderIndex from "src/common/HeaderIndex";
import FooterIndex from "src/common/FooterIndex";

import { ComponentStyles } from "src/common/ContainerStyles";
import Step from "src/components/Step";
import NetPoint from "src/components/NetPoint";
import TutorBox from "src/components/TutorBox";
import {
  accelerometer,
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes,
} from "react-native-sensors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const pointText = "you have earned";
import api from "../api";
const MoveBackground = () => {
  return (
    <>
      <Image
        style={styles.tree1}
        source={require("src/assets/images/icon_tree1.png")}
      ></Image>
      <Image
        style={styles.tree2}
        source={require("src/assets/images/icon_tree2.png")}
      ></Image>
      <Image
        style={styles.tree3}
        source={require("src/assets/images/icon_tree3.png")}
      ></Image>

      <Image
        source={require("src/assets/images/icon_transport_boy.png")}
        style={styles.boy}
      ></Image>

      <Image
        source={require("src/assets/images/icon_transport_girl.png")}
        style={styles.girl}
      ></Image>
    </>
  );
};

const movebg = new Animated.Value(0);
const movebg2 = new Animated.Value(0);
const movebg3 = new Animated.Value(0);
// animation
const startAm = () => {
  Animated.loop(
    Animated.timing(movebg, {
      toValue: 1,
      duration: 15000,
      easing: Easing.linear,
      useNativeDriver: false,
    })
  ).start();
  Animated.loop(
    Animated.timing(movebg2, {
      toValue: 1,
      duration: 15000,
      easing: Easing.linear,
      useNativeDriver: false,
    })
  ).start();
  Animated.loop(
    Animated.timing(movebg3, {
      toValue: 1,
      duration: 15000,
      easing: Easing.linear,
      useNativeDriver: false,
    })
  ).start();
};
// rest animation
const resetAM = () => {
  Animated.timing(movebg).reset();
  Animated.timing(movebg2).reset();
  Animated.timing(movebg3).reset();
};
//stop animation
const stopAM = () => {
  Animated.timing(movebg).stop();
  Animated.timing(movebg2).stop();
  Animated.timing(movebg3).stop();
};

// move range
const moveX = movebg.interpolate({
  inputRange: [0, 1],
  outputRange: [0, -1000],
});

const moveX_B = movebg2.interpolate({
  inputRange: [0, 1],
  outputRange: [500, -500],
});
const moveX_C = movebg3.interpolate({
  inputRange: [0, 1],
  outputRange: [1000, 0],
});

const Transport = (props) => {
  const [hasNext, setHasNext] = useState(undefined);
  const [helpCount, setHelpCount] = useState(undefined);

  const [hidden, setHidden] = useState(false);
  const [start, setStart] = useState(true);
  const [click, setClick] = useState(false);
  const [text, setText] = useState("");
  //const [subscription, setSubscription] = useState(undefined);
  const [countVal, setCountVal] = useState(0);
  const [leave, setLeave] = useState(false);
  setUpdateIntervalForType(SensorTypes.accelerometer, 400);
  var magnitude;
  var delta;
  var MagnitudePrevious;
  var stepCount = 0;

  const sendData = () => {
    api
      .post("/api/user", {
        count: countVal,
      })
      .then((response) => {
        console.log("data", response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // clear data

  useEffect(() => {
    const add = props.navigation.addListener("focus", () => {
      setHidden(false);
      setStart(false);
      resetAM();
      setLeave(false);
      setCountVal(0);
      setClick(false);
      magnitude = 0;
      MagnitudePrevious = 0;
      delta = 0;
      stepCount = 0;
    });

    return () => {
      //unsubscribe;
      add;
    };
  }, [props.navigation]);
  //clear data
  useEffect(() => {
    const clearData = props.navigation.addListener("blur", () => {
      console.log("I leave in transport");
      props.navigation.setParams({
        helpCount: null,
        hasNext: null,
        countHelp: null,
      });
    });
    return () => {
      clearData;
    };
  }, [props.navigation]);

  useEffect(() => {
    setText(countVal);
  }, [countVal]);
  //any params in route, set value
  useEffect(() => {
    if (props.route.params) {
      if (props.route.params.helpCount) {
        setHelpCount(parseInt(JSON.stringify(props.route.params.helpCount)));
      } else {
        setHelpCount(undefined);
      }

      if (props.route.params.countHelp) {
        setHasNext(parseInt(JSON.stringify(props.route.params.countHelp)));
      } else {
        setHasNext(0);
      }
    }
  });
  // check click and leave update ,set value
  useEffect(() => {
    console.log("Hi");
    console.log("click 3", click);
    console.log("leave h", leave);

    const subscription = accelerometer.subscribe(({ x, y, z }) => {
      //console.log({ x, y, z })

      if (click) {
        const added = Math.sqrt(x * x + y * y + z * z).toString();
        console.log(added);

        magnitude = added;

        delta = magnitude - MagnitudePrevious;
        MagnitudePrevious = magnitude;

        stepCount = delta > 0.1 ? ++stepCount : stepCount;
        setCountVal(stepCount);
        console.log("mag = ", magnitude);
        console.log("delta=", delta);
        console.log("MaP=", MagnitudePrevious);
        console.log("step= ", stepCount);
        console.log("leave = ", leave);
        console.log("click = ", click);
      }
    });
    //const subscription = counter(click);
    const out = props.navigation.addListener("blur", () => {
      console.log("counter leave");

      subscription.unsubscribe();
    });
    return () => {
      out;
    };
  }, [click]);
  //clear data
  useEffect(() => {
    const clearData = props.navigation.addListener("blur", () => {
      setHelpCount(undefined);
      setHasNext(0);
    });
    return clearData;
  }, [props.navigation]);

  return (
    <View style={ComponentStyles.container_v2}>
      <HeaderIndex navigation={props.navigation} />

      <View
        style={hidden ? styles.startContainerHidden : styles.startContainer}
      >
        <Text style={styles.title}>Read To Walk the day?</Text>
        <TouchableOpacity
          style={styles.StartBtn}
          onPress={() => {
            setClick((click) => {
              return !click;
            });

            setHidden(true);
            startAm();
            setStart(true);
          }}
        >
          <Text
            style={{
              fontSize: 31,
              textAlign: "center",
              color: "white",
              padding: 5,
            }}
          >
            Start
          </Text>
        </TouchableOpacity>
      </View>
      <View style={hidden ? styles.netpoint : styles.netpointHidden}>
        <Step step={countVal} text="You have earned" />
        {/*
          <TouchableOpacity
            onPress={() => {
              setClick((click) => {
                return !click;
              });
              stopAM();
            }}
            style={click ? styles.pauseBtnHidden : styles.pauseBtn}
          >
            <Image source={require("src/assets/images/icon_pause.png")}></Image>
          </TouchableOpacity>
          */}

        <TouchableOpacity
          onPress={() => {
            setClick((click) => {
              return !click;
            });
            startAm();
          }}
          style={click ? styles.playBtn : styles.playBtnHidden}
        >
          <Image source={require("src/assets/images/icon_play.png")}></Image>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setStart(false);
            setClick((click) => {
              click = !click;
            });
            sendData();
            props.navigation.navigate("Congrats");
          }}
          style={styles.stopBtn}
        >
          <Image source={require("src/assets/images/icon_stop.png")}></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.controlAmView}>
        <Animated.View style={styles.moveA}>
          <MoveBackground />
        </Animated.View>
        <Animated.View style={styles.moveB}>
          <MoveBackground />
        </Animated.View>
        <Animated.View style={styles.moveC}>
          <MoveBackground />
        </Animated.View>
      </View>
      <FooterIndex style={styles.footer} navigation={props.navigation} />
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
      {helpCount === undefined && hasNext === 1 && (
        <TutorBox
          mouseNum={1}
          text={"You can earn net points by walking more here."}
          mouse1left={140}
          mouse1top={hp("90%")}
          circle={1}
          navigation={props.navigation}
          isPlace={1}
          place={"Congrats"}
          boxtop={100}
          haveCount={0}
          hasNext={1}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "10%",
  },
  tree1: {
    transform: [{ translateX: wp("-35%") }],
    position: "absolute",
    top: hp("3%"),
    left: wp("-6%"),
    zIndex: 4,
  },
  tree2: {
    zIndex: 3,
    position: "absolute",
    top: hp("19%"),
    transform: [{ translateX: -12 }],
  },
  tree3: {
    zIndex: 2,
    position: "absolute",
    top: hp("27.5%"),
    transform: [{ translateX: 90 }],
  },
  /*
    line:{
        position: 'absolute',
        borderBottomColor: "black",
        borderBottomWidth: 2,
        width: 1000,
        bottom:hp('5%')
    },
    */
  title: {
    color: "#f5f5f5",
    textAlign: "center",
    fontSize: 24,
    marginTop: hp("2%"),
  },
  startContainerHidden: {
    opacity: 0,
    //display: "none",
    alignItems: "center",
    justifyContent: "center",
  },
  startContainer: {
    opacity: 1,
    //display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  StartBtn: {
    backgroundColor: "#309397",
    width: wp("50%"),
    height: hp("6.5%"),
    borderRadius: 50,
    marginTop: 20,
  },
  boy: {
    position: "absolute",
    zIndex: 10,
    top: hp("28%"),
    left: wp("5%"),
  },
  girl: {
    position: "absolute",
    zIndex: 12,
    top: hp("40%"),
    right: wp("0%"),
  },
  netpoint: {
    transform: [{ translateX: wp("25%") }, { translateY: hp("5%") }],
    position: "absolute",
    zIndex: 5,
    display: "flex",
  },
  netpointHidden: {
    transform: [{ translateX: wp("25%") }, { translateY: hp("5%") }],
    position: "absolute",
    zIndex: 5,
    display: "none",
  },
  moveA: {
    transform: [{ translateX: moveX }],
    zIndex: 5,
    position: "absolute",
  },

  moveB: {
    transform: [{ translateX: moveX_B }],
    //transform : [{translateX:moveX}]
    zIndex: 5,
    position: "absolute",
  },
  moveC: {
    transform: [{ translateX: moveX_C }],
    zIndex: 5,
    position: "absolute",
  },
  stopBtn: {
    position: "absolute",
    display: "flex",
    transform: [{ translateY: 110 }, { translateX: 220 }],
  },
  pauseBtn: {
    position: "absolute",
    display: "flex",
    transform: [{ translateY: 110 }, { translateX: -40 }],
  },
  pauseBtnHidden: {
    position: "absolute",
    display: "none",
    transform: [{ translateY: 110 }, { translateX: -40 }],
  },
  playBtn: {
    position: "absolute",
    display: "flex",
    transform: [{ translateY: 110 }, { translateX: -40 }],
  },
  playBtnHidden: {
    position: "absolute",
    display: "none",
    transform: [{ translateY: 110 }, { translateX: -40 }],
  },
});
export default Transport;
