import { createContext, useEffect, useState } from "react";
import { getAllUsers } from "../utils/api";

export const NewsDataContext = createContext();

export const NewsDataProvider = ({ children }) => {
    const [user, setUser] = useState("tickle122");
    const [userList, setUserList] = useState([]);
    const [articleForComment, setArticleForComment] = useState({});

    useEffect(() => {
        getAllUsers().then((users) => {
            setUserList(users);
        });
    }, []);
    useEffect(() => {
        console.log(articleForComment);
    }, [articleForComment]);

    return (
        <NewsDataContext.Provider
            value={{ user, userList, articleForComment, setArticleForComment }}
        >
            {children}
        </NewsDataContext.Provider>
    );
};
