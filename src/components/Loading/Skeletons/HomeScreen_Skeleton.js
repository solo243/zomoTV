import { FlatList, View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { moderateScale } from "react-native-size-matters";
const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;
const HomeScreen_Skeleton = () => {
  return (
    <FlatList
      horizontal
      data={[1, 2, 3, 4, 5, 6]}
      renderItem={({ item }) => (
        <View>
          <View style={styles.PosterImage} />
          <View style={styles.Tiltle_container}>
            <View numberOfLines={1} style={styles.title} />
            <View style={styles.Radate_Rating} />
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  PosterImage: {
    height: height * 0.24,
    maxWidth: 200,
    maxHeight: 300,
    marginRight: 15,
    marginTop: 12,
    backgroundColor: "grey",
    borderRadius: 9,
    // width: moderateScale(140),
    width: width * 0.36,
  },
  Tiltle_container: {
    marginTop: 10,
    height: moderateScale(40),
    width: moderateScale(140),
    maxWidth: 200,
    alignItems: "center",
    maxHeight: 90,
  },
  title: {
    maxWidth: 140,
    height: moderateScale(10),
    width: moderateScale(120),
    backgroundColor: "grey",
    alignSelf: "center",
  },
  Radate_Rating: {
    height: moderateScale(10),
    width: moderateScale(100),
    backgroundColor: "grey",
    marginTop: 7,
  },
});

export default HomeScreen_Skeleton;
