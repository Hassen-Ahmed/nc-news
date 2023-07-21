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

    const { searchParams, setSearchParams } = useContext(NewsDataContext);
    const params = Object.fromEntries([...searchParams]);

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
    function handleUrlSortBy(sort_by) {
        const obj = { sort_by: sort_by };
        if (params.topic) {
            obj.topic = params.topic;
        }
        if (params.order) {
            obj.order = params.order;
        }

        setSearchParams(obj);
    }
    function handleUrlOrder(order) {
        const obj = { order: order };
        if (params.topic) {
            obj.topic = params.topic;
        }
        if (params.sort_by) {
            obj.sort_by = params.sort_by;
        }
        setSearchParams(obj);
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
                            {["created_at", "comments_count", "votes"].map((elm) => {
                                return (
                                    <li
                                        key={elm}
                                        onClick={() => {
                                            handlerDropdown();
                                            handleUrlSortBy(elm);
                                        }}
                                    >
                                        {elm}
                                    </li>
                                );
                            })}
                        </ul>

                        <ul>
                            <p>Order</p>
                            <li
                                onClick={() => {
                                    handlerDropdown();
                                    handleUrlOrder("asc");
                                }}
                            >
                                ascending
                            </li>
                            <li
                                onClick={() => {
                                    handlerDropdown();
                                    handleUrlOrder("desc");
                                }}
                            >
                                descending
                            </li>
                        </ul>

                        <p>Topics: </p>
                        <ul>
                            <li>
                                <Link to="/" onClick={handlerDropdown}>
                                    - all -
                                </Link>
                            </li>

                            {topics.map((topic) => {
                                return (
                                    <li key={topic}>
                                        <Link
                                            to={`/articles?topic=${topic}`}
                                            onClick={handlerDropdown}
                                        >
                                            - {topic} -
                                        </Link>
                                    </li>
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
