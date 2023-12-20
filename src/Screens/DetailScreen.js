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
import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../ConstStyles/ColorFont";
import { Entypo } from "@expo/vector-icons";
import Btn_play_Download from "../components/DetailScreen/Btn_play_Download";
import { FontAwesome5 } from "@expo/vector-icons";
import TextTicker from "react-native-text-ticker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import { Loadingscreen } from "../components/Loading/Loadingscreen";
import Slider from "../components/DetailScreen/Slider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GetAllaSave, removeData, saveData } from "../hooks/CheckSave";
import { FlashList } from "@shopify/flash-list";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const DetailScreen = ({ navigation, route }) => {
  const rt = route.params.item;
  const selected = rt.id;
console.log(route)
  const poster = rt.poster;
  // console.log(rt.poster);
  const [loading, setloading] = useState(true);
  const [isSaved, setisSaved] = useState(false);

  useEffect(() => {
    FetchingData(selected);
    GetAllaSave();
  }, []);

  const [data, setData] = useState();
  const [season, setseason] = useState([]);
  const FetchingData = async (selected) => {
    try {
      setloading(true);
      const call = await Details(selected);
      setData(call?.anime);
      setseason(call);
      console.log(call);
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

  const GetAllaSave = async () => {
    try {
      const newgg = await AsyncStorage.getItem("idforsave");
      if (newgg) {
        // setFf(JSON.parse(newgg));
        const dataArray = JSON.parse(newgg);
        const isSaved = dataArray.some((item) => item.id === selected);
        console.log(dataArray);
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

  const Slider = ({ data, navigation }) => {
    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        // estimatedItemSize={100}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => FetchingData(item.id)}>
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
                <TextTicker
                  style={styles.title}
                  duration={10000}
                  loop
                  // bounce
                  // repeatSpacer={50}
                  // marqueeDelay={1000}
                >
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
                color: Colors.Top_Btn_Color,
                marginTop: 15,
              }}
            >
              Description
            </Text>
            <Text
              numberOfLines={4}
              style={{ color: "white", fontSize: RFValue(10), marginTop: 10 }}
            >
              {data?.info?.description ?? "NA"}
            </Text>
            {/* TODO: This are the play and doneload buttons  */}
            <Btn_play_Download navigation={navigation} id={selected} />

            {/* TODO: SEAson slider */}
            {season.seasons == 0 ? null : (
              <View>
                {/* TODO:Season silder  */}
                <Text style={styles.EP_title}> Seasons</Text>
                <Slider data={season?.seasons} navigation={navigation} />
              </View>
            )}
            {season?.relatedAnimes == 0 ? null : (
              <View>
                <Text style={styles.EP_title}>Related Animes</Text>
                <Slider data={season?.relatedAnimes} navigation={navigation} />
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
  title: {
    width: "75%",
    fontSize: RFValue(20),
    // backgroundColor: "pink",
    color: "white",
  },
  EP_title: {
    color: "white",
    fontWeight: "600",
    fontSize: RFValue(17),
    marginTop: 22,
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
    color: "white",
    fontSize: RFValue(12),
    width: width * 0.3,
    alignSelf: "center",
    textAlign: "center",
  },
});
export default DetailScreen;
