import React, { useState, useEffect } from 'react';
import { getNewsTypes } from '../../api/api';

const NewsModal = ({ newsInfo = null, closeNewsModal, NewsCreateHandler, NewsUpdateHandler, setUpdatedNewsInfo }) => {
    const [title, setTitle] = useState(newsInfo ? newsInfo.title : '');
    const [subtitle, setSubtitle] = useState(newsInfo ? newsInfo.subtitle : '');
    const [body, setBody] = useState(newsInfo ? newsInfo.body : '');
    const [newsTypes, setNewsTypes] = useState([]);
    const [newsType, setNewsType] = useState({});

    useEffect(() => {
        const fetchNewsTypes = async () => {
          const data = await getNewsTypes();
          setNewsTypes(data);
        };
    
        fetchNewsTypes();
    }, []);

    useEffect(() => {
        if (newsInfo && newsTypes.length > 0) {
            const selectedType = newsTypes.find((type) => type.id === newsInfo.type);
            setNewsType(selectedType || null);
        }
    }, [newsInfo, newsTypes]);

    const handleClear = () => {
        setTitle('');
        setSubtitle('');
        setBody('');
        setNewsType(null);
        setNewsTypes('');
        closeNewsModal();
    }

    const NewsHandler = () => {
        if (title && subtitle && body && newsType.id) {
            if (newsInfo){
                const updatedNews = {
                    'id': newsInfo.id,
                    'title': title,
                    'subtitle': subtitle,
                    'body': body,
                    'type': newsType.id,
                    'rating': newsInfo.rating
                }
                setUpdatedNewsInfo(updatedNews);
                NewsUpdateHandler(updatedNews);
            }else{
                const createdNews = {
                    'title': title,
                    'subtitle': subtitle,
                    'body': body,
                    'type': newsType.id,
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
                    value={newsType && newsType.id ? newsType.id : ""}
                    onChange={(e) => {
                        const selectedType = newsTypes.find((type) => type.id === e.target.value);
                        setNewsType(selectedType || {});
                    }}
                    required
                >
                    <option value="" disabled>
                        Выберите тип новости
                    </option>
                    {newsTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.name}
                        </option>
                    ))}
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
