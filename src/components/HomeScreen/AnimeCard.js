import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Colors } from "../../ConstStyles/ColorFont";
import { RFValue } from "react-native-responsive-fontsize";
import { FlashList } from "@shopify/flash-list";
  88
const AnimeCard = ({ data }) => {
  const renderItem = ({ item }) => (
    <View>
      <Image
        source={{
          uri: item.image,
        }}
        style={styles.PosterImage}
      />
      <View style={styles.Tiltle_container}>
        <Text numberOfLines={1} style={styles.title}>
          {item.title?.english ?? "NA"}
        </Text>
        <Text style={styles.Radate_Rating}>
          {item.releaseDate ?? "NA"} - Rating {item.rating ?? "NA"}
        </Text>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlashList
        horizontal
        estimatedItemSize={90}
        data={data ?? [1, 2, 3, 4, 5, 6]}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        key={data?.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 10,
    flexGrow: 1,
    flexDirection: "row",
  },
  PosterImage: {
    height: moderateScale(210),
    maxWidth: 200,
    maxHeight: 300,
    marginRight: 15,
    marginTop: 20,
    backgroundColor: "grey",
    borderRadius: 9,
    width: moderateScale(140),
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
    color: Colors.Text_Color,
    alignSelf: "center",
    fontSize: RFValue(11),
  },
  Radate_Rating: {
    color: "grey",
    fontSize: RFValue(10),
  },
});

export default AnimeCard;
