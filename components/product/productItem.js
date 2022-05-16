import * as React from 'react';
import Image from 'next/image';
import clsn from "classnames";
import { useRouter } from "next/router";

import HeartDefault from '../../public/icons/heart_default.svg';
import HeartActive from '../../public/icons/heart_active.svg';
import PlusIcon from '../../public/icons/plus.svg';
import CartIcon from '../../public/icons/add_cart.svg';
import NoProducts from '../../public/icons/noproduct.svg'
import styles from '../../styles/product/productItem.module.scss';
import { connectContext } from '../../store';
import { changeFavorite } from "../../store/user/actions";
import * as actions from '../../store/bucket/actions';


const ProductItem = ({
  inline = false,
  isFav = false,
  item,
  bucket,
  dispatch,
  userId,
  favorites,
  userType,
}) => {
  const [bucketItem, setBucketItem] = React.useState({});
  const router = useRouter();

  const decrementCount = () => actions.decrementItem(dispatch, item._id);
  const incrementCount = () => actions.incrementItem(dispatch, item._id);
  const handleCartAdd = () => actions.addItem(dispatch, { ...item, amount: 1 });

  const itemClassname = React.useCallback(() => clsn({
    [styles.item]: true,
    [styles.favorite]: isFav,
    [styles.inlineItem]: inline
  }), [inline]);

  const goToProduct = () => {
    router.push(`/product/${item._id}`);
  };

  const handleFavoriteChange = () => {
    if (userId.length) {
      changeFavorite(dispatch, userId, item._id, favorites);
    }
  };

  React.useEffect(() => {
    setBucketItem(bucket.find(x => x._id === item._id) || {});
  }, [bucket]);

  return (
    <div className={itemClassname()}>
      <div className={styles.imageBlock} onClick={goToProduct}>
        <img
          src={item.gallery && item.gallery[0]?.x_1C?.url || NoProducts.src}
          alt="medicine"
        />
      </div>
      <div className={styles.productBody}>
        <div className={styles.description} onClick={goToProduct}>
          <span>{item?.name}</span>
        </div>
        <div className={styles.actions}>
          <div className={styles.price}>
            <span className={styles.crossed}>
              {item.sales.status ? item.sales[userType]?.original : null}
            </span>
            <span className={styles.defaultPrice}>{item.price[userType]} с</span>
          </div>
          <div className={styles.favorite} onClick={handleFavoriteChange}>
            <Image
              src={favorites.includes(item._id) ? HeartActive : HeartDefault}
              alt="heart"
            />
            <div className={styles.favoritePopup} onClick={handleFavoriteChange}>
              <div>
                <span>Добавить в изрбанное</span>
              </div>
            </div>
          </div>
          {bucketItem.amount ? (
            <React.Fragment>
              <button onClick={decrementCount}>
                <div className={styles.favoritePopup}>
                  <div>
                    <span>Убавить</span>
                  </div>
                </div>
                <span className={styles.minus} />
              </button>
              <span>{bucketItem.amount}</span>
              <button onClick={incrementCount}>
                <div className={styles.favoritePopup}>
                  <div>
                    <span>Добавить</span>
                  </div>
                </div>
                <Image src={PlusIcon} alt="plus" />
              </button>
            </React.Fragment>
          ) : (
            <div className={styles.cart} onClick={handleCartAdd}>
              <div className={styles.favoritePopup}>
                <div>
                  <span>Добавить в корзину</span>
                </div>
              </div>
              <button>
                <Image src={CartIcon} alt="cart" />
                <span>
                  {item.sales.status ? item.sales[userType]?.original : item.price[userType]} c
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default connectContext(ProductItem, ({ bucket, user: { info } }) => ({
  bucket,
  userId: info.data?._id || '',
  userType: info.data?.account_type || 'noncommercial',
  favorites: info.data?.favorite_medicines || [],
}));
