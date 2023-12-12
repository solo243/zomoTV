import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { randomell } from "../../Api/quotes";
import { Colors } from "../../ConstStyles/ColorFont";
const QuotesBlock = () => {
  useEffect(() => {
    kk();
  }, []);
  const [data, setData] = useState([]);
  const kk = async () => {
    const gg = await randomell();
    setData(gg);

  };
  return (
    <View style={styles.container}>
      <Text style={styles.quotes_text}>{data.Quote}</Text>
      <View style={styles.container_cahrAndAnime}>
        <Text style={styles.cahr_and_anime_text}>
          - {data.Character} {"\n"} {data.Anime}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    backgroundColor: "#3a3a3a",
    // backgroundColor: "lightgrey",
    padding: 20,
    marginTop: 10,
    borderRadius: 10,
  },
  quotes_text: {
    color: "white",
  },
  cahr_and_anime_text: {
    color: Colors.Top_Btn_Color,
    left: 0,
    display: "flex",
    fontWeight: "500",
  },
  container_cahrAndAnime: {
    width: "100%",
  },
});

export default QuotesBlock;
