import {
  ScrollView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../ConstStyles/ColorFont";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const SaveScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    GetAllaSave();
  }, []);
  const GetAllaSave = async () => {
    // AsyncStorage.clear()
    const newgg = await AsyncStorage.getItem("idforsave");
    setData(newgg);
    console.log(data);
  };

  const Empty = () => {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          source={require("./Empty.png")}
          style={{
            height: moderateScale(200),
            maxHeight: 300,
            maxWidth: 300,
            marginTop: 20,
            width: moderateScale(200),
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.Main_Color }}>
      <View style={{ flex: 1, backgroundColor: Colors.Main_Color }}>
        <View
          style={{
            height: moderateScale(60),
            maxHeight: 200,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",

            // backgroundColor: "red",
          }}
        >
          <Text
            style={{
              fontSize: RFValue(20),
              fontWeight: "600",
              color: "white",
              marginStart: 30,
            }}
          >
            My List
          </Text>
          <TouchableOpacity
            style={{ marginRight: 30 }}
            onPress={() => navigation.navigate("Search")}
          >
            <Feather
              name="search"
              size={moderateScale(24)}
              color={Colors.Top_Btn_Color}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          {data.length > 0 ? (
            <View
              style={{
                alignItems: "center",
                width: "97%",
                alignSelf: "center",
                gap: 10,
                justifyContent: "center",
                // backgroundColor: "red",
              }}
            >
              <FlatList
                // contentContainerStyle={{
                //   // backgroundColor: 'pink',
                //   alignItems: "center",
                // }}
                // columnWrapperStyle={{
                //   justifyContent: "space-between",
                //   // backgroundColor: "blue",
                //   width: "90%",
                //   alignSelf: "center",
                //   justifyContent: "center",
                // }}
                numColumns={2}
                data={data ?? [1, 2, 3, 4]}
                renderItem={({ item }) => (
                  <View>
                    <Image
                      source={require("./ph.jpg")}
                      style={styles.PosterImage}
                    />
                    <Text>{item.id ?? "NA"}</Text>
                  </View>
                )}
              />
            </View>
          ) : (
            <Empty />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  PosterImage: {
    height: height * 0.275,
    maxWidth: 200,
    maxHeight: 300,
    marginRight: 15,
    marginTop: 12,
    backgroundColor: "grey",
    borderRadius: 9,
    // width: moderateScale(140),
    width: width * 0.36,
  },
});
export default SaveScreen;
