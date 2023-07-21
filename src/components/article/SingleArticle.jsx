import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { BsFillSendFill } from "react-icons/bs";
import { getArticleById, patchArticleById, postCommentById } from "../../utils/api";
import { NewsDataContext } from "../../data/NewData";
import CommentList from "./CommentList";
import Error from "../Error";

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

    const { user, userList } = useContext(NewsDataContext);
    const [userAvatar, setUserAvatar] = useState("");

    const { article_id } = useParams();

    useEffect(() => {
        getArticleById(article_id)
            .then((article) => {
                setSingleArticle(article);
            })
            .catch(() => {
                setIsWrongId(true);
            });
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
    function handlerVoteLike(vote) {
        setNewVote((currenNewVote) => {
            return currenNewVote + vote;
        });

        patchArticleById(article_id, vote).catch((err) => {
            setNewVote((currenNewVote) => {
                return currenNewVote - 1;
            });
            setIsError(true);
        });
    }
    function handlerSend() {
        if (comment.trim().length) {
            postCommentById(
                comment,
                article_id,
                user,
                singleArticle.votes,
                singleArticle.created_at
            )
                .then(() => {
                    setIsSent((currentIsSent) => {
                        return currentIsSent ? false : true;
                    });
                    setComment("");
                })
                .catch(() => {
                    setIsSendSuccessful(true);
                });
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
                    <Error msg="  Article not Exist!" />
                )
            ) : (
                <section className="article-single">
                    <div className="article-single--only">
                        <div className="article__profile--top">
                            <div className="article__profile--pic">
                                <img
                                    src={authorAvatar}
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
                                <p>{+singleArticle.votes + newVote}</p>
                                {newVote === 0 ? (
                                    <button
                                        aria-label="like this comment"
                                        className="article__vote-btn"
                                    >
                                        <BiSolidLike
                                            className="article__like-btn"
                                            onClick={() => handlerVoteLike(1)}
                                        />
                                    </button>
                                ) : (
                                    <button
                                        aria-label="dislike this comment"
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
                    <div className="article__comment-box">
                        <div className="comment-box__profile-img">
                            <img src={userAvatar} alt="user profile picture" />
                        </div>
                        <textarea
                            name=""
                            id=""
                            cols="30"
                            rows={
                                Math.ceil(comment.length / (window.innerWidth > 500 ? 40 : 18)) || 1
                            }
                            placeholder="add comment..."
                            value={comment}
                            onChange={(e) => {
                                setComment(e.target.value);
                                setIsEmpty(false);
                            }}
                        />
                        <div className="comment-box__send">
                            <BsFillSendFill onClick={handlerSend} />
                        </div>
                        {isEmpty ? (
                            <div className="empty-comment-box">
                                <p>Add some comment.</p>
                            </div>
                        ) : null}

                        {isSendSuccessful ? (
                            <div className="empty-comment-box">
                                <p>Sorry something went Wrong Try later!</p>
                            </div>
                        ) : null}
                    </div>

                    <div className="comment-list--container">
                        <CommentList article_id={article_id} isSent={isSent} />
                    </div>
                </section>
            )}
        </>
    );
};

export default SingleArticle;
