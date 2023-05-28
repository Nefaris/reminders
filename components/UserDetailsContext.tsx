import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Preferences } from "../types";

const UserDetailsContext = createContext({});

const UserDetailsProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState<Preferences | null>(null);

  // useEffect(() => {
  //   const getUserDetails = async () => {
  //     const userDetails = await AsyncStorage.getItem("preferences");
  //     setUserDetails(JSON.parse(userDetails));
  //   };

  //   getUserDetails();
  // }, []);

  return (
    <UserDetailsContext.Provider value={{}}>
      {children}
    </UserDetailsContext.Provider>
  );
};
