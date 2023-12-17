import {
  Text,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";

import { RFValue } from "react-native-responsive-fontsize";
const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;
const Slider = ({ data ,navigation}) => {
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal
      showsVerticalScrollIndicator={false}
      data={data}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate("Detail", {id: item.id})}>
          <Image source={{ uri: item.poster }} style={styles.image} />
          <Text numberOfLines={1} style={styles.text}>
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
      key={data?.id}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: width * 0.36,
    backgroundColor: "grey",
    margin: 10,
    maxWidth: 200,
    maxHeight: 300,
    height: height * 0.275,
    borderRadius: 10,
    flex: 1,
    marginStart: 3,
  },
  text: {
    color: "white",
    fontSize: RFValue(12),
    width: width * 0.3,
    alignSelf: "center",
    textAlign: "center",
  },
});
export default Slider;
