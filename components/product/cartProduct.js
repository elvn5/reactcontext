import Image from "next/image";

import NoProduct from '../../public/icons/noproduct.svg'
import PlusIcon from "../../public/icons/plus.svg";
import styles from '../../styles/modals/cartModal.module.scss';
import * as actions from '../../store/bucket/actions'
import { connectContext } from "../../store";


const CartProduct = ({ _id, gallery, amount, price, name, dispatch, userType }) => {
  const decrementCount = () => actions.decrementItem(dispatch, _id);
  const incrementCount = () => actions.incrementItem(dispatch, _id);

  return (
    <div className={styles.item}>
      <div className={styles.itemImg}>
        <img
          src={gallery && gallery[0]?.x_1C?.url || NoProduct.src}
          alt="medicine"
        />
      </div>
      <div className={styles.itemBody}>
        <h4>{name}</h4>
        <div className={styles.itemPriceBlock}>
          <span className={styles.itemPrice}>Цена за шт {price[userType]} с</span>
          <span className={styles.itemPriceTotal}>{price[userType] * amount} с</span>
        </div>
        <div className={styles.calc}>
          <button onClick={decrementCount}>
            <span className={styles.minus} />
          </button>
          <span>{amount}</span>
          <button onClick={incrementCount}>
            <Image src={PlusIcon} alt="plus" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default connectContext(CartProduct, ({ user: { info } }) => ({
  userType: info.data?.account_type || 'noncommercial',
}));
