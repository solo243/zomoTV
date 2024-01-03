import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, Fonts } from "../ConstStyles/ColorFont";
import { Available_servers, Ep_list, Stream_link } from "../Api/apicall";
import { RFValue } from "react-native-responsive-fontsize";
// import { Video, ResizeMode } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { useNavigation } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
import TitleSubDub from "../components/Stream_EPcom/TitleSubDub";
import { moderateScale } from "react-native-size-matters";
import Video from "react-native-video";
import { FlashList } from "@shopify/flash-list";
import { Loadingscreen } from "../components/Loading/Loadingscreen";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const T2 = ({ route, navigation }) => {
  // const tt = route.params.id;
  // const img = route.params.img;
  // console.log(tt);

  useEffect(() => {
    // GetAnimeServers()
    lkl("jujutsu-kaisen-2nd-season-18413");
  }, []);
  const [epdata, setepdata] = useState([]);

  const lkl = async (id) => {
    setloading(true);
    const call = await Ep_list(id);
    const rr = call.episodes;
    setepdata(rr);

    setloading(false);
  };

  const [lloading, setloading] = useState(true);
  const [selectedId, setselectedId] = useState();
  const [current, setcurrent] = useState(1);
  useEffect(() => {
    // handlePress();
  }, [current]);

  const [subdubinfo, setSubdubinfo] = useState();

  const GetAnimeServers = async (id) => {
    const call = await Available_servers(id);
    console.log(call);
    setSubdubinfo(call);
  };
  const handlePress = (id, number) => {
    // setcurrent(number);
    GetAnimeServers(id);
    setselectedId(id);
    this.RBSheet.open();
  };

  if (lloading) {
    return <Loadingscreen />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.Main_Color }}>
      <View style={{ flex: 1, backgroundColor: Colors.Main_Color }}>
        <ScrollView>
          <View
            style={{
              height: moderateScale(250),
              // backgroundColor: "red",
              marginBottom: moderateScale(50),
            }}
          >
            {/* <Video
              source={{
                uri: "https://eno.tendoloads.com/_v6/d8e56d406f04d29b74b4e03042fca324d71f0cd196c65f1fcb9c6d27377df7bd17b6ce13536ee8f21bbfe92902b58f639455ccab8671ba0aa00782c152a6b8084cc518d7e32b2415bbe87dad7d55eb0736a3a15011d0533eceafe7a5841fde57bf868c98b776c63a5d23bbb687bf37df7365905359f738d51b40f6138f9e5d77/master.m3u8",
              }}
              controls={true}
              muted
              fullscreen
              style={{ height: 300, width: width }}
            /> */}
          </View>

          {/* TODO: This is for Ep Container  */}
          {epdata == null ? (
            <View
              style={{
                height: 200,
                width: 200,
                // backgroundColor: "red",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Image
                source={require("./ph.jpg")}
                style={{ height: 180, width: 250, alignSelf: "center" }}
              />
            </View>
          ) : (
            <View
              style={{
                width: "90%",
                borderRadius: 10,
                padding: 10,
                alignSelf: "center",
                backgroundColor: Colors.Secend_Color,
              }}
            >
              <FlatList
                centerContent={true}
                columnWrapperStyle={{
                  justifyContent: "center",
                  // alignItems: "center",
                  gap: 5,
                }}
                showsHorizontalScrollIndicator={false}
                data={epdata}
                // data={epdata}
                numColumns={5}
                // initialNumToRender={30}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handlePress(item.episodeId, item.number)}
                    // onPress={() => this.RBSheet.open(servers())}
                    // onPress={() => this.RBSheet.open(servers(item.episodeId))}
                    // onPress={() => link(item.episodeId, isSub ? "sub" : "dub")}
                  >
                    <View
                      style={{
                        alignSelf: "center",
                        height: height * 0.06,
                        width: width * 0.14,
                        maxHeight: 100,
                        maxWidth: 100,
                        backgroundColor:
                          item.number == current
                            ? Colors.Top_Btn_Color
                            : Colors.Main_Color,
                        margin: 2,
                        flex: 1,
                        alignItems: "center",
                        borderRadius: 12,
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: RFValue(14),
                          color: "white",
                          fontWeight: "500",
                          borderRadius: 20,
                        }}
                      >
                        {item.number}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          {/* TODO: Bottom sheet  */}
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <RBSheet
              ref={(ref) => {
                this.RBSheet = ref;
              }}
              height={moderateScale(100)}
              animationType="slide"
              openDuration={250}
              customStyles={{
                container: {
                  // height: 300,
                  backgroundColor: Colors.Main_Color,
                  justifyContent: "center",
                  alignItems: "center",
                  height: moderateScale(200),
                },
              }}
            >
              <View style={{ gap: moderateScale(18) }}>
                {subdubinfo?.sub == 0 ? (
                  <View />
                ) : (
                  <TouchableOpacity
                    style={styles.sub_dub_btn}
                    onPress={() => navigation.navigate("Eplist", {
                        id: selectedId,
                        subdub: "sub",
                      })
                    }
                  >
                    <Text style={styles.sub_dub_btn_text}>Sub</Text>
                  </TouchableOpacity>
                )}
                {subdubinfo?.dub == 0 ? (
                  <View />
                ) : (
                  <TouchableOpacity
                    style={styles.sub_dub_btn}
                    onPress={() =>
                      navigation.navigate("Eplist", {
                        id: selectedId,
                        subdub: "dub",
                      })
                    }
                  >
                    <Text style={styles.sub_dub_btn_text}>Dub</Text>
                  </TouchableOpacity>
                )}
              </View>
            </RBSheet>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SUb_Dub: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  sub_dub_btn: {
    backgroundColor: "red",
    height: moderateScale(50),
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "600",
    fontFamily: Fonts.Bold,
    borderRadius: 10,
    width: moderateScale(250),
  },
  sub_dub_btn_text: {
    color: "white",
    fontSize: RFValue(15),
    fontFamily: Fonts.Bold,
  },
});

export default T2;
