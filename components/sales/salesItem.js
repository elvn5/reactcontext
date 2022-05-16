import * as React from 'react';
import { useRouter } from "next/router";

import NoProduct from '../../public/icons/noproduct.svg'
import styles from "../../styles/sales/salesItem.module.scss";


const SalesItem = ({item}) => {
  const router = useRouter();

  const goToPromotion = () => {
    router.push(`/product/${item._id}`);
  };

  return (
    <div className={styles.salesItem} onClick={goToPromotion}>
      <img src={item.img || NoProduct.src} alt='sale' />
    </div>
  );
};

export default SalesItem;
