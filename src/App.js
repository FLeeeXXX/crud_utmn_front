import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import {getNews, deleteNews, createNews} from './api/api';
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

  const NewsDeleteHandler = async (inp_news) => {
    await deleteNews(inp_news.id)
    setNewsArray((prevNewsArray) => 
      prevNewsArray.filter((item) => item.id !== inp_news.id)
    );
    setNews({})
  }

  const NewsCreateHandler = async (title, subtitle, body) => {
    const newsInfo = {
      'title': title,
      'subtitle': subtitle,
      'body': body
    }
    const createdNews = await createNews(newsInfo);    
    setNewsArray((prevNewsArray) => [...prevNewsArray, createdNews]);
  }

  return (
    <>
      <Header title={"Новостной портал"}/>
      <Main 
        title={"Новости"} 
        newsList={newsArray} 
        NewsClickHandler={NewsClickHandler} 
        currentNews={news} 
        NewsDeleteHandler={NewsDeleteHandler} 
        NewsCreateHandler={NewsCreateHandler}
      />
    </>
  );
}

export default App;
