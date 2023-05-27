import { Layout, Text } from "@ui-kitten/components";
import { Tabs } from "expo-router";

const SettingsPage = () => {
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

      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text category="h1">Settings page</Text>
      </Layout>
    </>
  );
};

export default SettingsPage;
