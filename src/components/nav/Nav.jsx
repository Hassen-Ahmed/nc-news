import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ImHome } from "react-icons/im";
import { CgMenuRight } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
import { NewsDataContext } from "../../data/NewData";
import { getAllTopics } from "../../utils/api";

const Nav = () => {
    const [currentUserAvatar, setCurrentUserAvatar] = useState();
    const [isVisible, setIsVisible] = useState(false);
    const [topics, setTopics] = useState([]);
    const { user, userList } = useContext(NewsDataContext);

    useEffect(() => {
        getAllTopics().then((topicsData) => {
            const topicsSlug = topicsData.map((topic) => topic.slug);
            setTopics(topicsSlug);
        });
    }, []);

    useEffect(() => {
        if (userList.length) {
            const avatarUrl = userList.filter((userData) => userData.username === user)[0]
                .avatar_url;
            setCurrentUserAvatar(avatarUrl);
        }
    }, [userList]);

    function handlerDropdown() {
        setIsVisible((currenIsVisible) => {
            return currenIsVisible ? false : true;
        });
    }

    return (
        <div className="nav">
            <h1>Nc-News</h1>
            <Link to="/">
                <ImHome className="nav__link" />
            </Link>

            <div>
                <CgMenuRight className="nav__link" onClick={handlerDropdown} />
                {isVisible ? (
                    <div className="topics-drop-down">
                        <ul>
                            <p>Sort by</p>
                            {["date", "comment_count", "votes"].map((elm) => {
                                return (
                                    <li key={elm} onClick={handlerDropdown}>
                                        {elm}
                                    </li>
                                );
                            })}
                        </ul>
                        <ul>
                            <p>Order</p>
                            <li>ascending</li>
                            <li>descending</li>
                        </ul>

                        <p>Topics: </p>
                        <ul>
                            <Link to="/articles" onClick={handlerDropdown}>
                                <li>- all -</li>
                            </Link>

                            {topics.map((topic) => {
                                return (
                                    <Link
                                        key={topic}
                                        to={`/articles?topic=${topic}`}
                                        onClick={handlerDropdown}
                                    >
                                        <li value={topic}>- {topic} -</li>
                                    </Link>
                                );
                            })}
                        </ul>
                    </div>
                ) : null}
            </div>

            <Link to="/profile">
                {currentUserAvatar ? (
                    <div className="nav__link--profile">
                        <img src={currentUserAvatar} alt="current user profile." />
                    </div>
                ) : (
                    <FaUserCircle className="nav__link" />
                )}
            </Link>
        </div>
    );
};

export default Nav;
