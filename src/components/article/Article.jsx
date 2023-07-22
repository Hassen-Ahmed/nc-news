import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Article = ({ article, userList }) => {
    const [userAvatar, setUserAvatar] = useState("");
    const date = new Date(article.created_at);
    const dateStructured = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

    useEffect(() => {
        const response = userList.filter((user) => user.username === article.author);
        const avatar = response[0].avatar_url;
        setUserAvatar(avatar);
    }, []);

    return (
        <section className="article">
            <div className="article__profile--top">
                <div className="article__profile--pic">
                    <img src={userAvatar} alt={`profile picture of ${article.author}`} />
                </div>
                <div>
                    <h2>{article.author}</h2>
                    <p className="article__profile--date">{dateStructured}</p>
                </div>
            </div>

            <Link
                aria-label="articles link"
                to={`/articles/${article.article_id}`}
                className="article__link"
            >
                <p className="article__profile--title">{article.title}</p>
                <div className="article__img--container">
                    <img
                        src={article.article_img_url}
                        alt={`profile picture of ${article.author}`}
                    />
                </div>
            </Link>
        </section>
    );
};

export default Article;
