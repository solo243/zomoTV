import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../../ConstStyles/ColorFont";
import { AntDesign } from "@expo/vector-icons";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const NextButtons = ({ change }) => {
  const [page, setpage] = useState(1);
  const handlepress = (direction) => {
    const newPage = direction === "next" ? page + 1 : Math.max(page - 1, 1);
    setpage(newPage);
    change(page);
  };

  return (
    <View style={style.container}>
      {page == 1 ? (
        console.log("page 1")
      ) : (
        <TouchableOpacity onPress={() => handlepress("prev")}>
          <View style={style.btn}>
            <AntDesign name="arrowleft" size={24} color="white" />
            <Text style={style.btn_text}>Prev</Text>
          </View>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => handlepress("next")}>
        <View style={style.btn}>
          <Text style={style.btn_text}>Next</Text>
          <AntDesign name="arrowright" size={24} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.Main_Color,
    height: height * 0.12,
    justifyContent: "center",
    gap: width * 0.13,
    alignItems: "center",
    marginBottom: 20,
    // backgroundColor: "red",
    flexDirection: "row",
  },
  btn_text: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
  btn: {
    height: height * 0.06,
    borderRadius: 10,
    // width: widthcondition,
    width: width * 0.3,
    backgroundColor: Colors.Top_Btn_Color,
    alignItems: "center",
    justifyContent: "center",
    gap: width * 0.02,
    // marginBottom: 100,
    flexDirection: "row",
  },
});

export default NextButtons;
