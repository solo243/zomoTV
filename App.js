import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import HomeScreen from "./src/Screens/HomeScreen";
import SearchScreen from "./src/Screens/SearchScreen";
import SaveScreen from "./src/Screens/SaveScreen";
import Account from "./src/Screens/Account";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "./src/ConstStyles/ColorFont";
import { moderateScale } from "react-native-size-matters";
import { StatusBar } from "react-native";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import SeeAll from "./src/Screens/SeeAll";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Easing } from "react-native";
import DetailScreen from "./src/Screens/DetailScreen";
// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    // <StatusBar/>
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors.Main_Color,
          elevation: 0,
          borderTopWidth: 0,
          height: moderateScale(57),
        },
        tabBarBackground: () => (
          <BlurView
            intensity={80}
            style={{
              // ...StyleSheet.absoluteFillObject,
              overflow: "hidden",
              background: "transparent",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          />
        ),
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons
                name="home"
                size={moderateScale(24)}
                color={Colors.Top_Btn_Color}
              />
            ) : (
              <Ionicons
                name="home-outline"
                size={moderateScale(24)}
                color={Colors.Bottom_Bar_Passive}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome
                name="search"
                size={moderateScale(24)}
                color={Colors.Top_Btn_Color}
              />
            ) : (
              <Feather
                name="search"
                size={moderateScale(24)}
                color={Colors.Bottom_Bar_Passive}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Save"
        component={SaveScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons
                name="bookmarks"
                size={moderateScale(22)}
                color={Colors.Top_Btn_Color}
              />
            ) : (
              <Ionicons
                name="bookmarks-outline"
                size={moderateScale(22)}
                color={Colors.Bottom_Bar_Passive}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Me"
        component={Account}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="account-cowboy-hat"
                size={moderateScale(24)}
                color={Colors.Top_Btn_Color}
              />
            ) : (
              <MaterialCommunityIcons
                name="account-cowboy-hat-outline"
                size={moderateScale(24)}
                color={Colors.Bottom_Bar_Passive}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
const closeConfig = {
  animation: "timing",
  config: {
    duration: 200,
    easing: Easing.linear,
  },
};

const StackScreens = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="MainScreen"
        component={TabNavigator}
        options={{
          // gestureDirection: "vertical",
          // transitionSpec: {
          //   open: config,
          //   close: closeConfig,
          // },
          presentation: "modal",
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="Seeall"
        component={SeeAll}
        // options={{
        //   presentation: "modal",
        //   animationTypeForReplace: "push",
        //   animation: "slide_from_right",
        // }}
      />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar />
      <StackScreens />
      {/* <SeeAll /> */}
    </NavigationContainer>
  );
}
