import { Layout, Text } from "@ui-kitten/components";
import { Tabs } from "expo-router";

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

      <Layout style={{ flex: 1, paddingHorizontal: 16 }}>
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
      </Layout>
    </>
  );
};

export default AboutPage;
