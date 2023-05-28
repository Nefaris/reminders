import {
  Layout,
  Text,
  List,
  ListItem,
  Button,
  Spinner,
  useTheme,
} from "@ui-kitten/components";
import { Tabs } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CreateReminderModal } from "../components/CreateReminderModal";
import { Reminder } from "../types";

const App = () => {
  const theme = useTheme();
  const [reminder, setReminder] = useState<Reminder | null>(null);
  const [reminders, setReminders] = useState<Reminder[] | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("reminders").then((reminders) => {
      const remindersParsed = reminders ? JSON.parse(reminders) : [];
      setReminders(remindersParsed);
    });
  }, []);

  const handleOpenReminder = (reminder: Reminder) => {
    setReminder(reminder);
  };

  const handleCreateReminder = async (reminder: Reminder) => {
    setReminders((reminders) => [...reminders, reminder]);
    setIsCreateModalOpen(false);
    setReminder(null);
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
          headerStyle: {
            backgroundColor: theme["background-basic-color-2"],
          },
          tabBarStyle: {
            backgroundColor: theme["background-basic-color-2"],
          },
          tabBarIcon: () => <Text>🔔</Text>,
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

      <View
        style={{ flex: 1, backgroundColor: theme["background-basic-color-1"] }}
      >
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
      </View>

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
