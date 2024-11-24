import { useState } from 'react';
import NewsModal from '../NewsModal/NewsModal';

const News = ({ NewsClickHandler, currentNews, NewsDeleteHandler, NewsUpdateHandler }) => {
    const [news, setNews] = useState({
        ...currentNews,
        rating: currentNews.rating ? parseFloat(currentNews.rating) : 0
    });
    const [viewModal, setViewModal] = useState(false);

    const updateNewsHandler = () => {
        setViewModal(true);
    };

    const closeNewsModal = () => {
        setViewModal(false);
    };

    const increaseRating = () => {
        const currentRating = parseFloat(news.rating);
        if (currentRating < 5) {
            setNews({ ...news, rating: currentRating + 1 });
        }
    };

    const decreaseRating = () => {
        const currentRating = parseFloat(news.rating);
        if (currentRating > 1) {
            setNews({ ...news, rating: currentRating - 1 });
        }
    };

    const submitVote = () => {
        console.log(news)
        // NewsUpdateHandler(news);
        // alert(`Рейтинг обновлен`);
    };

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
            <div className="rating">
                <p>Рейтинг: {news.rating ? news.rating.toFixed(1) : '0.0'} / 5.0</p>
                <div className="rating-buttons">
                    <button className="green" onClick={increaseRating}>+</button>
                    <button className="red" onClick={decreaseRating}>-</button>
                </div>
            </div>
            <button className="vote-button" onClick={submitVote}>Проголосовать</button>
            <div className="buttonsBlock">
                <button className="green" onClick={updateNewsHandler}>Обновить информацию</button>
                <button className="red" onClick={() => NewsDeleteHandler(news)}>Удалить</button>
            </div>
        </section>
    );
};

export default News;
