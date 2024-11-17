import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import { getNews, deleteNews, createNews, updateNews } from './api/api';
import './style.css';

function App() {
  const [newsArray, setNewsArray] = useState([]);
  const [news, setNews] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const data = await getNews();
      setNewsArray(data);
      setLoading(false);
    };

    fetchNews();
  }, []);

  const NewsClickHandler = (inp_news) => {
    setNews(inp_news);
  };

  const NewsDeleteHandler = async (inp_news) => {
    await deleteNews(inp_news.id);
    setNewsArray((prevNewsArray) => 
      prevNewsArray.filter((item) => item.id !== inp_news.id)
    );
    setNews({});
  };

  const NewsCreateHandler = async (createdNews) => {
    await createNews(createdNews);    
    setNewsArray((prevNewsArray) => [...prevNewsArray, createdNews]);
  };

  const NewsUpdateHandler = async (updatedNews) => {
    await updateNews(updatedNews);
    setNewsArray((prevNewsArray) => 
      prevNewsArray.map((item) => 
        item.id === updatedNews.id ? { ...item, ...updatedNews } : item
      )
    );
  };

  return (
    <>
      <Header title={"Новостной портал"} />
      <Main 
        title={"Новости"} 
        newsList={newsArray} 
        NewsClickHandler={NewsClickHandler} 
        currentNews={news} 
        NewsDeleteHandler={NewsDeleteHandler} 
        NewsCreateHandler={NewsCreateHandler}
        NewsUpdateHandler={NewsUpdateHandler}
        loading={loading}
      />
    </>
  );
}

export default App;
