import { View, Text, Dimensions, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../../ConstStyles/ColorFont";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
const height = Dimensions.get("window").height;
const Btn_play_Download = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.btn, { backgroundColor: Colors.Top_Btn_Color }]}>
        <Ionicons name="play" size={height * 0.028} color="white" />
        <Text style={styles.fonts}>Play</Text>
      </View>
      <View
        style={[
          styles.btn,
          {
            backgroundColor: Colors.Main_Color,
            borderColor: Colors.Top_Btn_Color,
            borderWidth: 2,
          },
        ]}
      >
        <Feather
          name="download"
          size={height * 0.028}
          color={Colors.Top_Btn_Color}
        />
        <Text style={[styles.fonts, { color: Colors.Top_Btn_Color }]}>
          {" "}
          Download
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 20,
  },
  btn: {
    width: "30%",
    height: height * 0.05,
    flex: 1,
    borderRadius: 50,
    backgroundColor: Colors.Top_Btn_Color,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  fonts: {
    color: "white",
    fontSize: RFValue(14),
    fontWeight: "600",
  },
});
export default Btn_play_Download;
