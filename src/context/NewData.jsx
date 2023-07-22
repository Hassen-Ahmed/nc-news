import { createContext, useEffect, useState } from "react";
import { getAllUsers } from "../utils/api";
import { useSearchParams } from "react-router-dom";

export const NewsDataContext = createContext();

export const NewsDataProvider = ({ children }) => {
    const [user, setUser] = useState("tickle122");
    const [userList, setUserList] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        getAllUsers().then((users) => {
            setUserList(users);
        });
    }, []);

    return (
        <NewsDataContext.Provider value={{ user, userList, searchParams, setSearchParams }}>
            {children}
        </NewsDataContext.Provider>
    );
};
