import * as React from 'react';
import Link from "next/link";
import moment from "moment";

import MainLayout from "../../layouts/MainLayout";
import NewsItem from "../../components/news/newsItem";
import NewsLoader from "../../components/loader/NewsLoader";
import VkIcon from "../../public/icons/vk.svg";
import FaceBookIcon from "../../public/icons/facebook.svg";
import OkIcon from "../../public/icons/ok.svg";
import InstagramIcon from "../../public/icons/instagram.svg";
import WhatsappIcon from "../../public/icons/whatsapp-gray.svg";
import VkWhite from "../../public/icons/vk-white.svg";
import FaceBookWhite from "../../public/icons/facebook-white.svg";
import OkWhite from "../../public/icons/ok-white.svg";
import InstagramWhite from "../../public/icons/inst-white.svg";
import WhatsappWhite from "../../public/icons/whatApp-white.svg";
import NotFoundIcon from '../../public/icons/noproduct.svg';
import styles from '../../styles/news/newsDetailPage.module.scss';
import { connectContext } from "../../store";
import { getNews, getNewsById } from "../../store/info/actions";
import { changeImageSrc, SOCIALS } from "../../utils";
import ShareButtons from "../../components/share";


const NewsDetail = ({dispatch, news, loading}) => {
  const [selectedNews, setSelectedNews] = React.useState({});

  React.useEffect(async () => {

    getNews(dispatch, { limit: 4 });

    const id = window.location.pathname.split('/')[window.location.pathname.split('/').length];
    const res = await getNewsById(dispatch, id);
    setSelectedNews(res.data || {});
  }, []);

  return (
    <MainLayout>
      <div className={styles.wrapper}>
        <div className="container">
          <div className="breadcrumb">
            <Link href="/"><a>Главная</a></Link> / Новость
          </div>

          <div className={styles.content}>

            <div className={styles.newsData}>
              <div className={styles.newsImg}>
                <img
                  src={selectedNews?.img || NotFoundIcon.src}
                  alt="news"
                />
              </div>
              <span className={styles.date}>
                      {selectedNews?.date ? moment(selectedNews.date).format('DD.MM.YYYY') : null}
              </span>
              <h3>{selectedNews?.title}</h3>
              <p>{selectedNews?.body}</p>

              <div className={styles.share}>
                <span>Поделиться</span>
                <ShareButtons />
              </div>
            </div>

            <div className={styles.otherNews}>
              {loading ? [...Array(4).keys()].map(i => <NewsLoader width={100} key={i}/>) : null}
              {news.length ? news?.map(item => (
                <NewsItem key={item._id} item={item} fullWidth={true}/>
              )) : null}
              <Link href="/news"><a>Все новости</a></Link>
            </div>

          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default connectContext(NewsDetail, ({ info: { news } }) => ({
  news: news.data || [],
  loading: news.loading,
}));
