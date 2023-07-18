import React, { useContext, useEffect, useState } from "react";
import { NewsDataContext } from "../../data/NewData";
import { BiSolidLike } from "react-icons/bi";

const ArticleComments = () => {
    const [userAvatar, setUserAvatar] = useState("");
    const [isMore, setIsMore] = useState(false);
    const { activeArticle, userList } = useContext(NewsDataContext);

    useEffect(() => {
        const response = userList.filter((user) => user.username === activeArticle.author);
        const avatar = response[0].avatar_url;
        setUserAvatar(avatar);
    }, []);

    const date = new Date(activeArticle.created_at);

    function setIsMoreHandler() {
        setIsMore((currenIsMore) => {
            return currenIsMore ? false : true;
        });
    }

    return (
        <>
            {activeArticle ? (
                <section className="article-comments">
                    <div className="article__profile--top">
                        <div className="article__profile--pic">
                            <img
                                src={userAvatar}
                                alt={`profile picture of ${activeArticle.author}`}
                            />
                        </div>

                        <div>
                            <h2>{activeArticle.author}</h2>
                            <p className="article__profile--date">
                                {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
                            </p>
                        </div>
                    </div>
                    <p className="article__profile--title">{activeArticle.title}</p>
                    <div className="article__profile--body-container">
                        <p className="article__profile--body">
                            {activeArticle.body.length < 100 || isMore
                                ? activeArticle.body
                                : activeArticle.body.slice(0, 100) + "  ..."}
                        </p>
                        {!activeArticle.body.length < 100 ? (
                            <button onClick={setIsMoreHandler}>
                                show {isMore ? "less" : "more"}
                            </button>
                        ) : null}
                    </div>

                    <div className="article__img--container">
                        <img src={activeArticle.article_img_url} alt={activeArticle.title} />
                    </div>
                    <div className="article__profile--bottom">
                        <div className="article__profile--bottom-1">
                            <p>{activeArticle.votes}</p>
                            <BiSolidLike className="article__like-btn" />
                        </div>
                        <p>{activeArticle.comments_count} comments</p>
                    </div>
                </section>
            ) : (
                <p>Loading</p>
            )}
            ;
        </>
    );
};

export default ArticleComments;
