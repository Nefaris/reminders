import { Layout, Text, List, ListItem, Button } from "@ui-kitten/components";
import { Tabs } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CreateReminderModal } from "../components/CreateReminderModal";
import { Reminder } from "../types";

const App = () => {
  const [selectedReminder, setSelectedReminder] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    AsyncStorage.getItem("reminders").then((reminders) => {
      if (!reminders) return;
      setReminders(JSON.parse(reminders));
    });
  }, []);

  const handleOpenReminder = (reminder: Reminder) => {
    setSelectedReminder(reminder.id);
  };

  const handleCreateReminder = async (reminder: Reminder) => {
    setReminders((reminders) => [...reminders, reminder]);
  };

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
          data={reminders}
          renderItem={({ item }) => (
            <ListItem
              onPress={() => handleOpenReminder(item)}
              title={item.title}
              description={item.description}
            />
          )}
        />
      </Layout>

      <CreateReminderModal
        visible={isCreateModalOpen}
        onDismiss={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateReminder}
      />
    </>
  );
};

export default App;
