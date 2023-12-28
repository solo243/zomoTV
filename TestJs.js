import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "./src/ConstStyles/ColorFont";
import { moderateScale } from "react-native-size-matters";
import Video from "react-native-video";
import { RFValue } from "react-native-responsive-fontsize";
import { Ep_list } from "./src/Api/apicall";

const TestJs = () => {
  const [data, setData] = useState([]);
  const [current, setcurrent] = useState(1);

  useEffect(() => {
    // GetAnimeEps();
    // GetAnimeInfo();
    console.log("Console is fire ");
    // GetAnimeEps("steinsgate-3")
  }, [current]);

  useEffect(() => {
    lkl("steinsgate-3")
    // GetAnimeEps("steinsgate-3");
  }, []);

  const [EpServer, setEpServer] = useState([]);
  const [subdata, Setsubdata] = useState([]);
  const [dubdata, setdubdata] = useState([]);
  const [isSub, setIsSub] = useState(true);
  // const GetAnimeInfo = async () => {
  //   const call = await fetch(
  //     `https://api-aniwatch.onrender.com/anime/servers?episodeId=jujutsu-kaisen-2nd-season-18413?ep=107246`
  //   );
  //   // const call = await fetch(
  //   //   `https://api-aniwatch.onrender.com/anime/servers?episodeId=jujutsu-kaisen-2nd-season-18413?ep=113113`
  //   // );
  //   const ll = await call.json();
  //   setEpServer(ll);
  //   console.log(ll);
  //   Setsubdata(EpServer?.sub);
  //   console.log(subdata)
  //   setdubdata(EpServer?.dub);
  // };

  const [epdata, setepdata] = useState([]);
  const lkl = async (id) => {
    const call = await Ep_list(id);
    const rr = call.episodes;
    setepdata(rr);
    console.log(epdata)
  };

  const HandlePress = (item) => {
    setcurrent(item);
  };

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
                uri: subdata[0].url,
              }}
              style={{ height: "100%", width: "100%" }}
              resizeMode="contain"
              muted={true}
              controls={true}
            /> */}
          </View>
          {dubdata == 0 ? (
            <View />
          ) : (
            <View
              style={{
                height: 100,
                // backgroundColor: "red",
                width: "80%",
                flexDirection: "row",
                gap: 20,
                marginBottom: 20,
                alignSelf: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: 50,
                  width: 150,
                  backgroundColor: "blue",
                }}
              >
                <Text>Sub</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: 50,
                  width: 150,
                  backgroundColor: "blue",
                }}
              >
                <Text>Dub</Text>
              </TouchableOpacity>
            </View>
          )}

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
              // data={[1,2,3,4,5,6]}
              // data={epdata}
              data={epdata}
              numColumns={5}
              // initialNumToRender={30}
              renderItem={({ item }) => (
                <TouchableOpacity
                  // onPress={() => servers(item.episodeId, item.number) }
                  onPress={() => HandlePress(item)}
                >
                  <View
                    style={{
                      alignSelf: "center",
                      height: moderateScale(40),
                      width: moderateScale(55),
                      maxHeight: 100,
                      maxWidth: 100,
                      backgroundColor:
                        item == current
                          ? Colors.Top_Btn_Color
                          : Colors.Main_Color,
                      margin: 2,
                      flex: 1,
                      alignItems: "center",
                      borderRadius: 10,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: RFValue(14),
                        color: "white",
                        fontWeight: "700",
                        borderRadius: 20,
                      }}
                    >
                      {item}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
            {/* {allEp.map((item) => (
              <TouchableOpacity
                // onPress={() => servers(item.episodeId, item.number) }
                onPress={() => HandlePress(item)}
              >
                <View
                  style={{
                    alignSelf: "center",
                    height: moderateScale(40),
                    width: moderateScale(55),
                    maxHeight: 100,
                    maxWidth: 100,
                    backgroundColor:
                      item == current
                        ? Colors.Top_Btn_Color
                        : Colors.Main_Color,
                    margin: 2,
                    flex: 1,
                    alignItems: "center",
                    borderRadius: 10,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: RFValue(14),
                      color: "white",
                      fontWeight: "700",
                      borderRadius: 20,
                    }}
                  >
                    {item}
                  </Text>
                </View>
              </TouchableOpacity>
            ))} */}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default TestJs;
