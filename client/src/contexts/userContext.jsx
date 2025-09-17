import { createContext, useState } from "react";

export const userContext = createContext();
export const updateContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [updateUser, setUpdateUser] = useState(null);

  return (
    <userContext.Provider value={{ user, setUser }}>
      <updateContext.Provider value={{ updateUser, setUpdateUser }}>
        {children}
      </updateContext.Provider>
    </userContext.Provider>
  );
};
