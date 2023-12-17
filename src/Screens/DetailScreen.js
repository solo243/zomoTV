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
import { Loadingscreen } from "../components/Loading/Loadingscreen";
import Slider from "../components/DetailScreen/Slider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const DetailScreen = ({ navigation, route }) => {
  const selected = route.params.id;
  const [loading, setloading] = useState(true);
  useEffect(() => {
    FetchingData(selected);
  }, []);

  const [data, setData] = useState();
  const [season, setseason] = useState([]);
  const FetchingData = async (selected) => {
    try {
      const call = await Details(selected);
      setData(call?.anime);
      setloading(false);
      setseason(call);
      // console.log(call);
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) {
    return <Loadingscreen />;
  }

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
            <View style={{ justifyContent: "space-between", marginTop: 17 }}>
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

              <View></View>
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
              {data?.info?.description}
            </Text>
            {/* TODO: This are the play and doneload buttons  */}
            <Btn_play_Download navigation={navigation} />

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
});
export default DetailScreen;
