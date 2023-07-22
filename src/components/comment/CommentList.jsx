import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import _ from "lodash";
import { deleteCommentById, getCommentsByArticleId } from "../../utils/api";

function CommentList({ article_id, isSent }) {
    const [comments, setComments] = useState([]);
    const [rerender, setRerender] = useState(false);

    useEffect(() => {
        getCommentsByArticleId(article_id).then((comments) => {
            const orderedComments = _.sortBy(comments, "comment_id").reverse();
            setComments(orderedComments);
        });
    }, [isSent, rerender]);

    function handleDeleteComment(comment_id) {
        return deleteCommentById(comment_id).then(() => {
            setRerender((currentRerender) => {
                return currentRerender ? false : true;
            });
        });
    }

    return (
        <section className="comment-list">
            {comments.map((comment) => {
                return (
                    <Comment
                        key={comment.comment_id}
                        comment={comment}
                        handleDeleteComment={handleDeleteComment}
                    />
                );
            })}
        </section>
    );
}

export default CommentList;
