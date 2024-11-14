import {isEmpty} from '../../utils/utils'
import News from '../News/News'

const Main = ({title, newsList, NewsClickHandler, currentNews, NewsDeleteHandler}) =>{

    return(
        <main>
            {!isEmpty(currentNews) ? (
                <News  NewsClickHandler={NewsClickHandler} currentNews={currentNews} NewsDeleteHandler={NewsDeleteHandler}/>
            ) : 
                <section id="news-list">
                    <h2>{title}</h2>
                    <button>Добавить новость</button>
                    {newsList && newsList.length > 0 ? newsList.map((news) => (
                        <div key={news.id} className="news-item" onClick={() => NewsClickHandler(news)}>
                            <h3>{news.title}</h3>
                            <p className="subtitle">{news.subtitle}</p>
                        </div>
                    )) :
                        <h1 className='emptyNews'>Новостей пока нет :)</h1>
                    }
                </section>
            }
        </main>
    )
}

export default Main;