import * as React from "react";
import Link from "next/link";

import NewsItem from "./newsItem";
import NewsLoader from "../loader/NewsLoader";
import styles from '../../styles/news/newsWrapper.module.scss';
import { connectContext } from '../../store';
import { getNews } from '../../store/info/actions';


const NewsWrapper = ({ dispatch, news, loading }) => {

  React.useEffect(() => {
    getNews(dispatch, { limit: 8 });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <h3 className={styles.heading}>Новости</h3>
        <div className={styles.newsContent}>
          {loading ?
            [...Array(8).keys()].map(item => (
              <NewsLoader key={item}/>
            )): null}
          {news?.map(item => <NewsItem key={item._id} item={item} />)}
        </div>
        <Link href="/news">
          <a className={styles.seeAll}>Все новости</a>
        </Link>
      </div>
    </div>
  );
};

export default connectContext(NewsWrapper, ({ info: { news } }) => ({
  news: news.data || [],
  loading: news.loading,
}));
