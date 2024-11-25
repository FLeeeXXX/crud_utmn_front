import { useState } from 'react';
import NewsModal from '../NewsModal/NewsModal';
import {voteNews} from '../../api/api';

const News = ({ NewsClickHandler, currentNews, NewsDeleteHandler, NewsUpdateHandler, updateNewsArray }) => {
    const [news, setNews] = useState(currentNews);
    const [rating, setRating] = useState(1)
    const [viewModal, setViewModal] = useState(false);

    const updateNewsHandler = () => {
        setViewModal(true);
    };

    const closeNewsModal = () => {
        setViewModal(false);
    };

    const increaseRating = () => {
        const currentRating = parseFloat(rating);
        if (currentRating < 5) {
            setRating(() => rating + 1)
        }
    };

    const decreaseRating = () => {
        const currentRating = parseFloat(rating);
        if (currentRating > 1) {
            setRating(() => rating - 1)
        }
    };

    const NewsVoteRatingHandler = async(updatedNews, current_rating) => {
        updatedNews.rating = current_rating
        const updated_news = await voteNews(updatedNews);
        console.log(updated_news)
        setRating(1)
        setNews(updated_news)
        updateNewsArray(updated_news)
      }

    return (
        <section id="news-detail">
            {viewModal && (
                <NewsModal
                    newsInfo={news}
                    closeNewsModal={closeNewsModal}
                    NewsUpdateHandler={NewsUpdateHandler}
                    setUpdatedNewsInfo={setNews}
                />
            )}
            <button onClick={() => NewsClickHandler({})}>Назад</button>
            <h2>{news.title}</h2>
            <p className="subtitle">{news.subtitle}</p>
            <p className="body">{news.body}</p>
            <p className="body">
                <span>Рейтинг: {news.rating.toFixed(1)}</span>
            </p>
            <div className="rating">
                <p>Рейтинг: {rating.toFixed(1)} / 5.0</p>
                <div className="rating-buttons">
                    <button className="green" onClick={increaseRating}>+</button>
                    <button className="red" onClick={decreaseRating}>-</button>
                </div>
            </div>
            <button className="vote-button" onClick={() => NewsVoteRatingHandler(news, rating)}>Проголосовать</button>
            <div className="buttonsBlock">
                <button className="green" onClick={updateNewsHandler}>Обновить информацию</button>
                <button className="red" onClick={() => NewsDeleteHandler(news)}>Удалить</button>
            </div>
        </section>
    );
};

export default News;
