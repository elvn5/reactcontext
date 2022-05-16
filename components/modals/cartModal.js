import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import cs from 'classnames';

import CartProduct from "../product/cartProduct";
import CartIcon from '../../public/icons/cart-black.svg';
import CloseIcon from '../../public/icons/close-modal.svg';
import styles from '../../styles/modals/cartModal.module.scss';
import { getItems } from "../../store/bucket/actions";
import { connectContext } from "../../store";
import { calculatePrice } from "../../utils";


const CartModal = ({ closeCart, bucket, dispatch }) => {
  const [prices, setPrices] = React.useState({});
  const [isClose, setIsClose] = React.useState(false);
  const router = useRouter();

  const handleClose = () => {
    setIsClose(true);
    setTimeout(() => {
      closeCart();
    }, 500);
  };

  const contentClassnames = React.useCallback(() => {
    return cs({
      [styles.content]: true,
      [styles.closeContent]: isClose,
    })
  }, [isClose]);

  React.useEffect(() => {
    setPrices(calculatePrice(bucket, 0.01));
  }, [bucket]);

  React.useEffect(() => {
    getItems(dispatch);
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = 'auto';
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={contentClassnames()}>
        <div className={styles.close} onClick={handleClose}>
          <Image src={CloseIcon} alt="close" />
        </div>
        <div className={styles.cartScroll}>
          <h3>В корзине</h3>
          <div className={styles.products}>
            {bucket.map(item => (
              <CartProduct {...item} key={item._id} />
            ))}
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.bottomInfo}>
            <div>
              <span>Товаров в корзине:</span>
              <span>{bucket.length}</span>
            </div>
          </div>
          <div className={styles.bottomInfo}>
            <div>
              <span>Общая сумма:</span>
              <span>{prices.total} c</span>
            </div>
            <button onClick={() => router.push('/cart')}>
              <Image src={CartIcon} alt="cart" />
              <span>Перейти в корзину</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connectContext(CartModal, ({ bucket = [] }) => ({
  bucket,
}));
