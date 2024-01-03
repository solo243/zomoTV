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
  const [newdata, setData] = useState([]);
  useEffect(() => {
    GetAllaSave();
  }, []);
  const GetAllaSave = async () => {
    // AsyncStorage.clear()
    const newgg = await AsyncStorage.getItem("idforsave");
    setData(newgg);
    console.log(newdata);
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
      <View style={{ flex: 1 }}>
        <FlatList
          numColumns={2}
          maxToRenderPerBatch={2}
          // keyExtractor={(item) => item.id}
          data={[1,2,3,4,5,6,7,8]}
          // data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                backgroundColor: "grey",
                height: moderateScale(250),
                maxHeight: 400,

                borderRadius: 10, // width: ,
                margin: 10,
                width: moderateScale(200),
                maxWidth: 190,
              }}
            >
              <Image
                // source={{ uri: item.img }}
                // source={require("./ph.jpg")}
                style={{
                  flex: 1,
                  height: "100%",
                  width: "100%",
                  borderRadius: 10,
                }}
              />
            </View>
          )}
        />
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
