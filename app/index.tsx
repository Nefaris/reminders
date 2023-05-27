import { Layout, Text, List, ListItem, Button } from "@ui-kitten/components";
import { Tabs } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { CreateReminderModal } from "../components/CreateReminderModal";

const App = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <>
      <Tabs.Screen
        options={{
          title: "Przypomnienia",
          headerTitle: () => (
            <Text style={{ fontWeight: "bold", fontSize: 24 }}>
              Przypomnienia
            </Text>
          ),
          headerRight: () => (
            <View style={{ paddingHorizontal: 16 }}>
              <Button onPress={() => setIsCreateModalOpen(true)} size="tiny">
                Dodaj
              </Button>
            </View>
          ),
        }}
      />

      <Layout style={{ flex: 1 }}>
        <List
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]}
          renderItem={() => <ListItem title="Item" description="Description" />}
        />
      </Layout>

      <CreateReminderModal
        visible={isCreateModalOpen}
        onDismiss={() => setIsCreateModalOpen(false)}
      />
    </>
  );
};

export default App;
