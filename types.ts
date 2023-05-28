export type Reminder = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  isRecurring: boolean;
  repeatUnit: "minutes" | "hours" | "days" | "weeks" | "months" | "years";
};

export type Preferences = {
  theme: "light" | "dark";
};
