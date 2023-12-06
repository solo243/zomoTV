import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
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

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      {/* // juat remove status bar to make it trasparent */}
      <StatusBar />
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
    </NavigationContainer>
  );
}
