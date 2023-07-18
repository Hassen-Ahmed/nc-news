import React, { useContext, useEffect, useState } from "react";
import Article from "./Article";
import { NewsDataContext } from "../../data/NewData";
import { getAllArticles } from "../../utils/api";

const ArticleList = () => {
    const { userList } = useContext(NewsDataContext);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        getAllArticles().then((articlesData) => setArticles(articlesData));
    }, []);

    return (
        <div className="article-list">
            {articles.map((article) => {
                return <Article key={article.article_id} article={article} userList={userList} />;
            })}
        </div>
    );
};
export default ArticleList;
