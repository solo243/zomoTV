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
import { Colors } from "../ConstStyles/ColorFont";
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

const Stream_Ep = ({ route, navigation }) => {
  const tt = route.params.id;
  const img = route.params.img;
  console.log(tt);

  useEffect(() => {
    lkl(tt);
  }, []);
  const [epdata, setepdata] = useState([]);


  const lkl = async (id) => {
    setloading(true);
    const call = await Ep_list(id);
    const rr = call.episodes;
    setepdata(rr);

    setloading(false);
  };



  const [epid, setepid] = useState();
  const [ava_sub, setAva_sub] = useState();
  const [ava_dub, setAva_dub] = useState();
  const [lloading, setloading] = useState(true);

  
  // const servers = async (id, number) => {
  //   setloading(true)
  //   setcurrent(number);
  //   setepid(id);
  //   const call = await Available_servers(id);
  //   setAva_sub(call.sub);
  //   setloading(false)
  //   // console.log()
  //   setAva_dub(call.dub);
  //   // this.RBSheet.open();
    
  //   // setcurrent(number);
  // };


useEffect(()=>{

},[current]);


  const handlePress = (id,number) => {
    console.log(number)
    setcurrent(number)
    // setcurrent(item)
  }

  const [current, setcurrent] = useState(1);

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
              style={{ height: "100%", width: "100%" }}
              resizeMode="contain"
              controls={true}
              muted={true}
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
                    onPress={() => handlePress(item.episodeId,item.number)}
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
              height={moderateScale(580)}
              animationType="slide"
              openDuration={250}
              customStyles={{
                container: {
                  // height: 300,
                  backgroundColor: Colors.Main_Color,
                  justifyContent: "center",
                  alignItems: "center",
                  height: moderateScale(400),
                },
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: RFValue(14),
                  marginBottom: moderateScale(20),
                }}
              >
                Available Servers
              </Text>
              {/* TODO: This is for Sub Bottom Tab s */}
              <View
                style={{
                  height: 200,
                  width: "90%",
                  // backgroundColor: "red",
                  marginBottom: moderateScale(80),
                }}
              >
                <TitleSubDub name={"Sub"} />
                {ava_sub == null ? (
                  <View>
                    <ActivityIndicator size={50} color={"red"} />
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      marginBottom: 10,
                    }}
                  >
                    {ava_sub.map((item) => (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("Eplist", {
                            servername: item.serverName,
                            subdub: "sub",
                            id: epid,
                          })
                        }
                      >
                        <View
                          style={{
                            height: moderateScale(40),
                            borderRadius: 10,
                            alignItems: "center",
                            justifyContent: "center",
                            // width: 100,
                            padding: 9,
                            borderWidth: 2,
                            borderColor: "red",
                            // backgroundColor: "red",
                            margin: 10,
                          }}
                        >
                          <Text
                            style={{ fontSize: RFValue(12), color: "white" }}
                          >
                            {item.serverName}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                {/* TODO: This is a Dub Bottom tab  */}
                <TitleSubDub name={"Dub"} />
                {ava_dub == null ? (
                  <View>
                    <ActivityIndicator size={50} color={"red"} />
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      marginBottom: 10,
                    }}
                  >
                    {ava_dub.map((item) => (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("Eplist", {
                            servername: item.serverName,
                            subdub: "dub",
                            id: epid,
                          })
                        }
                      >
                        <View
                          style={{
                            height: moderateScale(40),
                            borderRadius: 10,
                            alignItems: "center",
                            justifyContent: "center",
                            // width: 100,
                            padding: 10,
                            borderWidth: 2,
                            borderColor: "red",
                            // backgroundColor: "red",
                            margin: 10,
                          }}
                        >
                          <Text
                            style={{ fontSize: RFValue(12), color: "white" }}
                          >
                            {item.serverName}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
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
});

export default Stream_Ep;
