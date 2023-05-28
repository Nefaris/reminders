import * as eva from "@eva-design/eva";
import "react-native-get-random-values";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as Notifications from "expo-notifications";
import { Tabs } from "expo-router";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const AppLayout = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Tabs />
      </ApplicationProvider>
    </>
  );
};

export default AppLayout;
