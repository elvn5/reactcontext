import * as React from 'react';
import Image from 'next/image';

import PlusIcon from '../../public/icons/plus.svg';
import HeartDefault from '../../public/icons/heart_default.svg';
import HeartActive from '../../public/icons/heart_active.svg';
import NoProduct from '../../public/icons/noproduct.svg';
import TrashIcon from '../../public/icons/trash.svg';
import styles from '../../styles/cart/cart.module.scss';
import * as actions from '../../store/bucket/actions';
import { connectContext } from '../../store';
import { changeFavorite } from "../../store/user/actions";

const CartItem = ({item, dispatch, favorites, userType, userId,}) => {
  const decrementCount = () => actions.decrementItem(dispatch, item._id);
  const incrementCount = () => actions.incrementItem(dispatch, item._id);
  const deleteProduct = () => actions.removeItem(dispatch, item._id);

  const handleFavoriteChange = () => {
    if (userId.length) {
      changeFavorite(dispatch, userId, item._id, favorites);
    }
  };

  return (
    <div className={styles.item}>
      <div className={styles.itemImage}>
        <img src={item.gallery && item.gallery[0]?.x_1C.url || NoProduct.src} />
      </div>
      <div className={styles.itemBody}>
        <h4>{item.name}</h4>
        <div>
          <div className={styles.priceItem}>
            <span className={styles.oldPrice}>
              {item.sales[userType]?.status && item.sales[userType].original}
            </span>
            <span>{item.price[userType]} c</span>
          </div>
          <div className={styles.actions}>
            <button className={styles.trash} onClick={deleteProduct}>
              <Image src={TrashIcon} alt="delete" />
            </button>
            <div className={styles.favorite} onClick={handleFavoriteChange}>
              <Image src={favorites.includes(item._id) ? HeartActive : HeartDefault} alt="heart" />
            </div>
            <button onClick={decrementCount}>
              <span className={styles.minus} />
            </button>
            <span className={styles.amount}>{item.amount}</span>
            <button onClick={incrementCount}>
              <Image src={PlusIcon} alt="plus" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connectContext(CartItem, ({user: { info }}) => ({
  favorites: info.data?.favorite_medicines || [],
  userType: info.data?.account_type || 'noncommercial',
  userId: info.data?._id || '',
}));
