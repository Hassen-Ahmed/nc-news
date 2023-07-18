import React from "react";
import { Link } from "react-router-dom";
import { ImHome } from "react-icons/im";
import { CgMenuRight } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";

const Nav = () => {
    return (
        <div className="nav">
            <h1>Nc-News</h1>
            <Link to="/">
                <ImHome className="nav__link" />
            </Link>
            <CgMenuRight className="nav__link" />
            <Link to="/profile">
                <FaUserCircle className="nav__link" />
            </Link>
        </div>
    );
};

export default Nav;
