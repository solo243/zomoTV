import { View, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../ConstStyles/ColorFont";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import TopBanner from "../components/HomeScreen/TopBanner";
import GenraTitleBlock from "../components/HomeScreen/GenraTitleBlock";
import AnimeCard from "../components/HomeScreen/AnimeCard";
import {
  TrendingAnime,
  RecentEP,
  Moviesfetch,
  Popular,
  Genra,
} from "../Api/apicall";
import QuotesBlock from "../components/HomeScreen/QuotesBlock";

const HomeScreen = ({ navigation }) => {
  const [trending, settrending] = useState();

  useEffect(() => {
    if (!trending) {
      trendingdata(1);
    }
    if (!popular) {
      PopularFetch(1);
    }
    if (!RecentEPdata) {
      RecentEPS(1);
    }
    if (!movie) {
      Movies(1);
    }
    if (!sports) {
      sportscall("Sports", 1);
    }
    if (!romace) {
      romacecall("Romance", 1);
    }
  }, []);

  const fetchData = async (functions, page, setData) => {
    try {
      const data = await functions({ page });
      setData(data);
    } catch (e) {
      console.log("Error", e);
    }
  };

  const GenraFetchingFunc = async (genra, page, setData) => {
    try {
      const data = await Genra(genra, page);
      setData(data);
    } catch (e) {
      console.log(e);
    }
  };

  const [sports, setsports] = useState();

  const sportscall = async (genra, page) => {
    GenraFetchingFunc(genra, page, setsports);
  };

  const [romace, Setromace] = useState();
  const romacecall = async (genra, page) => {
    GenraFetchingFunc(genra, page, Setromace);
    // console.log("This is romace anime......", romace);
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
          {/* //TODO this is a aall anime section  */}
          <View style={styles.all_anime_list_container}>
            <View>
              <GenraTitleBlock
                GenraName={"Popular Anime"}
                navigation={navigation}
                data={popular}
              />
              <View style={{ width: "100%", minHeight: 200 }}>
                <AnimeCard data={popular} />
              </View>
            </View>
            <QuotesBlock />
            <View style={{ marginTop: 22 }}>
              <GenraTitleBlock
                GenraName={"Popular Movies"}
                navigation={navigation}
                data={movie}
              />
              <AnimeCard data={movie} />
            </View>
            <View style={{ marginTop: 22 }}>
              <GenraTitleBlock
                GenraName={"Romace Anime"}
                navigation={navigation}
                data={romace}
              />
              <AnimeCard data={romace} />
            </View>
            <View style={{ marginTop: 22 }}>
              <GenraTitleBlock
                GenraName={"Sports Anime"}
                navigation={navigation}
                data={sports}
              />
              <AnimeCard data={sports} />
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
