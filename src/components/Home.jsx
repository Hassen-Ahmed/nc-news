import { useSearchParams } from "react-router-dom";
import CreateTopicButton from "./CreateTopicButton";
import ArticleList from "./article/ArticleList";

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const params = Object.fromEntries([...searchParams]);

    return (
        <div>
            <CreateTopicButton />
            <ArticleList topic={params.topic} />
        </div>
    );
};

export default Home;
