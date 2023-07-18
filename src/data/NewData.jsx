import { createContext, useEffect, useState } from "react";
import { getAllArticles, getAllUsers } from "../utils/api";

export const NewsDataContext = createContext();

export const NewsDataProvider = ({ children }) => {
    const [articles, setArticles] = useState([]);
    const [user, setUser] = useState("tickle122");
    const [userList, setUserList] = useState([]);

    const [articleForComment, setArticleForComment] = useState({});

    useEffect(() => {
        getAllArticles().then((articlesData) => setArticles(articlesData));
    }, []);

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
            value={{ articles, setArticles, userList, articleForComment, setArticleForComment }}
        >
            {children}
        </NewsDataContext.Provider>
    );
};
