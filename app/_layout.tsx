import * as eva from "@eva-design/eva";
import "react-native-get-random-values";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { Tabs } from "expo-router";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

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
