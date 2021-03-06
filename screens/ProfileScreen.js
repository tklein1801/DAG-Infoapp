import React from "react";
// Routes
import Profile from "../components/Profile";
import Vehicles from "../components/Vehicles";
import House from "../components/Houses";
// Components
import TabBarIcon from "../components/TabBarIcon";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Profile";

const ProfileScreen = () => {
  const routes = [
    { name: "Profile", title: "Profil", component: Profile, icon: "ios-contact" },
    { name: "Vehicles", title: "Fahrzeuge", component: Vehicles, icon: "ios-car" },
    {
      name: "Houses",
      title: "Häuser",
      component: House,
      icon: "ios-home",
    },
  ];

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        style: {
          elevation: 0, // for android
          shadowOpacity: 0, // for iOS
          borderBottomWidth: 1,
          borderBottomColor: "#ededed",
        },
      }}
    >
      {routes.map((route) => {
        return (
          <BottomTab.Screen
            name={route.name}
            component={route.component}
            options={{
              title: route.title,
              tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={route.icon} />,
            }}
          />
        );
      })}
    </BottomTab.Navigator>
  );
};

export default ProfileScreen;
