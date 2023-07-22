import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { NewsDataProvider } from "./context/NewData.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <NewsDataProvider>
            <App />
        </NewsDataProvider>
    </BrowserRouter>
);
