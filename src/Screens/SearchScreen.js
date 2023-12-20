import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../ConstStyles/ColorFont";
import { Octicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import { Search } from "../Api/apicall";
import _ from "lodash";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const SearchScreen = ({ navigation }) => {
  const [SearchQuerys, SetsearchQuery] = useState();
  const [data, setdata] = useState([]);

  const handletext = async (value) => {
    console.log(value);
    SetsearchQuery(value);
    if (!SearchQuerys) return null;
    if (SearchQuerys.length > 3) {
      const url = `https://aniwatch-api-solo243.vercel.app/anime/search?q=${SearchQuerys}&page=1`;
      const response = await fetch(url);
      const jj = await response.json();
      setdata(jj.animes);
    } else {
      console.log("small hai ");
    }
  };

  useEffect(() => {
    const debouncedFetchData = setTimeout(() => {
      handletext(SearchQuerys);
    }, 600);
    return () => clearTimeout(debouncedFetchData);
  }, [SearchQuerys]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: Colors.Main_Color }}>
        <View>
          <View style={styles.searchContainer}>
            <Octicons
              name="search"
              size={moderateScale(20)}
              color={Colors.Top_Btn_Color}
              style={{
                alignSelf: "center",
                marginStart: 20,
              }}
            />
            <TextInput
              value={SearchQuerys}
              onChangeText={(text) => SetsearchQuery(text)}
              style={styles.Search_Container}
              placeholder="Search....."
              placeholderTextColor={"#F0F2F1"}
            ></TextInput>
          </View>
        </View>
        <ScrollView>
          <View style={styles.result_container}>
            {data ? (
              data.map((item) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Detail", { item: item })}
                >
                  <Image source={{ uri: item.poster }} style={styles.image} />
                  <View style={styles.title_container}>
                    <Text style={styles.title} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text style={styles.rating}>
                      {item.type ?? "NA"} - Rating - {item.rating ?? "NA"}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View></View>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    marginBottom: 10,
    marginTop: 30,
    height: moderateScale(50),
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    flexDirection: "row",
    borderColor: "#F0F2F1",
    borderWidth: 1,
  },
  Search_Container: {
    marginStart: 20,
    fontWeight: "600",
    fontSize: RFValue(13),
    width: "70%",
    color: "#F0F2F1",
  },
  result_container: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    alignSelf: "center",
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  image: {
    height: height * 0.3,
    width: width * 0.4,
    maxHeight: 380,
    borderRadius: 10,
    maxWidth: 250,
    backgroundColor: "grey",
    margin: 10,
  },
  title_container: {
    height: height * 0.03,
    width: width * 0.4,
    maxHeight: 380,
    borderRadius: 10,
    maxWidth: 250,
    margin: 10,
    marginBottom: "14%",
    marginTop: "0%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
  },
  title: {
    color: "white",
    fontSize: RFValue(12),
    textAlign: "center",
  },
  rating: {
    color: "grey",
    textAlign: "center",
    fontSize: RFValue(10),
  },
});
export default SearchScreen;
