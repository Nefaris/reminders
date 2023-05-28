import AsyncStorage from "@react-native-async-storage/async-storage";
import { HistoryReminder } from "../types";

export const getRemindersHistory = async () => {
  const storageItem = await AsyncStorage.getItem("reminders_history");
  const historyReminders = storageItem ? JSON.parse(storageItem) : [];
  return historyReminders as HistoryReminder[];
};

export const addReminderToHistory = async (reminder: HistoryReminder) => {
  const historyReminders = await getRemindersHistory();
  await AsyncStorage.setItem(
    "reminders_history",
    JSON.stringify([...historyReminders, reminder])
  );
};

export const clearRemindersHistory = async () => {
  await AsyncStorage.removeItem("reminders_history");
};
