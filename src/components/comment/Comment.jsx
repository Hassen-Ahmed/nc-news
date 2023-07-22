import React, { useContext, useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { NewsDataContext } from "../../context/NewData";

function Comment({ comment, handleDeleteComment }) {
    const { user, userList } = useContext(NewsDataContext);
    const [userAvatar, setUserAvatar] = useState(
        userList.filter((user) => user.username === comment.author)[0].avatar_url
    );
    const [isMore, setIsMore] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const date = new Date(comment?.created_at);

    function setIsMoreHandler() {
        setIsMore((currenIsMore) => {
            return currenIsMore ? false : true;
        });
    }

    return (
        <section className="comment">
            <div className="comment__profile--top">
                <div className="comment__profile--top-1">
                    <div className="comment__profile--pic" title="user profile">
                        <img src={userAvatar} alt={`profile picture of ${comment.author}`} />
                    </div>
                    <h2>{comment.author}</h2>
                </div>
                <div>
                    <p className="comment__profile--date">
                        {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
                    </p>
                </div>
            </div>
            <div className="comment__profile--body-container">
                <p className="comment__profile--body">
                    {comment.body.length < 150 || isMore
                        ? comment.body
                        : comment.body.slice(0, 150) + "  ..."}
                </p>
                {comment.body.length > 150 ? (
                    <button onClick={setIsMoreHandler}>show {isMore ? "less" : "more"}</button>
                ) : null}
            </div>

            <div className="comment__profile--bottom">
                {comment.author === user ? (
                    <div>
                        {isError ? <p className="comment__Error">Something went Wrong!</p> : null}

                        {!isDeleted ? (
                            <div
                                className="comment__like-btn--delete"
                                title="delete"
                                onClick={() => {
                                    setIsDeleted(true);
                                    handleDeleteComment(comment.comment_id).catch(() => {
                                        setIsError(true);
                                        setIsDeleted(false);
                                    });
                                }}
                            >
                                <MdDeleteForever aria-label="delete button" />
                            </div>
                        ) : null}
                    </div>
                ) : (
                    <span></span>
                )}
                <div className="comment__profile--bottom-1" title="like">
                    <p>{comment.votes}</p>
                    <div className="comment__like-btn">
                        <BiSolidLike aria-label="like button for comment" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Comment;
