import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import {getNews, deleteNews} from './api/api';
import './style.css';


function App() {
  const [newsArray, setNewsArray] = useState([]);
  const [news, setNews] = useState({});

  useEffect(() => {
    const fetchNews = async () => {
      const data = await getNews();
      setNewsArray(data);
    };

    fetchNews();
  }, []);

  const NewsClickHandler = (inp_news) =>{
    setNews(inp_news)
  }

  const NewsDeleteHandler = (inp_news) => {
    deleteNews(inp_news.id)
    setNewsArray((prevNewsArray) => 
      prevNewsArray.filter((item) => item.id !== inp_news.id)
    );
    setNews({})
  }

  return (
    <>
      <Header title={"Новостной портал"}/>
      <Main title={"Новости"} newsList={newsArray} NewsClickHandler={NewsClickHandler} currentNews={news} NewsDeleteHandler={NewsDeleteHandler}/>
    </>
  );
}

export default App;
