import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";

import { getArticleById, patchArticleById, postCommentById } from "../../utils/api";
import { NewsDataContext } from "../../context/NewData";
import Error from "../error/Error";
import CommentList from "../comment/CommentList";
import BoxComment from "./BoxComment";

const SingleArticle = () => {
    const [singleArticle, setSingleArticle] = useState(null);
    const [authorAvatar, setAuthorAvatar] = useState("");
    const [isMore, setIsMore] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [newVote, setNewVote] = useState(0);
    const [isError, setIsError] = useState(false);
    const [comment, setComment] = useState("");
    const [isSent, setIsSent] = useState(false);
    const [isSendSuccessful, setIsSendSuccessful] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [isWrongId, setIsWrongId] = useState(false);
    const [userAvatar, setUserAvatar] = useState("");
    const { user, userList } = useContext(NewsDataContext);
    const { article_id } = useParams();

    const date = new Date(singleArticle?.created_at);
    const dateStructured = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    const loading = (
        <div className="loading-container">
            <p className="loading">
                Loading ...
                <AiFillHeart className="loading__heart" />
            </p>
        </div>
    );

    useEffect(() => {
        getArticleById(article_id)
            .then((article) => setSingleArticle(article))
            .catch(() => setIsWrongId(true));
    }, []);

    useEffect(() => {
        if (singleArticle && userList.length) {
            const responseAuthorAvatar = userList.filter(
                (user) => user.username === singleArticle.author
            );
            const responseUserAvatar = userList.filter((userData) => userData.username === user);

            const authorAvatarUrl = responseAuthorAvatar[0].avatar_url;
            const userAvatarUrl = responseUserAvatar[0].avatar_url;
            setUserAvatar(userAvatarUrl);

            setAuthorAvatar(authorAvatarUrl);
            setIsLoading(false);
        }
    }, [singleArticle, userList]);

    function setIsMoreHandler() {
        setIsMore((currenIsMore) => (currenIsMore ? false : true));
    }
    function handlerVoteLike(vote) {
        setNewVote((currenNewVote) => currenNewVote + vote);

        patchArticleById(article_id, vote).catch(() => {
            setNewVote((currenNewVote) => currenNewVote - 1);
            setIsError(true);
        });
    }
    function handlerSend() {
        if (comment.trim().length) {
            postCommentById(comment, article_id, user, 0, singleArticle.created_at)
                .then(() => {
                    setIsSent((currentIsSent) => (currentIsSent ? false : true));
                    setComment("");
                })
                .catch(() => setIsSendSuccessful(true));
        }
        if (comment.trim().length) {
            setIsEmpty(false);
        } else {
            setIsEmpty(true);
        }
    }

    return (
        <>
            {isLoading ? (
                !isWrongId ? (
                    loading
                ) : (
                    <Error msg="  Article Does Not Exist!" />
                )
            ) : (
                <section className="article-single">
                    <div className="article-single--only">
                        <div className="article__profile--top">
                            <div className="article__profile--pic" title="user profile">
                                <img
                                    src={authorAvatar}
                                    alt={`profile picture ${singleArticle.author}`}
                                />
                            </div>

                            <div>
                                <h2>{singleArticle.author}</h2>
                                <p className="article__profile--date">{dateStructured}</p>
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
                                <p>{+singleArticle.votes + newVote}</p>
                                {newVote === 0 ? (
                                    <button
                                        aria-label="like this comment"
                                        className="article__vote-btn"
                                    >
                                        <div
                                            className="article__like-btn"
                                            onClick={() => handlerVoteLike(1)}
                                        >
                                            <BiSolidLike
                                                aria-label="like button for article"
                                                title="like"
                                            />
                                        </div>
                                    </button>
                                ) : (
                                    <button
                                        aria-label="dislike this comment"
                                        title="dislike"
                                        className="article__vote-btn"
                                    >
                                        <BiSolidDislike
                                            className="article__like-btn"
                                            onClick={() => handlerVoteLike(-1)}
                                        />
                                    </button>
                                )}
                            </div>
                            <p>
                                {singleArticle.comment_count > 0
                                    ? `${+singleArticle.comment_count} comments`
                                    : "No comments yet."}
                            </p>
                        </div>
                        {isError ? (
                            <p className="wrong__vote">Sorry something went wrong! Try later.</p>
                        ) : null}
                    </div>

                    <BoxComment
                        userAvatar={userAvatar}
                        comment={comment}
                        setComment={setComment}
                        setIsEmpty={setIsEmpty}
                        isEmpty={isEmpty}
                        isSendSuccessful={isSendSuccessful}
                        handlerSend={handlerSend}
                    />

                    <div className="comment-list--container">
                        <CommentList article_id={article_id} isSent={isSent} />
                    </div>
                </section>
            )}
        </>
    );
};

export default SingleArticle;
