import React, { useEffect, useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import "./article.css";
import { Link } from "react-router-dom";

const Article = ({ article, userList }) => {
    const [userAvatar, setUserAvatar] = useState("");

    useEffect(() => {
        const response = userList.filter((user) => user.username === article.author);

        const avatar = response[0].avatar_url;
        setUserAvatar(avatar);
    }, []);

    const date = new Date(article.created_at);

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

            <Link to={`/article/${article.article_id}`} className="article__link">
                <p className="article__profile--title">{article.title}</p>{" "}
                <div className="article__img--container">
                    <img src={article.article_img_url} alt={article.title} />
                </div>
            </Link>
        </section>
    );
};

export default Article;
