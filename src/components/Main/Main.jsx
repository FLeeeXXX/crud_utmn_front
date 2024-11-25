import { useState } from 'react';
import { isEmpty } from '../../utils/utils';
import News from '../News/News';
import NewsModal from '../NewsModal/NewsModal';

const Main = ({ title, newsList, NewsClickHandler, currentNews, NewsDeleteHandler, NewsCreateHandler, NewsUpdateHandler, loading, updateNewsArray }) => {
    const [viewModal, setViewModal] = useState(false);

    const addNewsHandler = () => {
        setViewModal(true);
    };

    const closeNewsModal = () => {
        setViewModal(false);
    };

    return (
        <main>
            {!isEmpty(currentNews) ? (
                <News NewsClickHandler={NewsClickHandler} currentNews={currentNews} NewsDeleteHandler={NewsDeleteHandler} NewsUpdateHandler={NewsUpdateHandler} updateNewsArray={updateNewsArray}/>
            ) : (
                <section id="news-list">
                    {viewModal && <NewsModal closeNewsModal={closeNewsModal} NewsCreateHandler={NewsCreateHandler} />}
                    <h2>{title}</h2>
                    <button onClick={addNewsHandler}>Добавить новость</button>
                    {!loading ? (
                        newsList.length > 0 ? (
                            newsList.map((news) => (
                                <div key={news.id} className="news-item" onClick={() => NewsClickHandler(news)}>
                                    <h3>{news.title}</h3>
                                    <p className="subtitle">{news.subtitle}</p>
                                </div>
                            ))
                        ) : (
                            <h1 className='emptyNews'>Новостей пока нет :(</h1>
                        )
                    ) : null} {}
                </section>
            )}
        </main>
    );
};

export default Main;
