import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
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
import { Fontisto } from "@expo/vector-icons";
import HomeScreen_Skeleton from "../components/Loading/Skeletons/HomeScreen_Skeleton";

const height = Dimensions.get("window").height;
const HomeScreen = ({ navigation }) => {
  const [trending, settrending] = useState([]);

  useEffect(() => {
    fetchdata();
    movieFetch(1);
    Action("Action", 1);
  }, []);

  const [TopLoading, setToploading] = useState(true);

  const GenraFetchingFunc = async (genra, page, setData) => {
    try {
      const data = await GenraFetch(genra, page);
      setData(data?.animes);
    } catch (e) {
      console.log(e);
    }
  };

  const [sports, setsports] = useState();
  const [romace, Setromace] = useState([]);
  const [popular, setpopular] = useState();
  const [RecentEPdata, setRecentEPdata] = useState([]);
  const [topAir, setTopAir] = useState(true);

  const fetchdata = async () => {
    const call = await HomepageFetch();
    settrending(call?.trendingAnimes);
    setRecentEPdata(call?.latestEpisodeAnimes);
    setTopAir(call?.topAiringAnimes);
    setToploading(false);
  };

  const [movie, setmovie] = useState([]);
  const [mo_loading, setmo_loading] = useState(true);
  const movieFetch = async (page) => {
    const call = await Movies(page);
    setmovie(call?.animes);
    setmo_loading(false);
  };

  const [action, setaction] = useState();
  const [ac_loading, setac_loading] = useState(true);
  const Action = async (genra, page) => {
    GenraFetchingFunc(genra, page, setaction);
    setac_loading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: Colors.Main_Color }}>
        <ScrollView>
          {/* //TODO Hero Banner From the Component */}
          <TopBanner data={trending} naviagtion={navigation} />

          {/* //TODO this is a aall anime section  */}
          <View style={styles.all_anime_list_container}>
            <View>
              <GenraTitleBlock
                GenraName={"Recent Anime"}
                navigation={navigation}
                data={"recently-updated"}
                genra={false}
              />

              <View style={{ width: "100%", minHeight: 200 }}>
                {TopLoading ? (
                  <HomeScreen_Skeleton />
                ) : (
                  <AnimeCard data={RecentEPdata} navigation={navigation} />
                )}
              </View>
            </View>
            <QuotesBlock />
            <View style={styles.cont_topmargin}>
              <GenraTitleBlock
                GenraName={"Top Airing"}
                navigation={navigation}
                data={"top-airing"}
                genra={false}
              />
              {TopLoading ? (
                <HomeScreen_Skeleton />
              ) : (
                <AnimeCard data={topAir} navigation={navigation} />
              )}
            </View>
            <View style={styles.cont_topmargin}>
              <GenraTitleBlock
                GenraName={"Top Movies"}
                navigation={navigation}
                data={"movie"}
                genra={false}
              />
              {mo_loading ? (
                <HomeScreen_Skeleton />
              ) : (
                <AnimeCard data={movie} navigation={navigation} />
              )}
            </View>
            <View style={styles.cont_topmargin}>
              <GenraTitleBlock
                GenraName={"Action Anime"}
                navigation={navigation}
                data={action}
                genra={true}
              />
              {ac_loading ? (
                <HomeScreen_Skeleton />
              ) : (
                <AnimeCard data={action} navigation={navigation} />
              )}
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
    marginTop: moderateScale(17)
  },
});
export default HomeScreen;
