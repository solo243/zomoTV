import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NewStreamLink, Stream_link } from "../Api/apicall";
import Video from "react-native-video";
import { BackHandler } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import * as ScreenOrientation from "expo-screen-orientation";
import { Loadingscreen } from "../components/Loading/Loadingscreen";

const Ep_List = ({ route, navigation }) => {
  // console.warn(route);
  const rr = route.params;
  const id = rr.id;
  const gg = rr.subdub;
  const isfocus = useIsFocused();
  console.log("subdub is :--", gg, "....", "id :--  ", id);

  useEffect(() => {
    fetchingdata(id, gg);
    setisFullscreen(true);
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }, [data]);

  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const fetchingdata = async (id, gg) => {
    setloading(true);
    const call = await NewStreamLink(id, gg);
    setdata(call.sources);
    setloading(false);
  };

  let backButtonPressCount = 0;

  const handleBackButtonPress = () => {
    if (backButtonPressCount === 0) {
      // First press: Show a message or perform some action
      backButtonPressCount += 1;
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      setisFullscreen(false);
      return true; // Prevent default back action
    } else if (backButtonPressCount === 1) {
      // Second press: Navigate back
      navigation.goBack();
      return true; // Prevent default back action
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButtonPress
    );

    return () => {
      backHandler.remove();
    };
  }, [isfocus]);

  const [isFullScreen, setisFullscreen] = useState(true);

  if (loading) {
    return <View></View>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      {data == 0 ? (
        <View style={{ backgroundColor: "black" }}>
          <Loadingscreen />
        </View>
      ) : (
        <Video
          source={{
            uri: data[0]?.url ?? fetchingdata(id, gg),
            // "https://eno.tendoloads.com/_v6/b4ecc8322c876e1c5de9f02137973b8dc8269fa2f3082346c2b6706a30051465ed13a3b101f247f381cc6210f103b9d2c8b9720cbb53e7ef24f66c8511f63ced76b3314e0557e51e1f0eb96ff7eb974282e45165fcb5e0624a0821845e808532f7a720e4a52c9ac6fa546800b4efb9479b9eaa841db7a9e40a1dd39f6ebd8e64/master.m3u8",
            // uri: "",
          }}
          fullscreen={isFullScreen}
          controls={true}
          muted={true}
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
          // frameQuality={144}
          onBuffer={() => console.log("Buffreing...")}
          onLoad={() => (
            <View style={{ backgroundColor: "black", flex: 1 }}>
              <Image
                source={{
                  uri: "https://media.tenor.com/TcrzssE_SwMAAAAi/anime-waifu.gif",
                }}
                style={{ height: 200, width: 200, alignSelf: "center" }}
              />
            </View>
          )}
          resizeMode="contain"
          style={{ height: "100%", width: "100%" }}
        />
      )}
    </View>
  );
};

export default Ep_List;
