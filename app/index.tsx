import {
  Layout,
  Text,
  List,
  ListItem,
  Button,
  Spinner,
} from "@ui-kitten/components";
import { Tabs } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CreateReminderModal } from "../components/CreateReminderModal";
import { Reminder } from "../types";

const App = () => {
  const [reminder, setReminder] = useState<Reminder | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [reminders, setReminders] = useState<Reminder[] | null>(null);

  useEffect(() => {
    AsyncStorage.getItem("reminders").then((reminders) => {
      if (!reminders) return;
      setReminders(JSON.parse(reminders));
    });
  }, []);

  const handleOpenReminder = (reminder: Reminder) => {
    setReminder(reminder);
  };

  const handleCreateReminder = async (reminder: Reminder) => {
    setReminders((reminders) => [...reminders, reminder]);
  };

  const handleDismissReminder = () => {
    setReminder(null);
    setIsCreateModalOpen(false);
  };

  const handleDeleteReminder = (reminder: Reminder) => {
    const oldReminders = [...reminders];
    const newReminders = reminders.filter((r) => r.id !== reminder.id);

    setReminder(null);
    setIsCreateModalOpen(false);
    setReminders(newReminders);

    AsyncStorage.setItem("reminders", JSON.stringify(newReminders)).catch(() =>
      setReminders(oldReminders)
    );
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
        {!reminders && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner />
          </View>
        )}

        {reminders && (
          <>
            {reminders.length === 0 ? (
              <View
                style={{
                  flex: 1,
                  gap: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 16,
                }}
              >
                <Text style={{ textAlign: "center" }}>
                  Nie posiadasz żadnych przypomnień.
                </Text>
                <Button onPress={() => setIsCreateModalOpen(true)} size="small">
                  Dodaj przypomnienie
                </Button>
              </View>
            ) : (
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
            )}
          </>
        )}
      </Layout>

      {(isCreateModalOpen || reminder) && (
        <CreateReminderModal
          reminder={reminder}
          onDelete={handleDeleteReminder}
          onDismiss={handleDismissReminder}
          onSubmit={handleCreateReminder}
        />
      )}
    </>
  );
};

export default App;
