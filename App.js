require("react-native").unstable_enableLogBox();
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useCachedResources from "./hooks/useCachedResources";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import LinkingConfiguration from "./navigation/LinkingConfiguration";
import { SettingsModal } from "./components/SettingsModal";

const Stack = createStackNavigator();

export default function App() {
  const isLoadingComplete = useCachedResources();
  let popupRef = React.createRef();
  const onShowPopup = () => {
    popupRef.show();
  };
  const onClosePopup = () => {
    popupRef.close();
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
        <NavigationContainer linking={LinkingConfiguration}>
          <Stack.Navigator>
            <Stack.Screen
              name="Root"
              component={BottomTabNavigator}
              options={{
                headerStyle: {
                  backgroundColor: "#fff",
                  elevation: 0, // for android
                  shadowOpacity: 0, // for iOS
                  borderBottomWidth: 1,
                  borderBottomColor: "#ededed",
                },
                headerTintColor: "black",
                headerTitleStyle: {
                  fontWeight: "bold",
                  flexGrow: 1,
                  alignSelf: "center",
                  marginRight: -55 /* required to be in center bcause of the headerRight-element */,
                },
                headerRight: () => (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      onShowPopup();
                    }}
                  >
                    <Ionicons
                      style={{ marginRight: 25 }}
                      name="ios-settings"
                      size={28}
                      color="black"
                    />
                  </TouchableWithoutFeedback>
                ),
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <SettingsModal ref={(target) => (popupRef = target)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
