import { Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/nav/Nav";
import Home from "./components/Home";
import NewTopic from "./components/NewTopic";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";
import ArticleComments from "./components/article/ArticleComments";

function App() {
    return (
        <main className="app">
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/newtopic" element={<NewTopic />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/article-comments" element={<ArticleComments />} />
            </Routes>
        </main>
    );
}

export default App;
