import { ListItem, Text, Toggle } from "@ui-kitten/components";
import { Tabs } from "expo-router";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Preferences } from "../types";
import { ScrollView } from "react-native";

const SettingsPage = () => {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);

  useEffect(() => {
    const getPreferences = async () => {
      const storagePreferences = await AsyncStorage.getItem("preferences");
      const preferences: Preferences = JSON.parse(storagePreferences) ?? {
        theme: "light",
      };

      setIsDarkModeEnabled(preferences.theme === "dark");
    };

    getPreferences();
  }, []);

  const handleDarkModeToggle = async (checked: boolean) => {
    const preferences: Preferences = {
      theme: checked ? "dark" : "light",
    };

    setIsDarkModeEnabled(checked);

    try {
      AsyncStorage.setItem("preferences", JSON.stringify(preferences));
    } catch {
      setIsDarkModeEnabled(!checked);
    }
  };

  return (
    <>
      <Tabs.Screen
        options={{
          title: "Ustawienia",
          headerTitle: () => (
            <Text style={{ fontWeight: "bold", fontSize: 24 }}>Ustawienia</Text>
          ),
        }}
      />

      <ScrollView
        style={{
          flex: 1,
          paddingVertical: 16,
          paddingHorizontal: 16,
          backgroundColor: "#FFF",
        }}
      >
        <ListItem
          title="Ciemny motyw"
          description="Zmień motyw aplikacji"
          accessoryRight={
            <Toggle
              checked={isDarkModeEnabled}
              onChange={handleDarkModeToggle}
            />
          }
        />
      </ScrollView>
    </>
  );
};

export default SettingsPage;
