import axios from 'axios';

const URL = "http://localhost:8000/news/";

export const createNews = async (news) => {
    const payload = {
        title: news.title,
        subtitle: news.subtitle,
        body: news.body
    };

    
    const response = await axios.post(`${URL}create`, payload);
    return response.data;
};


export const getNews = async (newsId) => {
    const url = newsId ? `${URL}get?news_id=${newsId}` : `${URL}get`;
    
    const response = await axios.get(url);
    return response.data;
};


export const deleteNews = async (newsId) => {
    const url = `${URL}delete?news_id=${newsId}`;
    
    const response = await axios.delete(url);
    return response.data;
};

export const updateNews = async (news) => {
    const payload = {
        id: news.id,
        title: news.title,
        subtitle: news.subtitle,
        body: news.body
    };

    
    const response = await axios.put(`${URL}update`, payload);
    return response.data;
};