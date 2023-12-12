import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../ConstStyles/ColorFont";
import { moderateScale } from "react-native-size-matters";
import AnimeCard from "../components/HomeScreen/AnimeCard";
import { FlashList } from "@shopify/flash-list";
import { RFValue } from "react-native-responsive-fontsize";

const SeeAll = ({ navigation, route }) => {
  const rt = route.params;
  // var rt
  const Flatrender = ({ item }) => {
    return (
      <View style={styles.newflatlist_cont}>
        {/* <Image source={{ uri: item.image }} style={styles.image_style} />
        <View style={{ flexDirection: "column" }}>
          <View style={styles.title_container}>
            <Text numberOfLines={2} style={styles.title}>
              {item.title?.english}
            </Text>
            <Text style={{ color: "grey" }}>
              {item.releaseDate ?? "NA"} - Rating {item.rating ?? "NA"}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.btn}>
              <Text style={{ fontWeight: "500", color: "white" }}>Play</Text>
            </TouchableOpacity>
          </View>
        </View> */}
        <Image
          // source={require("./ph.jpg")}
          source={{ uri: item.image }}
          style={{ height: "80%", width: "100%", borderRadius: 10 }}
        />

        <Text
          numberOfLines={2}
          style={{
            marginTop: 10,
            alignSelf: "center",
            color: "white",
            fontSize: RFValue(15),
          }}
        >
          {/* this is a simple title fromthe app called amnigflix */}
          {item.title?.english}
        </Text>
        <Text style={{ alignSelf: "center", color: "grey" }}>
          {item.rereleaseDate}
          realease 2004
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.parent_flatlist_container}>
          <FlashList
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
            }}
            // data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
            data={rt?.data ?? [1, 2, 3, 4, 5, 6, 7, 8]}
            renderItem={Flatrender}
            estimatedItemSize={20}
            key={rt.data?.id}
            onEndReached={() => console.log("bottom")}
          />
        </View>
      </View>
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
    // gap: 10
    margin: 10,
    marginTop: 32,
  },
  parent_flatlist_container: {
    width: "90%",
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
    // backgroundColor: "blue",
    alignSelf: "center",
  },
  image_style: {
    height: "100%",
    width: "40%",
    backgroundColor: "grey",
    borderRadius: 10,
    // margin: 10,
  },
  title: {
    color: "white",
    fontSize: RFValue(18),
    width: moderateScale(190),
    maxWidth: 350,
  },
  title_container: {
    height: "50%",
    flex: 1,
    padding: 20,
  },
  btn: {
    height: moderateScale(40),
    marginStart: 20,
    width: moderateScale(100),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 10,
  },
});

export default SeeAll;
