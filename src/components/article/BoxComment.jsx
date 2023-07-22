import React from "react";
import { BsFillSendFill } from "react-icons/bs";

function BoxComment({
    userAvatar,
    comment,
    setComment,
    setIsEmpty,
    isEmpty,
    isSendSuccessful,
    handlerSend,
}) {
    return (
        <div className="article__comment-box">
            <div className="comment-box__profile-img" title="user profile">
                <img src={userAvatar} alt="user profile picture" />
            </div>
            <label htmlFor="comment-box">comment:</label>
            <textarea
                name="comment-box"
                id="comment-box"
                cols="30"
                rows={Math.ceil(comment.length / (window.innerWidth > 500 ? 40 : 18)) || 1}
                placeholder="add comment..."
                value={comment}
                onChange={(e) => {
                    setComment(e.target.value);
                    setIsEmpty(false);
                }}
            />
            <div className="comment-box__send" onClick={handlerSend}>
                <BsFillSendFill aria-label="send button" title="send" />
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
    );
}

export default BoxComment;
