import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../ConstStyles/ColorFont";
import { moderateScale } from "react-native-size-matters";
import { FlashList } from "@shopify/flash-list";
import { RFValue } from "react-native-responsive-fontsize";
import { HomepageFetch, Movies, Moviesfetch, Popular } from "../Api/apicall";
import { AntDesign } from "@expo/vector-icons";
import { Loadingscreen } from "../components/Loading/Loadingscreen";
import NextButtons, { handlepress } from "../components/SeeAll/NextButtons";
import Topbar from "../components/SeeAll/Topbar";
import { TrendingAnime } from "../Api/apicall";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const SeeAll = ({ navigation, route }) => {
  const rt = route.params;
  // const data = rt?.data;
  const title = rt?.title;
  console.log(rt);
  // useEffect(() => {
  //   {
  //     isForTreding
  //       ? fetchData(TrendingAnime, 1, setdata) && setloading(false)
  //       : GenraFetchingFunc("Romance", 1, setdata) && setloading(false);
  //   }
  // }, []);

  // const [data, setdata] = useState([]);
  // const [loading, setloading] = useState(true);
  // const [isForTreding, SetForTrending] = useState(false);

  const NextButton = () => {
    setloading(true);
    const nextpage = Math.max(currentpage + 1);
    console.log(nextpage);

    setcurrentpage(nextpage);
    setloading(false);
  };

  // const PrevButton = () => {
  //   setloading(true);
  //   const prevpage = Math.max(currentpage - 1, 1);
  //   {
  //     isForTreding
  //       ? fetchData(TrendingAnime, prevpage, setdata)
  //       : GenraFetchingFunc("Romance", prevpage, setdata);
  //   }
  //   setcurrentpage(prevpage);
  //   setloading(false);
  // };

  useEffect(() => {
    FetchMovies(currentpage);
  }, [currentpage]);

  const [loading, setloading] = useState(false);
  const [data, setdata] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  const FetchMovies = async (page) => {
    const call = await Movies(page);
    setdata(call?.animes?.data);
    console.log(call.animes);
    setloading(false);
  };

  if (loading) {
    return <Loadingscreen />;
  }

  const Flatrender = ({ item }) => {
    return (
      <TouchableOpacity>
        <View style={styles.newflatlist_cont}>
          <Image
            // source={require("./ph.jpg")}
            source={{ uri: item.poster }}
            style={{ height: "80%", width: "100%", borderRadius: 10 }}
          />
          <Text numberOfLines={1} style={styles.title}>
            {item.name ?? "NA"}
          </Text>
          <Text style={{ alignSelf: "center", color: "grey" }}>
            {item.type ?? "NA"} - Rating - {item.rating ?? "13+"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.Main_Color }}>
      {/* <Topbar navigation={navigation} title={title} />
      <ScrollView style={{ backgroundColor: Colors.Main_Color }}>
        <View style={styles.container}>
          <View style={styles.parent_flatlist_container}>
            <FlashList
              numColumns={2}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
              }}
              data={data ?? [1, 2, 3, 4, 5, 6, 7, 8]}
              // data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
              renderItem={Flatrender}
              estimatedItemSize={20}
              // key={data?.id}
            />
          </View>
        </View>
        <View style={styles.containerr}>
          {currentpage == 1 ? (
            console.log("")
          ) : (
            <TouchableOpacity onPress={() => PrevButton()}>
              <View style={styles.btn}>
                <AntDesign name="arrowleft" size={24} color="white" />
                <Text style={styles.btn_text}>Prev</Text>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => NextButton()}>
            <View style={styles.btn}>
              <Text style={styles.btn_text}>Next</Text>
              <AntDesign name="arrowright" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView> */}
      <Topbar navigation={navigation} title={title} />
      <ScrollView>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.Main_Color,
            flexDirection: "row",
            alignItems: "center",

            justifyContent: "center",
            gap: 15,
            flexWrap: "wrap",
          }}
        >
          {data.map((item) => (
            <View style={styles.newflatlist_cont} key={item.id}>
              <Image
                // source={require("./ph.jpg")}
                source={{ uri: item.poster }}
                style={{ height: "80%", width: "100%", borderRadius: 10 }}
              />
              <Text numberOfLines={1} style={styles.title}>
                {item.name ?? "NA"}
              </Text>
              <Text style={{ alignSelf: "center", color: "grey" }}>
                {item.type ?? "NA"} - Rating - {item.rating ?? "13+"}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.containerr}>
          {currentpage == 1 ? (
            console.log("")
          ) : (
            <TouchableOpacity onPress={() => PrevButton()}>
              <View style={styles.btn}>
                <AntDesign name="arrowleft" size={24} color="white" />
                <Text style={styles.btn_text}>Prev</Text>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => NextButton()}>
            <View style={styles.btn}>
              <Text style={styles.btn_text}>Next</Text>
              <AntDesign name="arrowright" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Main_Color,
    width: "100%",
    alignSelf: "center",
    display: "flex",
    flex: 1,
  },
  flatlist_container: {
    flex: 1,
    display: "flex",
    margin: 10,
    height: moderateScale(200),
    maxHeight: 300,
    width: "95%",
    maxWidth: 500,
    flexDirection: "row",
    borderRadius: 10,
  },
  newflatlist_cont: {
    height: moderateScale(290),
    width: moderateScale(150),
    margin: 10,
    marginTop: 5,

    // flex: 1,
    // backgroundColor: "red",
  },
  parent_flatlist_container: {
    width: "90%",
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
    alignSelf: "center",
  },
  title: {
    marginTop: 10,
    alignSelf: "center",
    color: "white",
    fontSize: RFValue(13.4),
    textAlign: "center",
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
  btn_text: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
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
});

export default SeeAll;
