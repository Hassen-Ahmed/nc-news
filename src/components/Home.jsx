import CreateTopicButton from "./CreateTopicButton";
import ArticleList from "./article/ArticleList";
import { useContext } from "react";
import { NewsDataContext } from "../context/NewData";

const Home = () => {
    const { searchParams } = useContext(NewsDataContext);
    const params = Object.fromEntries([...searchParams]);

    return (
        <div>
            <CreateTopicButton />
            <ArticleList topic={params.topic} sort_by={params?.sort_by} order={params?.order} />
        </div>
    );
};

export default Home;
