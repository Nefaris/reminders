import { useEffect, useState } from "react";
import * as eva from "@eva-design/eva";
import "react-native-get-random-values";
import { ApplicationProvider } from "@ui-kitten/components";
import * as Notifications from "expo-notifications";
import { Tabs } from "expo-router";
import { SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { getUserPreferences } from "../utils/userPreferences";
import { UserPreferencesProvider } from "../components/UserPreferencesContext";
import { Preferences } from "../types";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const AppLayout = () => {
  const [isAppReady, setIsAppReady] = useState(false);
  const [theme, setTheme] = useState<Preferences["theme"]>("light");

  useEffect(() => {
    getUserPreferences().then((preferences) => {
      setTheme(preferences.theme);
      setIsAppReady(true);
    });
  }, []);

  const evaTheme = theme === "light" ? eva.light : eva.dark;

  return (
    <>
      {!isAppReady && <SplashScreen />}
      <StatusBar style={theme === "light" ? "dark" : "light"} />
      <ApplicationProvider {...eva} theme={evaTheme}>
        <UserPreferencesProvider theme={theme} setTheme={setTheme}>
          <Tabs />
        </UserPreferencesProvider>
      </ApplicationProvider>
    </>
  );
};

export default AppLayout;
