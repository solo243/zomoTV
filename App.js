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

const Stack = createStackNavigator();
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
                size={28}
                color={Colors.Bottom_Bar_Active}
              />
            ) : (
              <Ionicons
                name="home-outline"
                size={28}
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
                size={28}
                color={Colors.Bottom_Bar_Active}
              />
            ) : (
              <Feather
                name="search"
                size={28}
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
                size={25}
                color={Colors.Bottom_Bar_Active}
              />
            ) : (
              <Ionicons
                name="bookmarks-outline"
                size={24}
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
                size={29}
                color={Colors.Bottom_Bar_Active}
              />
            ) : (
              <MaterialCommunityIcons
                name="account-cowboy-hat-outline"
                size={29}
                color={Colors.Bottom_Bar_Passive}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

const StackScreens = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="MainScreen"
        component={TabNavigator}
        options={{
          presentation: "modal",
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="Seeall"
        component={SeeAll}
        options={{
          presentation: "modal",
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
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
