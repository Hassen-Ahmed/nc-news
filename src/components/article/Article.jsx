import React, { useContext, useEffect, useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import "./article.css";
import { Link } from "react-router-dom";
import { NewsDataContext } from "../../data/NewData";

const Article = ({ article, userList }) => {
    const [userAvatar, setUserAvatar] = useState("");
    const { setActiveArticle } = useContext(NewsDataContext);

    useEffect(() => {
        const response = userList.filter((user) => user.username === article.author);

        const avatar = response[0].avatar_url;
        setUserAvatar(avatar);
    }, []);

    const date = new Date(article.created_at);
    function activeArticleHandler() {
        setActiveArticle(article);
    }

    return (
        <section className="article">
            <div className="article__profile--top">
                <div className="article__profile--pic">
                    <img src={userAvatar} alt={`profile picture of ${article.author}`} />
                </div>

                <div>
                    <h2>{article.author}</h2>
                    <p className="article__profile--date">
                        {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
                    </p>
                </div>
            </div>

            <Link to="/article-comments" className="article__link" onClick={activeArticleHandler}>
                <p className="article__profile--title">{article.title}</p>{" "}
            </Link>

            <div className="article__img--container">
                <img src={article.article_img_url} alt={article.title} />
            </div>

            <div className="article__profile--bottom">
                <div className="article__profile--bottom-1">
                    <p>{article.votes}</p>
                    <BiSolidLike className="article__like-btn" />
                </div>

                <Link
                    to="/article-comments"
                    className="article__link"
                    onClick={activeArticleHandler}
                >
                    <p>{article.comments_count} comments</p>{" "}
                </Link>
            </div>
        </section>
    );
};

export default Article;
