import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../ConstStyles/ColorFont";
import { moderateScale } from "react-native-size-matters";
import { FlashList } from "@shopify/flash-list";
import { RFValue } from "react-native-responsive-fontsize";
import { Popular } from "../Api/apicall";
import NextButtons, { handlepress } from "../components/SeeAll/NextButtons";
import Topbar from "../components/SeeAll/Topbar";

const SeeAll = ({ navigation, route }) => {
  const rt = route.params;
  const data = rt?.data;
  const title = rt?.title;

  const fetchData = async (functions, page, setData) => {
    try {
      const data = await functions({ page });
      setData(data);
    } catch (e) {
      console.log("Error", e);
    }
  };

  const GenraFetchingFunc = async (genra, page, setData) => {
    try {
      const data = await Genra(genra, page);
      setData(data);
    } catch (e) {
      console.log(e);
    }
  };

  // var rt
  const Flatrender = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => console.log("hello")}>
        <View style={styles.newflatlist_cont}>
          <Image
            // source={require("./ph.jpg")}
            source={{ uri: item.image }}
            style={{ height: "80%", width: "100%", borderRadius: 10 }}
          />
          <Text numberOfLines={1} style={styles.title}>
            {item.title?.english ?? "NA"}
          </Text>
          <Text style={{ alignSelf: "center", color: "grey" }}>
            {item.releaseDate ?? "NA"} - Rating - {item.rating}
            {/* realease 2004 */}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Topbar navigation={navigation} title={title} />
      <ScrollView style={{ backgroundColor: Colors.Main_Color }}>
        <View style={styles.container}>
          <View style={styles.parent_flatlist_container}>
            <FlashList
              numColumns={2}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
              }}
              // data={popular}
              // data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
              data={data ?? [1, 2, 3, 4, 5, 6, 7, 8]}
              renderItem={Flatrender}
              estimatedItemSize={20}
              key={data?.id}
            />
          </View>
        </View>

        <NextButtons />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Main_Color,
    width: "100%",
    alignSelf: "center",
    display: "flex",
    flex: 1,
  },
  flatlist_container: {
    flex: 1,
    display: "flex",
    margin: 10,
    height: moderateScale(200),
    maxHeight: 300,
    width: "95%",
    maxWidth: 500,
    flexDirection: "row",
    borderRadius: 10,
  },
  newflatlist_cont: {
    // backgroundColor: "red",
    height: moderateScale(290),
    width: moderateScale(150),
    margin: 10,
    marginTop: 5,
  },
  parent_flatlist_container: {
    width: "90%",
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
    // backgroundColor: "blue",
    alignSelf: "center",
  },

  title: {
    marginTop: 10,
    alignSelf: "center",
    color: "white",
    fontSize: RFValue(13.4),
    textAlign: "center",
  },
});

export default SeeAll;
