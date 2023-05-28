export type Reminder = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  isRecurring: boolean;
  repeatUnit: "minutes" | "hours" | "days" | "weeks" | "months" | "years";
  notificationId?: string;
};

export type HistoryReminder = {
  title: string;
  description: string;
  date: string;
};

export type Preferences = {
  theme: "light" | "dark";
};
