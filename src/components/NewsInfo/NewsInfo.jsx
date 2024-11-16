import React, { useState } from 'react';

const NewsInfo = ({ closeNewsModal, NewsCreateHandler }) => {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [body, setBody] = useState('');

    const handleAddNews = () => {
        if (title && subtitle && body) {
            NewsCreateHandler(title, subtitle, body);
            setTitle('');
            setSubtitle('');
            setBody('');
            closeNewsModal();
        } else {
            alert("Пожалуйста, заполните все поля.");
        }
    };

    return (
        <div id="add-news-popup" className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeNewsModal}>&times;</span>
                <h2>Добавить новость</h2>
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
                <button onClick={handleAddNews}>Сохранить новость</button>
            </div>
        </div>
    );
};

export default NewsInfo;
