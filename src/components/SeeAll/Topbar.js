import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { moderateScale } from "react-native-size-matters";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../ConstStyles/ColorFont";
import { RFValue } from "react-native-responsive-fontsize";

const Topbar = ({ navigation,title }) => {
  return (
    <View style={style.container}>
      <View style={style.cont_backAndtitle}>
        <TouchableOpacity
          onPress={() => navigation.navigate("MainScreen")}
          style={{ marginStart: moderateScale(20) }}
        >
          <AntDesign name="arrowleft" size={27} color="red" />
        </TouchableOpacity>
        <View>
          <Text style={style.title_font}> {title} </Text>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: moderateScale(58),
    backgroundColor: Colors.Main_Color,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  title_font: {
    color: Colors.Text_Color,
    fontWeight: "700",
    fontSize: RFValue(18),
  },
  cont_backAndtitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(13),
  },
});

export default Topbar;
