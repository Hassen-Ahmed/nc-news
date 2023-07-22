import React, { useContext, useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { NewsDataContext } from "../../context/NewData";
import { getAllArticles } from "../../utils/api";
import Article from "./Article";
import Error from "../error/Error";

const ArticleList = ({ topic, sort_by, order }) => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isWrongId, setIsWrongId] = useState(false);
    const { userList } = useContext(NewsDataContext);

    useEffect(() => {
        getAllArticles(topic, sort_by, order)
            .then((articlesData) => {
                setArticles(articlesData);
                setIsLoading(false);
            })
            .catch(() => setIsWrongId(true));
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
                    <Error msg=" Something Wrong! Try later please." />
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
