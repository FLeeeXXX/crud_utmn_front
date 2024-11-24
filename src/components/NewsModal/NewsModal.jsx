import React, { useState } from 'react';

const NewsModal = ({ newsInfo = null, closeNewsModal, NewsCreateHandler, NewsUpdateHandler, setUpdatedNewsInfo, newsTypes }) => {
    const [title, setTitle] = useState(newsInfo ? newsInfo.title : '');
    const [subtitle, setSubtitle] = useState(newsInfo ? newsInfo.subtitle : '');
    const [body, setBody] = useState(newsInfo ? newsInfo.body : '');
    const [newsType, setNewsType] = useState(newsInfo ? newsInfo.newsType : '');

    const handleClear = () => {
        setTitle('');
        setSubtitle('');
        setBody('');
        closeNewsModal();
    }

    const NewsHandler = () => {
        if (title && subtitle && body) {
            if (newsInfo){
                const updatedNews = {
                    'id': newsInfo.id,
                    'title': title,
                    'subtitle': subtitle,
                    'body': body
                }
                setUpdatedNewsInfo(updatedNews);
                NewsUpdateHandler(updatedNews);
            }else{
                const createdNews = {
                    'title': title,
                    'subtitle': subtitle,
                    'body': body
                }
                NewsCreateHandler(createdNews);
            }
            handleClear()
        } else {
            alert("Пожалуйста, заполните все поля.");
        }
    };

    return (
        <div id="add-news-popup" className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeNewsModal}>&times;</span>
                <h2>{newsInfo ? 'Обновить новость' : 'Добавить новость'}</h2>
                <select 
                    value={newsType} 
                    onChange={(e) => setNewsType(e.target.value)} 
                    required
                >
                    <option value="" disabled>Выберите тип новости</option>
                    {/* {newsTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.name}
                        </option>
                    ))} */}
                </select>
                <input
                    type="text"
                    id="news-title"
                    placeholder="Заголовок новости"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <input
                    type="text"
                    id="news-subtitle"
                    placeholder="Подзаголовок"
                    required
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)} 
                />
                <textarea
                    id="news-body"
                    placeholder="Текст новости"
                    required
                    value={body} 
                    onChange={(e) => setBody(e.target.value)} 
                />
                <button onClick={NewsHandler}>{newsInfo ? 'Обновить' : 'Добавить'}</button>
            </div>
        </div>
    );
};

export default NewsModal;
