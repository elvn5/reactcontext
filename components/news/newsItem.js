import * as React from 'react';
import moment from "moment";
import cs from 'classnames';
import { useRouter } from "next/router";

import FailedLoadImg from '../../public/icons/noproduct.svg'
import styles from '../../styles/news/newsItem.module.scss'


const NewsItem = ({ item, fullWidth = false }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/news/${item._id}`);
  };
  const imageBlockClasses = React.useCallback(() => cs({
    [styles.image]: true,
    [styles.errorImage]: !item.image,
  }));

  return (
    <div
      className={fullWidth ? styles.fullWidth : styles.item}
      onClick={handleClick}
    >
      <div className={imageBlockClasses()}>
        <img
          src={item.image || FailedLoadImg.src}
          alt="news"
        />
      </div>
      <div className={styles.title}>
        <h3>{item.title}</h3>
        <span>{moment(item?.date).format('DD.MM.YYYY')}</span>
      </div>
    </div>
  );
};

export default NewsItem;
