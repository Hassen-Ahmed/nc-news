import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { getCommentsByArticleId } from "../../utils/api";

function CommentList({ article_id }) {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        getCommentsByArticleId(article_id).then((comments) => {
            setComments(comments);
        });
    }, []);

    return (
        <section className="comment-list">
            {comments.map((comment) => {
                return <Comment key={comment.comment_id} comment={comment} />;
            })}
        </section>
    );
}

export default CommentList;
