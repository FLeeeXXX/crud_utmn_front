import { useState } from 'react'
import NewsModal from '../NewsModal/NewsModal'

const News = ({NewsClickHandler, currentNews, NewsDeleteHandler, NewsUpdateHandler}) => {
    const [news, setNews] = useState(currentNews)
    const [viewModal, setViewModal] = useState(false)

    const updateNewsHandler = () =>{
        setViewModal(true)
    }

    const closeNewsModal = () =>{
        setViewModal(false)
    }

    const setUpdatedNewsInfo = (updatedNews) =>{
        setNews(updatedNews)
    }

    return(
        <section id="news-detail">
            {
                viewModal && <NewsModal newsInfo={news} closeNewsModal={closeNewsModal} NewsUpdateHandler={NewsUpdateHandler} setUpdatedNewsInfo={setUpdatedNewsInfo}/>
            }
            <button onClick={() => NewsClickHandler({})}>Назад</button>
            <h2>{news.title}</h2>
            <p className="subtitle">{news.subtitle}</p>
            <p className="body">{news.body}</p>
            <div className="buttonsBlock">
                <button className="green" onClick={() => updateNewsHandler()}>Обновить информацию</button>
                <button className="red" onClick={() => {NewsDeleteHandler(news)}}>Удалить</button>
            </div>
        </section>
    )
}

export default News;