import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BiSolidLike } from "react-icons/bi";
import { getArticleById } from "../../utils/api";
import { NewsDataContext } from "../../data/NewData";

const SingleArticle = () => {
    const [singleArticle, setSingleArticle] = useState(null);
    const [userAvatar, setUserAvatar] = useState("");
    const [isMore, setIsMore] = useState(false);
    const { userList } = useContext(NewsDataContext);
    const { article_id } = useParams();

    useEffect(() => {
        getArticleById(article_id).then((article) => {
            setSingleArticle(article);
        });
    }, []);

    useEffect(() => {
        if (singleArticle) {
            const response = userList.filter((user) => user.username === singleArticle.author);
            const avatar = response[0].avatar_url;
            setUserAvatar(avatar);
        }
    }, [singleArticle, article_id]);

    const date = new Date(singleArticle?.created_at);

    function setIsMoreHandler() {
        setIsMore((currenIsMore) => {
            return currenIsMore ? false : true;
        });
    }

    return (
        <>
            {singleArticle ? (
                <section className="article-comments">
                    <div className="article__profile--top">
                        <div className="article__profile--pic">
                            <img
                                src={userAvatar}
                                alt={`profile picture of ${singleArticle.author}`}
                            />
                        </div>

                        <div>
                            <h2>{singleArticle.author}</h2>
                            <p className="article__profile--date">
                                {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
                            </p>
                        </div>
                    </div>
                    <p className="article__profile--title">{singleArticle.title}</p>
                    <div className="article__profile--body-container">
                        <p className="article__profile--body">
                            {singleArticle.body.length < 100 || isMore
                                ? singleArticle.body
                                : singleArticle.body.slice(0, 100) + "  ..."}
                        </p>
                        {!singleArticle.body.length < 100 ? (
                            <button onClick={setIsMoreHandler}>
                                show {isMore ? "less" : "more"}
                            </button>
                        ) : null}
                    </div>

                    <div className="article__img--container">
                        <img src={singleArticle.article_img_url} alt={singleArticle.title} />
                    </div>
                    <div className="article__profile--bottom">
                        <div className="article__profile--bottom-1">
                            <p>{singleArticle.votes}</p>
                            <BiSolidLike className="article__like-btn" />
                        </div>
                        <p>{singleArticle.comments_count} comments</p>
                    </div>
                </section>
            ) : null}
        </>
    );
};

export default SingleArticle;