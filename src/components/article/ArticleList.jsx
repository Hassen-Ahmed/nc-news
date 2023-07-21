import React, { useContext, useEffect, useState } from "react";
import Article from "./Article";
import { AiFillHeart } from "react-icons/ai";
import { NewsDataContext } from "../../data/NewData";
import { getAllArticles } from "../../utils/api";
import Error from "../Error";

const ArticleList = ({ topic, sort_by, order }) => {
    const { userList } = useContext(NewsDataContext);
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isWrongId, setIsWrongId] = useState(false);

    useEffect(() => {
        getAllArticles(topic, sort_by, order)
            .then((articlesData) => {
                setArticles(articlesData);
                setIsLoading(false);
            })
            .catch(() => {
                setIsWrongId(true);
            });
    }, [topic, sort_by, order]);

    const loading = (
        <div className="loading-container">
            <p className="loading">
                Loading ...
                <AiFillHeart className="loading__heart" />
            </p>
        </div>
    );

    return (
        <>
            {isLoading ? (
                !isWrongId ? (
                    loading
                ) : (
                    <Error msg=" Wrong query!" />
                )
            ) : (
                <div className="article-list">
                    {articles.map((article) => {
                        return (
                            <Article
                                key={article.article_id}
                                article={article}
                                userList={userList}
                            />
                        );
                    })}
                </div>
            )}
        </>
    );
};
export default ArticleList;
