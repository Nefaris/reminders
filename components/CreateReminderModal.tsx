import { Input, Button, Text, ButtonGroup } from "@ui-kitten/components";
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
import dayjs from "dayjs";

type Props = {
  onDismiss: () => void;
  onSubmit: (data: Reminder) => void;
  onDelete: (data: Reminder) => void;
  reminder?: Reminder;
};

const formSchema = z.object({
  title: z.string().min(1, "Pole wymagane"),
  description: z.string(),
  date: z.date(),
  time: z.date(),
});

type FormFields = z.infer<typeof formSchema>;

export const CreateReminderModal = ({
  onDismiss,
  onSubmit,
  onDelete,
  reminder,
}: Props) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  const { formState, handleSubmit, setValue, watch } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      date: new Date(),
      time: new Date(),
    },
  });

  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (!date) return;
    setIsDatePickerOpen(false);
    setValue("date", date, { shouldValidate: true });
  };

  const handleTimeChange = (event: DateTimePickerEvent, date?: Date) => {
    if (!date) return;
    setIsTimePickerOpen(false);
    setValue("time", date, { shouldValidate: true });
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

  const isEdit = !!reminder;
  const titleValue = watch("title");
  const descriptionValue = watch("description");
  const dateValue = watch("date");
  const timeValue = watch("time");

  return (
    <Modal
      visible
      onDismiss={onDismiss}
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
            alignItems: "flex-start",
            marginBottom: 32,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 24 }}>
            {isEdit ? "Edytuj przypomnienie" : "Dodaj przypomnienie"}
          </Text>
          <Button size="tiny" onPress={onDismiss}>
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

          <View>
            <Text style={{ fontSize: 12, marginBottom: 4 }}>
              Kliknij w pole, aby wybrać datę i godzinę przypomnienia
            </Text>

            <ButtonGroup>
              <Button
                style={{ flex: 1 }}
                onPress={() => setIsDatePickerOpen(true)}
              >
                {dayjs(dateValue).format("DD.MM.YYYY")}
              </Button>
              <Button
                style={{ flex: 1 }}
                onPress={() => setIsTimePickerOpen(true)}
              >
                {dayjs(timeValue).format("HH:mm")}
              </Button>
            </ButtonGroup>
          </View>
        </View>

        {isDatePickerOpen && (
          <DateTimePicker
            mode="date"
            minimumDate={new Date()}
            value={dateValue}
            onChange={handleDateChange}
          />
        )}

        {isTimePickerOpen && (
          <DateTimePicker
            mode="time"
            is24Hour
            value={timeValue}
            onChange={handleTimeChange}
          />
        )}

        <View style={{ gap: 8, marginTop: "auto" }}>
          {isEdit && (
            <Button
              status="danger"
              onPress={() => onDelete(reminder)}
              style={{ marginTop: "auto" }}
            >
              Usuń
            </Button>
          )}

          <Button onPress={handleSubmit(submitHandler)}>Zapisz</Button>
        </View>
      </View>
    </Modal>
  );
};
