import { Input, Button, Text } from "@ui-kitten/components";
import { useState } from "react";
import { Modal, View } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "nanoid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Reminder } from "../types";

type Props = {
  visible: boolean;
  onDismiss: () => void;
  onSubmit: (data: Reminder) => void;
};

const formSchema = z.object({
  title: z.string().min(1, "Pole wymagane"),
  description: z.string(),
  // date: z.date(),
  // time: z.date(),
});

type FormFields = z.infer<typeof formSchema>;

export const CreateReminderModal = ({
  visible,
  onDismiss,
  onSubmit,
}: Props) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const { formState, handleSubmit, reset, setValue, watch } =
    useForm<FormFields>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        title: "",
        description: "",
      },
    });

  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (!date) return;
    setDate(date);
    setIsDatePickerOpen(false);
  };

  const handleTimeChange = (event: DateTimePickerEvent, date?: Date) => {
    if (!date) return;
    setTime(date);
    setIsTimePickerOpen(false);
  };

  const handleDismiss = () => {
    onDismiss();
    reset();
  };

  const submitHandler = async (data: FormFields) => {
    const currentReminders = await AsyncStorage.getItem("reminders");
    const reminders: Reminder[] = currentReminders
      ? JSON.parse(currentReminders)
      : [];

    const reminder: Reminder = {
      id: nanoid(),
      title: data.title,
      description: data.description,
    };

    await AsyncStorage.setItem(
      "reminders",
      JSON.stringify([...reminders, reminder])
    );

    onSubmit(reminder);
  };

  const titleValue = watch("title");
  const descriptionValue = watch("description");

  return (
    <Modal
      visible={visible}
      onDismiss={handleDismiss}
      presentationStyle="pageSheet"
      animationType="slide"
    >
      <View
        style={{
          flex: 1,
          paddingTop: 16,
          paddingBottom: 32,
          paddingHorizontal: 16,
          backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 32,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 24 }}>
            Dodaj przypomnienie
          </Text>
          <Button size="tiny" onPress={handleDismiss}>
            Zamknij
          </Button>
        </View>

        <View style={{ gap: 16 }}>
          <Input
            label="Tytuł"
            caption={formState.errors.title?.message}
            status={formState.errors.title ? "danger" : "basic"}
            value={titleValue}
            onChange={(e) =>
              setValue("title", e.nativeEvent.text, {
                shouldValidate: true,
              })
            }
          />

          <Input
            label="Opis"
            multiline
            caption={formState.errors.description?.message}
            status={formState.errors.description ? "danger" : "basic"}
            value={descriptionValue}
            onChange={(e) =>
              setValue("description", e.nativeEvent.text, {
                shouldValidate: true,
              })
            }
          />

          <Button onPress={() => setIsDatePickerOpen(true)}>
            Wybierz datę
          </Button>

          <Button onPress={() => setIsTimePickerOpen(true)}>
            Wybierz godzinę
          </Button>
        </View>

        {isDatePickerOpen && (
          <DateTimePicker
            mode="date"
            value={date}
            onChange={handleDateChange}
          />
        )}

        {isTimePickerOpen && (
          <DateTimePicker
            mode="time"
            value={time}
            onChange={handleTimeChange}
          />
        )}

        <Button
          onPress={handleSubmit(submitHandler)}
          style={{ marginTop: "auto" }}
        >
          Zapisz
        </Button>
      </View>
    </Modal>
  );
};
