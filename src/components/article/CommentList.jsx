import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { getCommentsByArticleId } from "../../utils/api";
import _ from "lodash";

function CommentList({ article_id, isSent }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getCommentsByArticleId(article_id).then((comments) => {
            const orderedComments = _.sortBy(comments, "comment_id").reverse();
            setComments(orderedComments);
        });
    }, [isSent]);

    return (
        <section className="comment-list">
            {comments.map((comment) => {
                return <Comment key={comment.comment_id} comment={comment} />;
            })}
        </section>
    );
}

export default CommentList;
