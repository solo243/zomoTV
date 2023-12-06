import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../ConstStyles/ColorFont";
import { Octicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import { Search } from "../Api/apicall";

const SearchScreen = () => {
  const [SearchQuerys, SetsearchQuery] = useState();

  // const Searchcall = async (value, page) => {
  //   SetsearchQuery(value);
  //   try {
  //     const FFk = await Search(SearchQuerys,1);
  //     console.log(FFk)
  //   } catch (e) {
  //     console.log("Error this ===> ", e);
  //   }
  // };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: Colors.Main_Color }}>
        <View>
          <View
            style={{
              marginTop: 30,
              height: moderateScale(50),
              width: "90%",
              alignSelf: "center",
              borderRadius: 10,
              flexDirection: "row",
              borderColor: "#F0F2F1",
              borderWidth: 1,
              // backgroundColor: "",
            }}
          >
            <Octicons
              name="search"
              size={25}
              color="red"
              style={{
                alignSelf: "center",
                marginStart: 20,
              }}
            />
            <TextInput
              value={SearchQuerys}
              // onChangeText={Searchcall}
              style={{
                marginStart: 20,
                fontWeight: "600",
                fontSize: RFValue(13),
                width: "70%",
                color: "#F0F2F1",
              }}
              placeholder="Search....."
              placeholderTextColor={"#F0F2F1"}
            ></TextInput>
          </View>
        </View>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              width: "90%",
              // gap: 10,
              alignSelf: "center",
              // backgroundColor: "red",
            }}
          >
            <FlatList
              numColumns={2}
              showsHorizontalScrollIndicator={false}
              data={[1, 2, 3, 4, 5, 6]}
              renderItem={({ item }) => (
                <View
                  style={{
                    margin: 10,
                    height: RFValue(200),
                    maxHeight: 300,
                    width: RFValue(140),
                    borderRadius: 10,
                    backgroundColor: "grey",
                  }}
                >
                  <Image
                    source={require("./ph.jpg")}
                    style={{ width: "100%", borderRadius: 10, height: "100%" }}
                  />
                </View>
              )}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
