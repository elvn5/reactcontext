import Image from "next/image";

import ArrowIcon from '../../public/icons/arrow-next.svg';
import styles from '../../styles/pagination/pagination.module.scss';


const Pagination = ({ currentPage, changePage, totalPages }) => {
  const changePageHandler = (minus = false) => {
    if (minus && currentPage >= 1) {
      changePage(currentPage - 1);
    } else if (!minus && currentPage < totalPages) {
      changePage(currentPage + 1);
    }
  };

  return (
    <div className={styles.wrapper}>
      <span className={styles.greySpan}>Страница</span>
      <span className={styles.pageIndex}>{currentPage + 1}</span>
      <span className={styles.greySpan}>из {totalPages}</span>
      <button onClick={() => changePageHandler(true)}>
        <Image src={ArrowIcon} alt="arrow" />
      </button>
      <button onClick={() => changePageHandler(false)}>
        <Image src={ArrowIcon} alt="arrow" />
      </button>
    </div>
  );
}

export default Pagination;
