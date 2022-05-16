import * as React from 'react';
import Image from "next/image";

import styles from '../../styles/product/historyProduct.module.scss';


function HistoryProduct({ product, userType }) {

  return (
    <div className={styles.item}>
      <div className={styles.imageWrapper}>
        <Image
          width="100%"
          height="100%"
          src={product.preview}
          alt="medicine"
        />
      </div>
      <div className={styles.productData}>
        <h3>{product.title}</h3>
        <div className={styles.data}>
          <div className={styles.dataRow}>
            <div>
              <span className={styles.greyText}>Цена:</span>
            </div>
            <div>
              <span className={styles.crossedText}>{product.price[userType]}</span>
              <span className={styles.blackText}>{product.price[userType]} c</span>
            </div>
          </div>
          <div className={styles.dataRow}>
            <div>
              <span className={styles.greyText}>Количество:</span>
            </div>
            <div>
              <span className={styles.blackText}>{product.amount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(HistoryProduct);
