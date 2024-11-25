import axios from 'axios';

const URL_NEWS = "http://localhost:8000/news/";
const URL_NEWS_RATING = "http://localhost:8000/news/rating/";
const URL_NEWS_TYPES = "http://localhost:8000/news/types/";

export const createNews = async (news) => {
    const payload = {
        title: news.title,
        subtitle: news.subtitle,
        body: news.body,
        type: news.type
    };

    
    const response = await axios.post(`${URL_NEWS}create`, payload);
    return response.data;
};


export const getNews = async (newsId) => {
    const url = newsId ? `${URL_NEWS}get?news_id=${newsId}` : `${URL_NEWS}get`;
    
    const response = await axios.get(url);
    return response.data;
};


export const deleteNews = async (newsId) => {
    const url = `${URL_NEWS}delete?news_id=${newsId}`;
    
    const response = await axios.delete(url);
    return response.data;
};

export const updateNews = async (news) => {
    const payload = {
        id: news.id,
        title: news.title,
        subtitle: news.subtitle,
        body: news.body,
        type: news.type,
        rating: news.rating
    };

    
    const response = await axios.put(`${URL_NEWS}update`, payload);
    return response.data;
};

export const voteNews = async (news) => {
    const payload = {
        id: news.id,
        rating: news.rating
    };

    
    const response = await axios.post(`${URL_NEWS_RATING}add`, payload);
    return response.data;
};

export const getNewsTypes = async () => {
    const url = `${URL_NEWS_TYPES}get`;
    
    const response = await axios.get(url);
    return response.data;
};