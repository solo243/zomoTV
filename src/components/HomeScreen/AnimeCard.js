import {
  View,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Colors } from "../../ConstStyles/ColorFont";
import { RFValue } from "react-native-responsive-fontsize";
import { FlashList } from "@shopify/flash-list";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const AnimeCard = ({ data, navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Detail", { id: item.id })}
    >
      <View>
        <Image
          source={{
            uri: item.poster,
          }}
          style={styles.PosterImage}
        />
        <View style={styles.Tiltle_container}>
          <Text numberOfLines={1} style={styles.title}>
            {item.name ?? "NA"}
          </Text>
          <Text style={styles.Radate_Rating}>
            {item.type ?? "TV"} - Rating - {item.rating ?? "13+"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
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
    height: height * 0.275,
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
    color: Colors.Text_Color,
    alignSelf: "center",
    fontSize: RFValue(13),
  },
  Radate_Rating: {
    color: "grey",
    fontSize: RFValue(10),
  },
});

export default AnimeCard;
