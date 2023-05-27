import { Input, Button, Text } from "@ui-kitten/components";
import { useState } from "react";
import { Modal, View } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

type Props = {
  visible: boolean;
  onDismiss: () => void;
};

export const CreateReminderModal = ({ visible, onDismiss }: Props) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

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

  return (
    <Modal
      visible={visible}
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
            alignItems: "center",
            marginBottom: 32,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 24 }}>
            Dodaj przypomnienie
          </Text>
          <Button size="tiny" onPress={onDismiss}>
            Zamknij
          </Button>
        </View>

        <View style={{ gap: 16 }}>
          <Input label="Tytuł *" placeholder="" />
          <Input label="Opis" multiline />

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
            value={date}
            onChange={handleTimeChange}
          />
        )}

        <Button style={{ marginTop: "auto" }}>Zapisz</Button>
      </View>
    </Modal>
  );
};
