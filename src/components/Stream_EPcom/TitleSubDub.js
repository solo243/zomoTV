import { View, Text } from "react-native";
import React from "react";
import { Colors } from "../../ConstStyles/ColorFont";
import { RFValue } from "react-native-responsive-fontsize";
const TitleSubDub = ({ name }) => {
  return (
    <View>
      <Text
        style={{
          fontSize: RFValue(14),
          color: Colors.Text_Color,
          fontWeight: "600",
        }}
      >
        {name}
      </Text>
    </View>
  );
};

export default TitleSubDub;
