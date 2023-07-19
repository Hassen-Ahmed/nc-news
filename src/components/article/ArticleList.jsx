import React, { useContext, useEffect, useState } from "react";
import Article from "./Article";
import { NewsDataContext } from "../../data/NewData";
import { getAllArticles } from "../../utils/api";

const ArticleList = () => {
    const { userList } = useContext(NewsDataContext);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        getAllArticles(5, 1).then((articlesData) => setArticles(articlesData));
    }, []);

    if (!articles.length)
        return (
            <div className="loading-container">
                <p className="loading">Loading ...</p>
            </div>
        );

    return (
        <div className="article-list">
            {articles.map((article) => {
                return <Article key={article.article_id} article={article} userList={userList} />;
            })}
        </div>
    );
};
export default ArticleList;
