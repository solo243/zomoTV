import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Stream_link } from "../Api/apicall";
import Video from "react-native-video";
import { BackHandler } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import * as ScreenOrientation from "expo-screen-orientation";

const Ep_List = ({ route, navigation }) => {
  // console.warn(route);
  const rr = route.params;
  const id = rr.id;
  const serveid = rr.subdub;
  const server = rr.servername;
  const isfocus = useIsFocused();
  console.log(id)

  useEffect(() => {
    fetchingdata(id, server, serveid);
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }, []);

  const [data, setdata] = useState([]);
  const fetchingdata = async (id, server, dubsub) => {
    setloading(true);
    const call = await Stream_link(id, server, dubsub);
    setdata(call.sources);
    setloading(false);
    console.log(call)
  };

  let backButtonPressCount = 0;

  const handleBackButtonPress = () => {
    if (backButtonPressCount === 0) {
      // First press: Show a message or perform some action
      backButtonPressCount += 1;
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

      return true; // Prevent default back action
    } else if (backButtonPressCount === 1) {
      // Second press: Navigate back
      navigation.goBack();
      return true; // Prevent default back action
    }
  };
const [loading,setloading] = useState(true)



  // if (loading) {
  //   return (
  //     <View style={{flex: 1,alignItems:'center',justifyContent: 'center'}}>
  //       <ActivityIndicator size={20} color={"red"} />
  //     </View>
  //   );
  // }
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButtonPress
    );

    return () => {
      backHandler.remove();
    };
  }, [isfocus]);

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      {/* <Video
        source={{uri: "https://goolekdsa/.com" }}
        fullscreen={true}
        
        controls={true}
        // onBuffer={{ur}}
        onMagicTap={() => {
          // return (
          //   <TouchableOpacity
          //     style={{
          //       height: 100,
          //       width: 100,
          //       backgroundColor: "red",
          //       position: "absolute",
          //     }}
          //   ></TouchableOpacity>
          // );
        }}
        onTouchStart={()=> {
          return (
            <TouchableOpacity
              style={{
                height: 100,
                width: 100,
                backgroundColor: "red",
                position: "absolute",
              }}
            ></TouchableOpacity>
          );
        }}
        resizeMode="contain"
        style={{ height: "100%", width: "100%" }}
      /> */}
    </View>
  );
};

export default Ep_List;
