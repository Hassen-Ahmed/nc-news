import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BiSolidLike } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { getArticleById } from "../../utils/api";
import { NewsDataContext } from "../../data/NewData";
import CommentList from "./CommentList";

const SingleArticle = () => {
    const [singleArticle, setSingleArticle] = useState(null);
    const [userAvatar, setUserAvatar] = useState("");
    const [isMore, setIsMore] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
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
            setIsLoading(false);
        }
    }, [singleArticle, article_id]);

    const date = new Date(singleArticle?.created_at);
    const loading = (
        <div className="loading-container">
            <p className="loading">
                Loading ...
                <AiFillHeart className="loading__heart" />
            </p>
        </div>
    );
    function setIsMoreHandler() {
        setIsMore((currenIsMore) => {
            return currenIsMore ? false : true;
        });
    }

    return (
        <>
            {isLoading ? (
                loading
            ) : (
                <section className="article-single">
                    <div className="article-single--only">
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
                                {singleArticle.body.length < 150 || isMore
                                    ? singleArticle.body
                                    : singleArticle.body.slice(0, 150) + "  ..."}
                            </p>
                            {singleArticle.body.length > 150 ? (
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
                            <p>
                                {singleArticle.comment_count > 0
                                    ? `${singleArticle.comment_count} comments`
                                    : "No comments yet."}
                            </p>
                        </div>
                    </div>

                    <div className="comment-list--container">
                        <CommentList article_id={article_id} />
                    </div>
                </section>
            )}
        </>
    );
};

export default SingleArticle;
