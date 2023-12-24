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

const height = Dimensions.get("window").height;

const width = Dimensions.get("window").width;
const Stream_Ep = ({ route, navigation }) => {
  const tt = route.params.id;

  useEffect(() => {
    lkl(tt);
  }, []);
  const [epdata, setepdata] = useState([]);

  const [gg, setgg] = useState();
  // const link = async (id, subdub) => {
  //   try {
  //     const call = await Ep_list(id, subdub);
  //     const rr = call.sources;
  //     setgg(rr[1]);
  //     console.log("ggios ", gg);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const lkl = async (id) => {
    const call = await Ep_list(id);
    const rr = call.episodes;
    setepdata(rr);
  };

  const [epid, setepid] = useState();
  const [ava_sub, setAva_sub] = useState();
  const [ava_dub, setAva_dub] = useState();
  const servers = async (id) => {
    // setAva_sub('');
    setepid(id);

    // {ava_dub == null ? <ActivityIndicator/> : null}

    const call = await Available_servers(id);
    setAva_sub(call.sub);
    setAva_dub(call.dub);
    this.RBSheet.open();
    // const rr = [
    //   { serverId: 4, serverName: "vidstreaming" },
    //   { serverId: 1, serverName: "megacloud" },
    //   { serverId: 22, serverName: "vidstreaming" },
    //   { serverId: 11, serverName: "megacloud" },
    //   { serverId: 43, serverName: "vidstreaming" },
    //   { serverId: 14, serverName: "megacloud" },
    // ];
    // setAva_sub(rr);
    // setAva_dub(rr);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.Main_Color }}>
      <View style={{ flex: 1, backgroundColor: Colors.Main_Color }}>
        <ScrollView>
          <View
            style={{
              width: width,
              height: height * 0.35,
              // backgroundColor: "red",
            }}
          ></View>

          {/* TODO: This is for Ep Container  */}
          <View
            style={{
              width: width * 0.9,
              maxWidth: 700,
              alignSelf: "center",
              marginTop: 30,
              borderRadius: 15,
              backgroundColor: Colors.Secend_Color,
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              // minHeight: 100,
              padding: 10,
              marginBottom: 100,
            }}
          >
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
              <FlatList
                centerContent={true}
                columnWrapperStyle={{
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                }}
                showsHorizontalScrollIndicator={false}
                data={epdata}
                // data={epdata}
                numColumns={5}
                // initialNumToRender={30}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => servers(item.episodeId)}
                    // onPress={() => this.RBSheet.open(servers())}
                    // onPress={() => this.RBSheet.open(servers(item.episodeId))}
                    // onPress={() => link(item.episodeId, isSub ? "sub" : "dub")}
                  >
                    <View
                      style={{
                        alignSelf: "center",
                        height: height * 0.06,
                        width: width * 0.13,
                        maxHeight: 100,
                        maxWidth: 100,
                        backgroundColor: Colors.Main_Color,
                        margin: 5,
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
