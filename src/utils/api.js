import axios from "axios";

const ncNewApi = axios.create({
    baseURL: "https://news-api-d5x1.onrender.com/api",
});

export const getAllArticles = (topic, sort_by, order, limit, p) => {
    return ncNewApi
        .get(`/articles`, { params: { topic, sort_by, order, limit, p } })
        .then(({ data: { articles } }) => {
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

export const patchArticleById = (article_id, vote) => {
    return ncNewApi.patch(`/articles/${article_id}`, { inc_votes: vote }).then(({ data }) => {
        return data;
    });
};

export const postCommentById = (body, article_id, author, votes, created_at) => {
    return ncNewApi
        .post(`/articles/${article_id}/comments`, {
            body,
            article_id,
            author,
            votes,
            created_at,
        })
        .then(({ data }) => {
            return data;
        });
};

export const getAllTopics = () => {
    return ncNewApi.get(`/topics`).then(({ data: topics }) => {
        return topics.topics;
    });
};
