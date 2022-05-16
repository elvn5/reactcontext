import * as React from "react";
import Link from "next/link";

import NewsItem from "../../components/news/newsItem";
import MainLayout from "../../layouts/MainLayout";
import Pagination from "../../components/pagination";
import styles from '../../styles/news/newsPage.module.scss';
import { connectContext } from '../../store';
import { getNews } from '../../store/info/actions';
import NewsLoader from "../../components/loader/NewsLoader";


const News = ({ dispatch, news, loading }) => {
  const [skip, setSkip] = React.useState(0);

  React.useEffect(() => {
    getNews(dispatch, { skip, limit: 14 });
  }, [skip]);

  return (
    <MainLayout>
      <div className={styles.wrapper}>
        <div className="container">
          <div className="breadcrumb">
            <Link href="/"><a>Главная</a></Link> / Новости
          </div>

          <div className={styles.content}>
            <h3>Новости</h3>
            <div className={styles.newsWrapper}>
              {
                loading ?
                  [...Array(14).keys()].map(item => (
                    <div className={styles[`item${item + 1}`]} key={item}>
                      <NewsLoader width={100} />
                    </div>
                  )) : null
              }
              {
                news?.map((item, index) => (
                  <div className={styles[`item${index + 1}`]} key={item._id}>
                    <NewsItem fullWidth={true} item={item}/>
                  </div>
                ))
              }
            </div>
            <Pagination changePage={setSkip} currentPage={skip} totalPages={20} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default connectContext(News, ({ info: { news } }) => ({
  news: news.data || [],
  loading: news.loading,
}));