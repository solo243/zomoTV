import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../ConstStyles/ColorFont";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import { RFValue } from "react-native-responsive-fontsize";
import TopBanner from "../components/HomeScreen/TopBanner";
import GenraTitleBlock from "../components/HomeScreen/GenraTitleBlock";
import AnimeCard from "../components/HomeScreen/AnimeCard";
import { TrendingAnime, RecentEP, Moviesfetch, Popular } from "../Api/apicall";

const HomeScreen = () => {
  const [trending, settrending] = useState();

  useEffect(() => {
    trendingdata(1);
    // RecentEPS(1);
    PopularFetch(1);
    Movies(1);
  }, []);

  const fetchData = async (functions, page, setData) => {
    try {
      const data = await functions({ page });
      setData(data);
    } catch (e) {
      console.log("Error", e);
    }
  };

  const trendingdata = async (page) => {
    fetchData(TrendingAnime, page, settrending);
  };

  const [popular, setpopular] = useState();
  const PopularFetch = async (page) => {
    fetchData(Popular, page, setpopular);
  };

  const [RecentEPdata, setRecentEPdata] = useState();
  const RecentEPS = async (page) => {
    fetchData(RecentEP, page, setRecentEPdata);
  };

  const [movie, setmovie] = useState();
  const Movies = async (page) => {
    fetchData(Moviesfetch, page, setmovie);
    console.log("Working ");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: Colors.Main_Color }}>
        <ScrollView>
          {/* //TODO Hero Banner From the Component */}
          <TopBanner data={trending} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignContent: "center",
            }}
          ></View>
          {/* //TODO this is a aall anime section  */}
          <View style={styles.all_anime_list_container}>
            <View>
              <GenraTitleBlock GenraName={"Popular Anime"} />
              <View style={{ width: "100%", minHeight: 200 }}>
                <AnimeCard data={popular} />
              </View>
            </View>
            <View style={{ marginTop: 22 }}>
              <GenraTitleBlock GenraName={"Popular Movies"} />
              <AnimeCard data={movie} />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  all_anime_list_container: {
    marginTop: moderateScale(40),
    width: "95%",
    marginStart: moderateScale(20),
  },
});
export default HomeScreen;
