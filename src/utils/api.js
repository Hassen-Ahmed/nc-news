import axios from "axios";

const ncNewApi = axios.create({
    baseURL: "https://news-api-d5x1.onrender.com/api",
});

export const getAllArticles = (limit, p) => {
    return ncNewApi.get(`/articles`, { params: { limit, p } }).then(({ data: { articles } }) => {
        return articles;
    });
};

export const getAllUsers = () => {
    return ncNewApi.get("/users").then(({ data: { users } }) => {
        return users;
    });
};

export const getArticleById = (article_id) => {
    return ncNewApi.get(`/articles/${article_id}`).then(({ data: { articles } }) => {
        return articles;
    });
};

export const getCommentsByArticleId = (article_id) => {
    return ncNewApi.get(`/articles/${article_id}/comments`).then(({ data: { comments } }) => {
        return comments;
    });
};
