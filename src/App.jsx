import { Routes, Route } from "react-router-dom";
// import "./styles/app.scss";

import Nav from "./components/nav/Nav";
import Home from "./components/Home";
import NewTopic from "./components/NewTopic";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";
import SingleArticle from "./components/article/SingleArticle";
import Error from "./components/error/Error";

function App() {
    return (
        <main className="app">
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/articles" element={<Home />} />
                <Route path="/newtopic" element={<NewTopic />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/articles/:article_id" element={<SingleArticle />} />
                <Route path="*" element={<Error msg="Wrong url" />} />
            </Routes>
        </main>
    );
}

export default App;
