import React, { useContext, useState } from "react";
import "./comment.css";
import { NewsDataContext } from "../../data/NewData";
import { BiSolidLike } from "react-icons/bi";

function Comment({ comment }) {
    const { userList } = useContext(NewsDataContext);
    const [userAvatar, setUserAvatar] = useState(
        userList.filter((user) => user.username === comment.author)[0].avatar_url
    );
    const [isMore, setIsMore] = useState(false);

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
                    <div className="comment__profile--pic">
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
                <div className="comment__profile--bottom-1">
                    <p>{comment.votes}</p>
                    <BiSolidLike className="comment__like-btn" />
                </div>
            </div>
        </section>
    );
}

export default Comment;
