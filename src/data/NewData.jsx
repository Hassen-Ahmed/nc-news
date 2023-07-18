import { createContext, useEffect, useState } from "react";
import { getAllUsers } from "../utils/api";

export const NewsDataContext = createContext();

export const NewsDataProvider = ({ children }) => {
    const [user, setUser] = useState("tickle122");
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        getAllUsers().then((users) => {
            setUserList(users);
        });
    }, []);

    return (
        <NewsDataContext.Provider value={{ user, userList }}>{children}</NewsDataContext.Provider>
    );
};
