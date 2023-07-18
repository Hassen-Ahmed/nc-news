import React, { useContext } from "react";
import Article from "./Article";
import { NewsDataContext } from "../../data/NewData";

const ArticleList = () => {
    const { articles, userList } = useContext(NewsDataContext);

    return (
        <div className="article-list">
            {articles.map((article) => {
                return <Article key={article.article_id} article={article} userList={userList} />;
            })}
        </div>
    );
};

export default ArticleList;
