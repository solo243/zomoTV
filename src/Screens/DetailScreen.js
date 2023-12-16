import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Details } from "../Api/apicall";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../ConstStyles/ColorFont";
import { Entypo } from "@expo/vector-icons";
import Btn_play_Download from "../components/DetailScreen/Btn_play_Download";
import { FontAwesome5 } from "@expo/vector-icons";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const DetailScreen = ({ route }) => {
  const selected = route.params.id;

  useEffect(() => {
    FetchingData(selected);
  }, []);

  const [data, setData] = useState();
  const FetchingData = async (selected) => {
    try {
      const call = await Details(selected);
      setData(call?.anime);
    } catch (e) {
      console.log(e);
    }
  };

  const handler = ({ item }) => {
    return (
      <View>
        <Image
          source={require("./ph.jpg")}
          style={{
            width: moderateScale(150),
            backgroundColor: "grey",
            margin: 10,
            height: moderateScale(100),
            borderRadius: 10,
            marginStart: 3,
          }}
        />

        <Text
          style={{
            color: Colors.Top_Btn_Color,
            fontSize: RFValue(10),
            textAlign: "center",
          }}
        >
          Episode - {item}
        </Text>
      </View>
    );
  };

  console.log(selected);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: Colors.Main_Color }}>
        {/* TODO: THis is a image  */}
        <View>
          <Image
            source={{ uri: data?.info?.poster }}
            // source={require("./ph.jpg")}
            style={{ height: moderateScale(320), width: "100%" }}
          />
        </View>

        {/* TODO: This is a TITLE Container  */}
        <View style={styles.container}>
          <View style={{ justifyContent: "space-between", marginTop: 17 }}>
            <Text numberOfLines={1} style={styles.title}>{data?.info?.name}</Text>
            <View></View>
          </View>

          {/* TODO: This is a RAting comntainer  */}
          <View
            style={{
              flexDirection: "row",
              marginTop: 17,
              marginStart: 10,
              alignItems: "center",
            }}
          >
            <AntDesign name="star" size={20} color={Colors.Top_Btn_Color} />
            <Text
              style={{ color: Colors.Top_Btn_Color, fontSize: RFValue(13) }}
            >
              {"  "} 4.0{" "}
            </Text>
            <Entypo
              name="chevron-right"
              size={20}
              color={Colors.Top_Btn_Color}
            />
            <Text style={{ color: "white", fontSize: RFValue(13) }}>
              {"  "}
              2009{" "}
            </Text>
            <Text
              style={{
                width: moderateScale(25),
                height: moderateScale(25),
                borderRadius: 10,
                marginStart: 10,
                fontSize: RFValue(13),
                color: Colors.Top_Btn_Color,
                textAlign: "center",
                borderColor: Colors.Top_Btn_Color,
                alignItems: "center",
                borderWidth: 1,
              }}
            >
              R
            </Text>
          </View>
          {/* TODO: This are the play and doneload buttons  */}
          <Btn_play_Download />
          <Text
            numberOfLines={4}
            style={{ color: "white", fontSize: RFValue(10), marginTop: 22 }}
          >
            {data?.info?.description}
          </Text>

          <Text style={styles.EP_title}> Episodes</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={[1, 2, 3, 4, 5, 6, 7]}
            renderItem={handler}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    // backgroundColor: "blue",
    alignSelf: "center",
  },
  title: {
    width: "75%",
    fontSize: RFValue(20),
    // backgroundColor: "pink",
    color: "white",
  },
  EP_title: {
    color: "white",
    fontWeight: "600",
    fontSize: RFValue(15),
    marginTop: 22,
    marginBottom: 8,
  },
});
export default DetailScreen;
