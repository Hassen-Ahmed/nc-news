import React, { useContext, useEffect, useState } from "react";
import Article from "./Article";
import { AiFillHeart } from "react-icons/ai";
import { NewsDataContext } from "../../data/NewData";
import { getAllArticles } from "../../utils/api";

const ArticleList = () => {
    const { userList } = useContext(NewsDataContext);
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAllArticles().then((articlesData) => {
            setArticles(articlesData);
            setIsLoading(false);
        });
    }, []);

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
                loading
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
