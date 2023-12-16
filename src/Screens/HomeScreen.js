import { View, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../ConstStyles/ColorFont";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, verticalScale } from "react-native-size-matters";
import TopBanner from "../components/HomeScreen/TopBanner";
import GenraTitleBlock from "../components/HomeScreen/GenraTitleBlock";
import AnimeCard from "../components/HomeScreen/AnimeCard";
import {
  TrendingAnime,
  RecentEP,
  Moviesfetch,
  Popular,
  Genra,
  HomepageFetch,
  Movies,
  GenraFetch,
} from "../Api/apicall";
import QuotesBlock from "../components/HomeScreen/QuotesBlock";

const HomeScreen = ({ navigation }) => {
  const [trending, settrending] = useState();

  useEffect(() => {
    fetchdata();
    movieFetch(1);
    Action("Action", 1);
    // if (!trending) {
    //   trendingdata(1);
    // }
    // if (!popular) {
    //   PopularFetch(1);
    // }
    // if (!RecentEPdata) {
    //   RecentEPS(1);
    // }
    // if (!movie) {
    //   Movies(1);
    // }
    // if (!sports) {
    //   sportscall("Sports", 1);
    // }
    // if (!romace) {
    //   romacecall("Romance", 1);
    // }
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
      const data = await GenraFetch(genra, page);
      setData(data?.animes);
    } catch (e) {
      console.log(e);
    }
  };

  const [sports, setsports] = useState();
  const [romace, Setromace] = useState();
  // const romacecall = async (genra, page) => {
  //   GenraFetchingFunc(genra, page, Setromace);
  // };

  const [popular, setpopular] = useState();
  const [RecentEPdata, setRecentEPdata] = useState();
  const [topAir, setTopAir] = useState();

  const [animeOfWeek, setAnimeOfWeek] = useState();
  const fetchdata = async () => {
    const call = await HomepageFetch();
    settrending(call?.trendingAnimes);
    setRecentEPdata(call?.latestEpisodeAnimes);
    setTopAir(call?.topAiringAnimes);
    setAnimeOfWeek(call?.top10Animes?.week);
  };

  const [movie, setmovie] = useState();
  const movieFetch = async (page) => {
    const call = await Movies(page);
    setmovie(call?.animes);
  };

  const [action, setaction] = useState();
  const Action = async (genra, page) => {
    GenraFetchingFunc(genra, page, setaction);
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
                GenraName={"Recent Anime"}
                navigation={navigation}
                data={RecentEPdata}
              />
              <View style={{ width: "100%", minHeight: 200 }}>
                <AnimeCard data={RecentEPdata} navigation={navigation} />
              </View>
            </View>
            <QuotesBlock />
            <View style={styles.cont_topmargin}>
              <GenraTitleBlock
                GenraName={"Top Airing"}
                navigation={navigation}
                data={movie}
              />
              <AnimeCard data={topAir} navigation={navigation} />
            </View>
            <View style={styles.cont_topmargin}>
              <GenraTitleBlock
                GenraName={"Top Movies"}
                navigation={navigation}
                data={romace}
              />
              <AnimeCard data={movie} navigation={navigation} />
            </View>
            <View style={styles.cont_topmargin}>
              <GenraTitleBlock
                GenraName={"Action Anime"}
                navigation={navigation}
                data={action}
              />
              <AnimeCard data={action} navigation={navigation} />
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
  cont_topmargin: {
    marginTop: 8,
  },
});
export default HomeScreen;
