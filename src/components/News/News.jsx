import { useState, useEffect } from 'react';
import NewsModal from '../NewsModal/NewsModal';
import {voteNews, getReviews, addReviews, getNewsTypes} from '../../api/api';

const News = ({ NewsClickHandler, currentNews, NewsDeleteHandler, NewsUpdateHandler, updateNewsArray }) => {
    const [news, setNews] = useState(currentNews);
    const [rating, setRating] = useState(1)
    const [viewModal, setViewModal] = useState(false);
    const [reviews, setReviews] = useState([])
    const [newReview, setNewReview] = useState('')
    const [newsTypes, setNewsTypes] = useState([]);

    useEffect(() => {
        const reviews_get = async () => {
            const data = await getReviews(news);
            setReviews(data);
        };
    
        if (news) {
            reviews_get();
        }
    }, [news]);

    useEffect(() => {
        const fetchNewsTypes = async () => {
          const data = await getNewsTypes();
          setNewsTypes(data);
        };
    
        fetchNewsTypes();
    }, [news]);

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
        setRating(1)
        setNews(updated_news)
        updateNewsArray(updated_news)
    }

    const addReviewHandler = async(review_text) => {
        if (!review_text.trim()) return;
        await addReviews(news, review_text);
        setNewReview(''); 
        const updatedReviews = await getReviews(news);
        setReviews(updatedReviews); 
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
            <h2 className='news_title'>{news.title}</h2>
            <h4 className="subtitle">{news.subtitle}</h4>
            <p className="body">{news.body}</p>

            <hr/>
            
            <p className="body_desc">
                <h3>Рейтинг: {news.rating ? news.rating.toFixed(1) : '0.0'}</h3>
                <h3>
                Категория: {
                    newsTypes.length > 0 && news.type
                    ? newsTypes.find((type) => type.id === news.type)?.name || 'Неизвестно'
                    : 'Неизвестно'
                }
                </h3>
            </p>
            <div className="rating">
                <p>Оценка: {rating.toFixed(1)} / 5.0</p>
                <div className="rating-buttons">
                    <button className="green" onClick={increaseRating}>+</button>
                    <button className="red" onClick={decreaseRating}>-</button>
                </div>
            </div>
            <button className="vote-button" onClick={() => NewsVoteRatingHandler(news, rating)}>Проголосовать</button>
            <div className="buttonsBlock">
                <button className="green" onClick={updateNewsHandler}>Обновить информацию</button>
                <button className="red" onClick={() => NewsDeleteHandler(news)}>Удалить новость</button>
            </div>
            <section className="reviews">
                <h3>Отзывы:</h3>
                {reviews.length > 0 ? (
                    <ul>
                        {reviews.map((review) => (
                            <li key={review.id}>{review.body}</li>
                        ))}
                    </ul>
                ) : (
                    <p>Отзывов пока нет. Будьте первым!</p>
                )}
                <textarea
                    placeholder="Добавьте ваш отзыв..."
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                />
                <button onClick={() => addReviewHandler(newReview)}>Добавить отзыв</button>
            </section>
        </section>
    );
};

export default News;
