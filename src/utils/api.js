import axios from "axios";

const ncNewApi = axios.create({
    baseURL: "https://news-api-d5x1.onrender.com/api",
});

export const getAllArticles = () => {
    return ncNewApi.get("/articles").then(({ data: { articles } }) => {
        return articles;
    });
};
export const getAllUsers = () => {
    return ncNewApi.get("/users").then(({ data: { users } }) => {
        return users;
    });
};
