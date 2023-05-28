import { Text } from "@ui-kitten/components";
import { Tabs } from "expo-router";
import { ScrollView } from "react-native";

const AboutPage = () => {
  return (
    <>
      <Tabs.Screen
        options={{
          title: "Informacje",
          headerTitle: () => (
            <Text style={{ fontWeight: "bold", fontSize: 24 }}>Informacje</Text>
          ),
        }}
      />

      <ScrollView
        style={{
          flex: 1,
          paddingVertical: 16,
          paddingHorizontal: 16,
          backgroundColor: "#FFF",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>O aplikacji</Text>
        <Text style={{ marginBottom: 16 }}>
          Aplikacja do zarządzania przypomnieniami umożliwia łatwe dodawanie
          przypomnień oraz wysyłanie powiadomień do użytkowników. Dzięki niej
          można skutecznie organizować zadania i terminy, zapewniając kontrolę
          nad harmonogramem i czasem użytkownika.
        </Text>

        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          Autorzy aplikacji
        </Text>
        <Text>Paweł Świąder</Text>
        <Text>Kacper Mędrek</Text>
      </ScrollView>
    </>
  );
};

export default AboutPage;
