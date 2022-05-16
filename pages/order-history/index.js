import * as React from 'react';
import Link from "next/link";

import ProfileSidebar from "../../components/sidebar/profileSiderbar";
import MainLayout from "../../layouts/MainLayout";
import HistoryCart from "../../components/product/historyCart";
import styles from '../../styles/history/orderHistory.module.scss';
import { connectContext } from '../../store';
import { getUserOrders } from '../../store/user/actions';


const OrderHistory = ({ dispatch, orders, loading, userInfo }) => {
  React.useEffect(() => {
    if (userInfo._id) {
      getUserOrders(dispatch, userInfo._id);
    }
  }, [userInfo]);

  return (
    <MainLayout>
      <div className={styles.wrapper}>
        <div className="container">
          <div className="breadcrumb">
            <Link href="/"><a>Главная</a></Link> / История заказов
          </div>
          <div className={styles.content}>
            <ProfileSidebar />
            <div className={styles.historyWrapper}>
              <h3 className={styles.heading}>История заказов</h3>
              {orders.length ? orders.map(item => (
                <HistoryCart order={item} key={item._id} />
              )) : (
                <div className={styles.emptyHistory}>
                  <div>
                    <span>История заказов пуста</span>
                    <Link href="/"><a>На главную</a></Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default connectContext(OrderHistory, ({ user: { orders, info } }) => ({
  orders: orders.data || [],
  loading: orders.loading,
  userInfo: info.data || {},
}));
