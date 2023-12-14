import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { moderateScale } from "react-native-size-matters";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "../../ConstStyles/ColorFont";

const GenraTitleBlock = ({ GenraName, navigation, data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.Fonts}>{GenraName}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Seeall", { data: data ,title: GenraName})}
      >
        <Text style={styles.see_all}>See all</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
  },
  Fonts: {
    fontSize: moderateScale(21),
    color: Colors.Text_Color,
    fontWeight: "600",
  },
  see_all: {
    color: "red",
    fontWeight: "500",
    marginTop: moderateScale(6),
    marginRight: moderateScale(14),
    fontSize: RFValue(11),
  },
});

export default GenraTitleBlock;
