import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { LinearGradient } from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../ConstStyles/ColorFont";
import React from "react";
const width = Dimensions.get("screen").width;
const TopBanner = ({ data }) => {
  return (
    <FlatList
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data ?? [1, 2, 3, 4, 5]}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <Image
            source={{
              uri: item.poster,
            }}
            style={styles.bannerImage}
          />

          <LinearGradient
            colors={["transparent", Colors.Linear1, Colors.Linear2]}
            style={styles.linearstyle}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 0.93 }}
          />
          <View style={styles.boxTitleandBtn}>
            <Text numberOfLines={1} style={styles.bannerTitle}>
              {item?.name ?? "NA"}
            </Text>
            <View style={{ flexDirection: "row", gap: moderateScale(12) }}>
              <TouchableOpacity style={styles.playBtn}>
                <Ionicons name="play" size={moderateScale(15)} color="white" />
                <Text style={styles.btnFont}>Play</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={{
                  justifyContent: "center",
                  gap: 20,
                  flexDirection: "row",
                  backgroundColor: Colors.Top_Btn_Color,
                  borderRadius: 10,
                  width: width * 0.33,
                  alignItems: "center",
                  // marginTop: 10,
                }}
              >
                <Text style={styles.btnFont}>Play</Text>
                <Ionicons name="play" size={moderateScale(15)} color="white" />
              </TouchableOpacity> */}
              <TouchableOpacity style={styles.playBtn}>
                <MaterialCommunityIcons
                  name="plus"
                  size={moderateScale(20)}
                  color="white"
                />
                <Text style={styles.btnFont}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: moderateScale(320),
    width: width,
  },
  bannerImage: {
    height: moderateScale(320),
    width: "100%",
    backgroundColor: Colors.Main_Color,
  },
  heroImage: {
    height: moderateScale(45),
    width: moderateScale(45),
    position: "absolute",
    start: moderateScale(15),
    top: moderateScale(17),
    borderRadius: 10,
  },
  linearstyle: {
    width: "100%",
    height: "60%",
    position: "absolute",
    bottom: 0,
  },
  bannerTitle: {
    maxWidth: moderateScale(220),
    fontSize: RFValue(21),
    color: Colors.Text_Color,
    fontWeight: "500",
  },
  boxTitleandBtn: {
    height: 40,
    bottom: moderateScale(42),
    width: "100%",
    position: "absolute",
    start: 20,
  },
  playBtn: {
    width: moderateScale(80),
    height: moderateScale(27),
    backgroundColor: Colors.Top_Btn_Color,

    borderRadius: 100,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderCurve: "continuous",
    gap: 5,
  },
  btnFont: {
    fontSize: RFValue(13),
    color: Colors.Text_Color,
    fontWeight: "500",
  },
});

export default TopBanner;
