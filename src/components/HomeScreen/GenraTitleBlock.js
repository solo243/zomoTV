import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "../../ConstStyles/ColorFont";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const GenraTitleBlock = ({ GenraName, navigation, data, genra }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.Fonts}>{GenraName}</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Seeall", {
            data: data,
            gg: GenraName,
            genra: genra,
          })
        }
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
    // fontSize: width * 0.05,
    fontSize: RFValue(18),
    // fontSize: width*0.05,
    color: Colors.Text_Color,
    fontWeight: "600",
  },
  see_all: {
    color: Colors.Top_Btn_Color,
    fontWeight: "500",
    marginTop: moderateScale(6),
    marginRight: moderateScale(14),
    fontSize: RFValue(11),
  },
});

export default GenraTitleBlock;
