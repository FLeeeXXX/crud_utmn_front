const News = ({NewsClickHandler, currentNews, NewsDeleteHandler}) => {
    return(
        <section id="news-detail">
            <button onClick={() => NewsClickHandler({})}>Назад</button>
            <h2>{currentNews.title}</h2>
            <p className="subtitle">{currentNews.subtitle}</p>
            <p className="body">{currentNews.body}</p>
            <div className="buttonsBlock">
                <button className="green">Обновить информацию</button>
                <button className="red" onClick={() => {NewsDeleteHandler(currentNews)}}>Удалить</button>
            </div>
        </section>
    )
}

export default News;