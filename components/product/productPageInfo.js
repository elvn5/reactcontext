import * as React from 'react';
import Image from "next/image";

import HeartActive from '../../public/icons/heart_active.svg';
import HeartDefaultIcon from '../../public/icons/heart_default.svg';
import PlusIcon from '../../public/icons/plus.svg';
import CartIcon from '../../public/icons/add_cart.svg';
import CartDisabledIcon from '../../public/icons/cart-disabled.svg';
import styles from '../../styles/product/productPage.module.scss';
import ShareButtons from "../share";
import * as actions from '../../store/bucket/actions';
import { connectContext } from '../../store';
import { changeFavorite } from "../../store/user/actions";


const ProductPageInfo = ({ dispatch, bucket, product, favorite, userId, userType }) => {
  const [bucketItem, setBucketItem] = React.useState({});

  const decrementCount = () => actions.decrementItem(dispatch, product._id);
  const incrementCount = () => actions.incrementItem(dispatch, product._id);
  const handleCartAdd = () => actions.addItem(dispatch, {
    ...product,
    amount: 1,
  });

  const handleFavoriteChange = () => {
    changeFavorite(dispatch, userId, product._id, favorite);
  };

  React.useEffect(() => {
    actions.getItems(dispatch);
  }, []);

  React.useEffect(() => {
    setBucketItem(bucket.find(i => i._id === product._id) || {});
  }, [bucket, product]);

  return (
    <div className={styles.productRight}>
      <h3>{product.name}</h3>
      <span className={styles.indication}>Показания</span>
      <p className={styles.indicationText}>{product.description}</p>
      {product.description && (
        <React.Fragment>
          <p className={styles.prescription}>
            Ask where to find this info
          </p>
          <span className={styles.recipe}>По рецетпу врача check this</span>
        </React.Fragment>
      )}
      <div className={styles.priceBlock}>
        <span className={styles.oldPrice}>
          {product.sales?.status ? product.sales.noncommercial.original : null}
        </span>
      </div>
      <div className={styles.productActions}>
        <div className={styles.addFavorite} onClick={handleFavoriteChange} >
          <Image src={favorite.includes(product._id) ? HeartActive : HeartDefaultIcon} alt="heart" />
        </div>
        {bucketItem.amount ? (
          <div className={styles.counter}>
            <button className={styles.minusBtn} onClick={decrementCount}>
              <span className={styles.minusSpan} />
            </button>

            <span>{bucketItem.amount}</span>

            <button className={styles.plusBtn} onClick={incrementCount}>
              <Image src={PlusIcon} alt="plus" />
            </button>
          </div>
        ) : (
          <button
            className={styles.addCart}
            onClick={handleCartAdd}
          >
            <Image
              src={product.available ? CartIcon : CartDisabledIcon}
              alt="cart"
            />
            <span>{product.price && product.price[userType]} с</span>
          </button>
        )}
      </div>

      <ShareButtons />
    </div>
  );
};

export default connectContext(ProductPageInfo, (
  {
    bucket = [],
    user: { info : { data } },
  }) => ({
  bucket,
  userId: data?._id || '',
  userType: data?.account_type || 'noncommercial',
  favorite: data?.favorite_medicines || [],
}));
