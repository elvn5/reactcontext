import * as React from "react";
import Image from "next/image";
import HistoryProduct from "./historyProduct";
import clsn from "classnames";
import moment from "moment";

import CancelIcon from '../../public/icons/cancel-red.svg';
import ArrowIcon from '../../public/icons/arrow-next.svg';
import styles from '../../styles/history/orderHistory.module.scss';
import { STATUSES } from "../../utils";
import { connectContext } from "../../store";


const HistoryCart = ({ order, userType }) => {
  const [showAll, setShowAll] = React.useState(false);

  const arrowClassnames = React.useCallback(() => clsn({
    [styles.arrowTop]: !showAll,
    [styles.arrowDown]: showAll
  }), [showAll]);

  const handleCancelOrder = () => {
    // api call for delete order
  };

  return (
    <div className={styles.cartWrapper}>
      <div>
        <div className={styles.orderDate}>
          <span>{moment(order.orderDate).format("MMMM DD YYYY")}</span>
          {moment(order.orderDate).format("hh:mm")}
        </div>
        <div>
          {showAll ?
            order.items.map(el => <HistoryProduct userType={userType} key={el} product={el} />)
            :
            <HistoryProduct product={order.items[0] || []} userType={userType} />
          }
        </div>
        <div className={styles.cartTotal}>
          <h3>Итого</h3>
          <div>
            <div className={styles.totalRow}>
              <span className={styles.greyText}>Статус заказа:</span>
              <span className={clsn(styles.greenText, styles[order.status])}>
                {STATUSES[order.status]}
              </span>
            </div>
            <div className={styles.totalRow}>
              <span className={styles.greyText}>Товаров в корзине:</span>
              <span className={styles.blackText}>{order.items.length}</span>
            </div>
            <div className={styles.totalRow}>
              <span className={styles.greyText}>Общая сумма:</span>
              <span className={styles.blackText}>{order.totalPrice} c</span>
            </div>
          </div>
          {order.status === 'accepted' && (
            <button
              className={styles.cancelOrder}
              onClick={handleCancelOrder}
            >
              <Image src={CancelIcon} alt="cancel" />
              <span>Отменить заказ</span>
            </button>
          )}
        </div>
      </div>
      <button
        className={clsn(styles.toggleShow, arrowClassnames())}
        onClick={() => setShowAll(!showAll)}
      >
        <span>{!showAll ? 'Подробнее' : 'Свернуть'}</span>
        <Image src={ArrowIcon} alt="arrow" />
      </button>
    </div>
  );
};

export default connectContext(HistoryCart, ({ user: { info } }) => ({
  userType: info.data?.account_type || '',
}));
