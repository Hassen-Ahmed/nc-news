import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ImHome } from "react-icons/im";
import { CgMenuRight } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
import { NewsDataContext } from "../../data/NewData";

const Nav = () => {
    const [currentUserAvatar, setCurrentUserAvatar] = useState();
    const { user, userList } = useContext(NewsDataContext);

    useEffect(() => {
        if (userList.length) {
            const avatarUrl = userList.filter((userData) => userData.username === user)[0]
                .avatar_url;
            setCurrentUserAvatar(avatarUrl);
        }
    }, [userList]);

    return (
        <div className="nav">
            <h1>Nc-News</h1>
            <Link to="/">
                <ImHome className="nav__link" />
            </Link>
            <CgMenuRight className="nav__link" />
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
