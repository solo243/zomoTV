import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Genra, HomepageFetch, Movies, GenraFetch } from "../Api/apicall";
import { Colors } from "../ConstStyles/ColorFont";
import { moderateScale } from "react-native-size-matters";
import { RFValue } from "react-native-responsive-fontsize";
import { FlashList } from "@shopify/flash-list";
import { AntDesign } from "@expo/vector-icons";
import { Loadingscreen } from "../components/Loading/Loadingscreen";
import { Octicons } from "@expo/vector-icons";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const SeeAll = ({ navigation, route }) => {
  const tt = route.params.data;
  const title = route.params.gg;
  const genra = route.params.genra;
  const [cout, setcout] = useState(1);
  // console.warn(tt);

  useEffect(() => {
    // fetchingdata(tt, cout);
    // IsfromGenra(1);
    {
      genra ? IsfromGenra(cout) : fetchingdata(tt, cout);
    }
  }, [cout]);

  const hadnlepress = () => {
    setcout(cout + 1);
  };

  const PrevButton = () => {
    setcout(cout - 1);
  };
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);

  const fetchingdata = async (type, page) => {
    setloading(true);
    try {
      const call = await fetch(
        `https://aniwatch-api-solo243.vercel.app/anime/${type}?page=${page}`
      );
      const convert = await call.json();
      setdata(convert.animes);
      setloading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const IsfromGenra = async (page) => {
    setloading(true);

    try {
      const call = await GenraFetch("Action", page);
      setdata(call.animes);
      setloading(false);
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.Main_Color }}>
        <Loadingscreen />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.Main_Color }}>
      <ScrollView>
        <View>
          <View style={styles.header_Container}>
            <Text style={styles.header_Text}>{title}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Search")}
              style={styles.searchContainer}
            >
              <Octicons
                name="search"
                size={moderateScale(25)}
                color={Colors.Top_Btn_Color}
                style={{
                  alignSelf: "center",
                  marginStart: 20,
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.Flatlist_container}>
            <FlashList
              estimatedItemSize={80}
              numColumns={2}
              data={data}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <View style={styles.falt_Container}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Detail", { item: item })
                      }
                    >
                      <Image
                        // source={require("./ph.jpg")}
                        source={{ uri: item.poster }}
                        style={styles.image}
                      />
                      <View style={styles.ratingBox}>
                        <Text style={styles.ratingtext}>
                          {item.rating ?? "13+"}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        </View>

        <View style={styles.containerr}>
          {cout == 1 ? (
            console.log("")
          ) : (
            <TouchableOpacity onPress={PrevButton}>
              <View style={styles.btn}>
                <AntDesign name="arrowleft" size={24} color="white" />
                <Text style={styles.btn_text}>Prev</Text>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={hadnlepress}>
            <View style={styles.btn}>
              <Text style={styles.btn_text}>Next</Text>
              <AntDesign name="arrowright" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  PosterImage: {
    height: height * 0.275,
    maxWidth: 200,
    maxHeight: 300,
    // marginRight: 15,
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
  titles: {
    width: "75%",
    fontSize: RFValue(12),
    // backgroundColor: "pink",
    color: "white",
    alignSelf: "center",
    textAlign: "center",
  },
  Radate_Rating: {
    color: "grey",
    fontSize: RFValue(10),
  },
  btn_text: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
  containerr: {
    backgroundColor: Colors.Main_Color,
    height: height * 0.12,
    justifyContent: "center",
    gap: width * 0.13,
    alignItems: "center",
    marginBottom: 20,
    flexDirection: "row",
  },
  btn: {
    height: height * 0.06,
    borderRadius: 10,
    width: width * 0.3,
    backgroundColor: Colors.Top_Btn_Color,
    alignItems: "center",
    justifyContent: "center",
    gap: width * 0.02,
    flexDirection: "row",
  },

  header_Container: {
    height: moderateScale(60),
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",

    // alignItems: "center",
    // backgroundColor: "red",
    marginBottom: moderateScale(6),
  },
  header_Text: {
    fontSize: RFValue(20),
    color: Colors.Text_Color,
    marginStart: moderateScale(27),
  },
  Flatlist_container: {
    width: "92%",
    // backgroundColor: "red",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  falt_Container: {
    flex: 1,
    height: moderateScale(250),
    maxHeight: 300,
    maxWidth: 400,
    backgroundColor: "grey",
    margin: 8,
    flex: 1,
    borderRadius: 10,
  },
  image: {
    height: "100%",
    width: "100%",
    backgroundColor: "grey",
    borderRadius: 10,
  },
  ratingBox: {
    height: moderateScale(27),
    borderCurve: "circular",
    width: moderateScale(27),
    borderRadius: 10,
    top: 10,
    left: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.Top_Btn_Color,
    position: "absolute",
  },
  ratingtext: {
    color: Colors.Text_Color,
    fontWeight: "700",
  },
  searchContainer: {
    height: moderateScale(40),
    width: moderateScale(40),
    alignItems: "center",
    right: 30,
    justifyContent: "center",
    // backgroundColor: "red",
  },
});

export default SeeAll;
