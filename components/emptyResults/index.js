import * as React from "react";
import Image from "next/image";

import LoupeImg from "../../public/icons/loupe.svg";
import styles from "../../styles/searchResult/searchResult.module.scss";


const NoResult = ({ setModal }) => {
  return (
    <div className={styles.loupeWrapper}>
      <div>
        <Image src={LoupeImg} alt="loupe" />
        <span>Результатов не найдено</span>
        <p>
          Не нашли того, что искали?
          Оставьте нам заявку, и мы привезем нужный товар
        </p>
        <button onClick={() => setModal(true)}>
          Оставить заявку
        </button>
      </div>
    </div>
  );
};

export default NoResult;