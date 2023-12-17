import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import React from "react";
import { moderateScale } from "react-native-size-matters";
import { Colors } from "../../ConstStyles/ColorFont";

export const Loadingscreen = () => {
  return (
    <View style={styles.conainer}>
      <Image
        source={{
          uri: "https://media.tenor.com/Cy_zbvXCEH0AAAAi/rika-takanashi.gif",
        }}
        style={styles.image}
      />
      {/* <ActivityIndicator
        size={moderateScale(40)}
        color={Colors.Top_Btn_Color}
        style={{ marginTop: 30 }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  conainer: {
    flex: 1,
    backgroundColor: Colors.Main_Color,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: moderateScale(150),
    width: moderateScale(150),
  },
});
