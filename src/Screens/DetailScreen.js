import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Details } from "../Api/apicall";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";
import { Colors, Fonts } from "../ConstStyles/ColorFont";
import { Entypo } from "@expo/vector-icons";
import Btn_play_Download from "../components/DetailScreen/Btn_play_Download";
import { FontAwesome5 } from "@expo/vector-icons";
import TextTicker from "react-native-text-ticker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import { Loadingscreen } from "../components/Loading/Loadingscreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GetAllaSave, removeData, saveData } from "../hooks/CheckSave";
import { Octicons } from "@expo/vector-icons";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const DetailScreen = ({ navigation, route }) => {
  const rt = route.params.item;
  var selected = rt.id;
  const poster = rt.poster;

  useEffect(() => {
    FetchingData(selected);
    // GetAllaSave(selected);
  }, [selected]);

  const [loading, setloading] = useState(true);
  const [isSaved, setisSaved] = useState(false);
  const [data, setData] = useState();
  const [season, setseason] = useState([]);
  const [currentId, setcurrentId] = useState();
  const FetchingData = async (selected) => {
    try {
      setData();
      setloading(true);
      GetAllaSave(selected);

      const call = await Details(selected);
      setData(call?.anime);
      setseason(call);
      setcurrentId(call?.anime.info?.id);
    } catch (e) {
      console.log(e);
    } finally {
      setloading(false);
    }
  };

  const dataObject = {
    id: selected,
    img: poster,
  };

  const togglesave = () => {
    setisSaved(!isSaved);
    isSaved ? removeData(selected) : saveData(dataObject);
  };

  const GetAllaSave = async (id) => {
    try {
      const newgg = await AsyncStorage.getItem("idforsave");
      if (newgg) {
        // setFf(JSON.parse(newgg));
        const dataArray = JSON.parse(newgg);
        const isSaved = dataArray.some((item) => item.id === id);
        // console.log(dataArray);
        setisSaved(isSaved);
      } else {
        console.log("No saved IDs found.");
        setisSaved(false);
      }
    } catch (error) {
      console.log("Error retrieving data:", error);
    }
  };

  if (loading) {
    return <Loadingscreen />;
  }

  const Slider = ({ data }) => {
    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        // estimatedItemSize={100}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => FetchingData(item.id)}>
            <Image
              source={{
                uri: item.poster,
              }}
              style={styles.PosterImage}
            />
            <View style={styles.Tiltle_container}>
              <Text numberOfLines={1} style={styles.titles}>
                {item.name ?? "NA"}
              </Text>
              <Text style={styles.Radate_Rating}>
                {item.type ?? "TV"} - Rating - {item.rating ?? "13+"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        key={data?.id}
      />
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: Colors.Main_Color }}>
        <ScrollView>
          {/* TODO: THis is a image  */}
          <View>
            <Image
              source={{ uri: data?.info?.poster }}
              style={{ height: moderateScale(320), width: "100%" }}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("MainScreen")}
              style={{
                height: height * 0.07,
                maxHeight: 200,
                alignItems: "center",
                justifyContent: "center",
                maxWidth: 200,
                position: "absolute",
                width: height * 0.07,
                // backgroundColor: "red",
              }}
            >
              <MaterialCommunityIcons
                name="arrow-left-thick"
                size={30}
                color={Colors.Top_Btn_Color}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: height * 0.07,
                maxHeight: 200,
                alignItems: "center",
                justifyContent: "center",
                maxWidth: 200,
                position: "absolute",
                width: height * 0.07,
                // backgroundColor: "red",
                right: 0,
              }}
            >
              <Octicons
                name="search"
                size={moderateScale(25)}
                color={Colors.Top_Btn_Color}
                style={{
                  alignSelf: "center",
                  marginEnd: 20,
                }}
              />
            </TouchableOpacity>
          </View>

          {/* TODO: This is a TITLE Container  */}
          <View style={styles.container}>
            <View
              style={{
                justifyContent: "space-between",
                marginTop: 17,
                flexDirection: "row",
              }}
            >
              <View style={{ width: "75%" }}>
                {/* <TextTicker
                  style={styles.title}
                  duration={10000}
                  loop
                  // bounce
                  // repeatSpacer={50}
                  // marqueeDelay={1000}
                >
                  {data?.info?.name}
                </TextTicker> */}
                <TextTicker style={styles.title} duration={10000} loop>
                  {data?.info?.name}
                </TextTicker>
              </View>

              <View>
                <TouchableOpacity onPress={togglesave}>
                  {isSaved ? (
                    <FontAwesome name="bookmark" size={30} color="white" />
                  ) : (
                    <FontAwesome name="bookmark-o" size={30} color="white" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* TODO: Description container  */}
            <Text
              style={{
                fontSize: RFValue(14),
                // fontSize: RFPercentage(2.1),
                color: Colors.Top_Btn_Color,
                marginTop: 15,
              }}
            >
              Description
            </Text>
            <Text
              numberOfLines={4}
              style={{
                color: Colors.Text_Color,
                fontSize: RFPercentage(1.4),
                marginTop: 10,
              }}
            >
              {data?.info?.description ?? "NA"}
            </Text>
            {/* TODO: This are the play and doneload buttons  */}
            <Btn_play_Download
              navigation={navigation}
              id={currentId}
              img={data?.info?.poster}
            />

            {/* TODO: SEAson slider */}
            {season.seasons == 0 ? null : (
              <View>
                {/* TODO:Season silder  */}
                <Text style={styles.EP_title}> Seasons</Text>
                <Slider data={season?.seasons} />
              </View>
            )}
            {season?.relatedAnimes == 0 ? null : (
              <View>
                <Text style={styles.EP_title}>Related Animes</Text>
                <Slider data={season?.relatedAnimes} />
              </View>
            )}
            <View style={{ marginBottom: 40 }} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    // backgroundColor: "blue",
    alignSelf: "center",
  },
  titles: {
    width: "75%",
    fontSize: RFValue(12),
    // backgroundColor: "pink",
    color: Colors.Text_Color,
    alignSelf: "center",
    textAlign: "center",
  },
  EP_title: {
    color: Colors.Text_Color,
    fontWeight: "600",
    fontSize: RFValue(17),
    marginTop: 22,
    fontFamily: Fonts.Bold,
    marginBottom: 7,
  },
  image: {
    width: width * 0.36,
    backgroundColor: "grey",
    margin: 10,
    maxWidth: 200,
    maxHeight: 300,
    // height: 200,
    height: height * 0.275,
    borderRadius: 10,
    flex: 1,
    marginStart: 3,
  },
  text: {
    color: Colors.Text_Color,
    fontSize: RFValue(12),
    width: width * 0.3,
    alignSelf: "center",
    textAlign: "center",
    fontFamily: Fonts.Semibold,
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
    // maxWidth: '75%',
    // width: '75%',
    color: Colors.Text_Color,
    // alignSelf: "center",
    fontSize: RFValue(20),
    // backgroundColor: 'pink'
  },
  Radate_Rating: {
    color: "grey",
    fontSize: RFValue(10),
  },
});
export default DetailScreen;
