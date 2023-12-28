import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Colors, Fonts } from "../../ConstStyles/ColorFont";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
const height = Dimensions.get("window").height;
const Btn_play_Download = ({ navigation, id, img }) => {
 console.log("Btn selected iD for srem is :-- " ,id)
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Stream", { id, img })}
        style={[styles.btn, { backgroundColor: Colors.Top_Btn_Color }]}
      >
        <Ionicons name="play" size={height * 0.028} color="white" />
        <Text style={styles.fonts}>Play</Text>
      </TouchableOpacity>
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
    // fontWeight: "700",
    fontFamily: Fonts.medium,
  },
});
export default Btn_play_Download;
